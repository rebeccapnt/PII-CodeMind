import firebase from "./firebaseConfig.js";
import { SequencesServices } from "./SequencesServices.js";

export const WorkflowsServices = {
  //Création d'un workflow en fonction de l'ID de la séquence, du cours, et de l'utilisateur
  async createWorkflow(sequenceId, courseId, quizId, userId) {
    const currentDate = new Date().toISOString();
    try {
      // Création d'un objet workflow qui contient les informations sur le workflow à ajouter
      const workflow = {
        // Références aux documents correspondant dans Firebase
        course: firebase.db.doc("courses/" + courseId),
        sequence: firebase.db.doc("sequences/" + sequenceId),
        quiz: firebase.db.doc("quizzes/" + quizId),
        user: firebase.db.doc("users/" + userId),
        score: 0, // Initialisation du score de quiz à 0
        startedAt: currentDate,
        finishedAt: "",
        answers: [],
      };
      // Ajout du workflow dans Firebase
      const workflowRef = await firebase.db
        .collection("workflows")
        .add(workflow);
      // Récupération de l'id du workflow créé
      const workflowId = workflowRef.id;
      return workflowId;
    } catch (error) {
      console.error(error);
      throw new Error("Erreur dans la création d'un workflow");
    }
  },

  //Vérification si un workflow a été terminé
  async isWorklowFinished(sequenceId, userId) {
    // Récupération des références aux documents 'sequences' et 'users' dans Firebase
    const sequenceRef = firebase.db.collection("sequences").doc(sequenceId);
    const userRef = firebase.db.collection("users").doc(userId);

    // Récupération des workflows correspondant à la séquence et l'utilisateur
    const workflowsCollection = await firebase.db
      .collection("workflows")
      .where("sequence", "==", sequenceRef)
      .where("user", "==", userRef)
      // .where("finishedAt", "!=", "null") //Requires an index
      .get();

    // Vérification si un workflow a été trouvé
    const workflowDoc = workflowsCollection.docs[0];
    if (workflowDoc) {
      return true;
    } else {
      return false;
    }
  },

  async fetchWorkflow(workflowId) {
    // Récupération de la référence du workflow avec l'id
    const workflowRef = firebase.db.collection("workflows").doc(workflowId);
    const doc = await workflowRef.get();
    if (!doc.exists) {
      // Le workflow n'a pas été trouvé
      return null;
    }
    // Renvoie les données du workflow
    return doc.data();
  },
};
