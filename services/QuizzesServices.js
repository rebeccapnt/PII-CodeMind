import firebase from "./firebaseConfig.js";

export const QuizzesServices = {
  //Récupération des informations du quiz en fonction de l'ID de la séquence
  async getQuiz(idSequence) {
    try {
      const sequenceRef = firebase.db.doc(`sequences/${idSequence}`);
      const quizzesCollection = await firebase.db
        .collection("quizzes")
        .where("sequence", "==", sequenceRef)
        .get();
      // Renvoie le premier document de Firebase
      const quiz = quizzesCollection.docs[0];
      // Si le document existe, renvoie ses données, sinon renvoie null
      return quiz ? { Id: quiz.id, ...quiz.data() } : null;
    } catch (error) {
      console.error(error);
      throw new Error("Erreur dans la récupération du quiz");
    }
  },
};
