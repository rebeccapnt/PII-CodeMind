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
      const workflowCollection = firebase.db.collection("workflows");
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

  async getCoursesFinishedByUser(email) {
    try {
      const user = await UserServices.getUser(email);
      const userRef = firebase.db.doc(`users/${user.Id}`);
      const workflowCollection = firebase.db.collection("workflows");
      const snapshot = await workflowCollection
        .where("user", "==", userRef)
        .where("finishedAt", "!=", "")
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

  async updateScoreUser(userId, score) {
    try {
      // Récupération de la référence du workflow avec l'id
      const usersRef = firebase.db.collection("users").doc(userId);
      const doc = await usersRef.get();
      if (!doc.exists) {
        // Le workflow n'a pas été trouvé
        return null;
      }
      const user = doc.data();
      const updatedScore = user.score + score;

      // Mise à jour du score dans le workflow
      await usersRef.update({
        score: updatedScore,
      });

      return true;
    } catch (error) {
      console.error(error);
      throw new Error(
        "Erreur dans la modification du score total de l'utilisateur"
      );
    }
  },
};
