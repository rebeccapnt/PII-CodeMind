import firebase from "./firebaseConfig.js";

export const UserServices = {
  //Récupère les informations de l'utilisateur grâce à l'adresse mail
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

  //Récupère les courses commencées par l'utilisateur connecté

  async getCoursesStartedByUser(email) {
    try {
      const user = await UserServices.getUser(email);
      const userRef = firebase.db.doc(`users/${user.Id}`);
      const workflowCollection = firebase.db.collection("workflow");
      const snapshot = await workflowCollection
        .where("user", "==", userRef)
        .get();

      const workflowList = snapshot.docs.map((doc) => {
        const workflow = doc.data();
        workflow.id = doc.id;
        return workflow;
      });
      // Récupération des références aux cours
      const courseRefs = workflowList.map((workflow) => workflow.course);

      // Récupération des documents des cours
      const courseDocs = await Promise.all(courseRefs.map((ref) => ref.get()));
      const coursesList = courseDocs.map((doc) => {
        const course = doc.data();
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
};
