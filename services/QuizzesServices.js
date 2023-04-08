import firebase from "./firebaseConfig.js";

export const QuizzesServices = {
    //Récupération des questions du quiz en fonction de l'ID de la séquence
    async fetchQuestionsForQuiz(quizId) {
        const quizRef = firebase.db.collection("quizzes").doc(quizId);
        const doc = await quizRef.get();
        if (!doc.exists) {
            // Le quiz n'a pas été trouvé
            return null;
        }
        const questionsRef = firebase.db
            .collection("questions")
            .where("quiz", "==", quizRef);
        const questionsSnapshot = await questionsRef.get();
        const questions = questionsSnapshot.docs.map((doc) => doc.data());

        return questions;
    },
};