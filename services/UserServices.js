import firebase from "./firebaseConfig.js";

export const UserServices = {
    //Récupération des informations de l'utilisateur grâce à l'adresse mail
    async getUser(email) {
        try {
            const userCollection = await firebase.db
                .collection("users")
                .where("email", "==", email)
                .get();
            // Renvoie le premier document de Firebase
            const userDoc = userCollection.docs[0];
            // Si le document existe, renvoie ses données, sinon renvoie null
            return userDoc ? { Id: userDoc.id, ...userDoc.data() } : null;
        } catch (error) {
            console.error(error);
            throw new Error("Erreur dans la récupération de l'utilisateur connecté");
        }
    },

    //Récupération des cours commencés par l'utilisateur connecté
    async getCoursesStartedByUser(email) {
        try {
            const user = await UserServices.getUser(email);
            const userRef = firebase.db.doc(`users/${user.Id}`);
            const workflowCollection = firebase.db.collection("workflow");
            const snapshot = await workflowCollection
                .where("user", "==", userRef)
                .limit(3)
                .get();

            const workflowList = snapshot.docs.map((doc) => {
                const workflow = doc.data();
                workflow.id = doc.id;
                return workflow;
            });

            // Utilisation d'un Set pour stocker les références uniques aux cours
            const courseRefs = new Set(
                workflowList.map((workflow) => workflow.course.id)
            );

            // Récupération des documents de cours correspondant aux références uniques de cours
            const courseDocs = await Promise.all(
                [...courseRefs].map((courseId) =>
                    firebase.db.collection("courses").doc(courseId).get()
                )
            );

            const coursesList = courseDocs.map((doc) => {
                const course = doc.data() || {};
                course.id = doc.id;
                return course;
            });

            return coursesList;
        } catch (error) {
            console.error(error);
            throw new Error(
                "Erreur dans la récupération des cours commencés par l'utilisateur"
            );
        }
    },
    async getNbStartedCourses(email) {
        //TODO
    },
    async getNbFinishedCourses(email) {
        //TODO
    },

};