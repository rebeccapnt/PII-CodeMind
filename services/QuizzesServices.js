import firebase from "./firebaseConfig.js";

export const QuizzesServices = {
  //Récupération des questions du quiz en fonction de l'ID de la séquence
  async fetchQuestionsForQuiz(quizId) {
    // Récupération de la référence du workflow avec l'id
    const quizRef = firebase.db.collection("quizzes").doc(quizId);
    const doc = await quizRef.get();
    if (!doc.exists) {
      // Le quiz n'a pas été trouvé
      return null;
    }
    // Récupération de toutes les questions qui ont pour référence le document quiz
    const questionsRef = firebase.db
      .collection("questions")
      .where("quiz", "==", quizRef);
    const questionsSnapshot = await questionsRef.get();

    // Map des données de chaque document question dans un tableau de questions
    const questions = questionsSnapshot.docs.map((doc) => doc.data());

    return questions;
  },
};
