import firebase from "./firebaseConfig.js";
import { SequencesServices } from "./SequencesServices.js";
import { UserServices } from "./UserServices.js";

export const WorkflowsServices = {
  //Création d'un workflow en fonction de l'ID de la séquence, du cours, et de l'utilisateur
  async createWorkflow(sequenceId, courseId, userId) {
    // Récupération des références aux documents 'sequences' et 'users' dans Firebase
    const sequenceRef = firebase.db.collection("sequences").doc(sequenceId);
    const userRef = firebase.db.collection("users").doc(userId);
    const workflowsCollection = await firebase.db
      .collection("workflows")
      .where("sequence", "==", sequenceRef)
      .where("user", "==", userRef)
      .get();

    const workflow = workflowsCollection.docs[0];

    //Si le workflow existe déjà, alors on réinitialise les réponses et le score afin que l'utilisateur
    if (workflow) {
      WorkflowsServices.resetWorkflow(workflow.id);
      return workflow.id;
    } else {
      try {
        const currentDate = new Date().toISOString();
        // Création d'un objet workflow qui contient les informations sur le workflow à ajouter
        const workflow = {
          // Références aux documents correspondant dans Firebase
          course: firebase.db.doc("courses/" + courseId),
          sequence: firebase.db.doc("sequences/" + sequenceId),
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
    }
  },

  //Vérification si un workflow a été terminé
  async isWorkflowFinished(sequenceId, userId) {
    // Récupération des références aux documents 'sequences' et 'users' dans Firebase
    const sequenceRef = firebase.db.collection("sequences").doc(sequenceId);
    const userRef = firebase.db.collection("users").doc(userId);

    // Récupération des workflows correspondant à la séquence et l'utilisateur
    const workflowsCollection = await firebase.db
      .collection("workflows")
      .where("sequence", "==", sequenceRef)
      .where("user", "==", userRef)
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

    // Récupère les données du workflow
    const workflowData = doc.data();
    const sequenceRef = workflowData.sequence;
    const sequenceDoc = await sequenceRef.get();
    const sequence = sequenceDoc.data();

    // Calcule le score du quiz
    const quizScore = await WorkflowsServices.calculateQuizScore(
      workflowData.answers
    );

    // Récupère les mauvaises réponses
    const incorrectAnswers = workflowData.answers.filter(
      (answer) => answer.isCorrect === false
    );

    // Récupère les questions et les réponses associées
    const questionsRef = firebase.db
      .collection("questions")
      .doc(sequence.questions.id);
    const questionsDoc = await questionsRef.get();
    const questionsData = questionsDoc.data();

    // Associe les questions et les réponses aux mauvaises réponses
    const incorrectQuestions = incorrectAnswers.map((answer) => {
      const question = questionsData.questions[answer.questionId];
      const response = question.responses.find(
        (r) => question.responses.indexOf(r) === answer.responseId
      );
      return {
        question: question.question,
        response: response.response,
      };
    });

    // Retourne les données du workflow avec les informations sur les mauvaises réponses
    return {
      id: doc.id,
      sequenceName: sequence.name,
      quizScore,
      incorrectQuestions,
      ...workflowData,
    };
  },

  //Modification des réponses de l'utilisateur à un quiz
  async updateAnswersWorkflow(workflowId, answers) {
    const currentDate = new Date().toISOString();
    try {
      // Récupération de la référence du workflow avec l'id
      const workflowRef = firebase.db.collection("workflows").doc(workflowId);
      const doc = await workflowRef.get();
      if (!doc.exists) {
        // Le workflow n'a pas été trouvé
        return null;
      }
      const workflow = doc.data();

      // Mise à jour du champ "answers" dans le workflow
      await workflowRef.update({
        answers: answers,
        finishedAt: currentDate,
      });
      return true;
    } catch (error) {
      console.error(error);
      throw new Error(
        "Erreur dans l'ajout des réponses de l'utilisateur dans le workflow"
      );
    }
  },

  //Modification du score de l'utilisateur à un quiz
  async updateScoreWorkflow(workflowId, score) {
    try {
      // Récupération de la référence du workflow avec l'id
      const workflowRef = firebase.db.collection("workflows").doc(workflowId);
      const doc = await workflowRef.get();
      if (!doc.exists) {
        // Le workflow n'a pas été trouvé
        return null;
      }
      // Mise à jour du score dans le workflow
      await workflowRef.update({
        score: score,
      });
      const workflow = doc.data();
      //Mise à jour du score dans le document de l'utilisateur
      await UserServices.updateScoreUser(workflow.user.id, score);

      return true;
    } catch (error) {
      console.error(error);
      throw new Error(
        "Erreur dans la modification du score de l'utilisateur dans le workflow"
      );
    }
  },

  //Réinitialisation du workflow si l'utilisateur recommence le quiz
  async resetWorkflow(workflowId) {
    const currentDate = new Date().toISOString();
    try {
      // Récupération de la référence du workflow avec l'id
      const workflowRef = firebase.db.collection("workflows").doc(workflowId);
      const doc = await workflowRef.get();
      if (!doc.exists) {
        // Le workflow n'a pas été trouvé
        return null;
      }
      // Mise à jour du score dans le workflow
      await workflowRef.update({
        score: 0,
        answers: [],
        finishedAt: "",
        startedAt: currentDate,
      });

      return true;
    } catch (error) {
      console.error(error);
      throw new Error(
        "Erreur dans la réinitialisation du workflow de l'utilisateur"
      );
    }
  },

  async fetchWorkflows(user) {
    try {
      const userRef = firebase.db.collection("users").doc(user.Id);

      // Récupération de la collection des workflows sur Firebase
      const workflowsCollection = firebase.db.collection("workflows");
      const snapshot = await workflowsCollection
        .where("user", "==", userRef)
        .where("finishedAt", "!=", "")
        .orderBy("finishedAt", "desc")
        .get();

      // Création de la liste des workflows avec les données à afficher
      const workflowsList = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const workflowData = doc.data();
          const sequenceRef = workflowData.sequence;
          const sequenceDoc = await sequenceRef.get();
          const sequence = sequenceDoc.data();
          const quizScore = await WorkflowsServices.calculateQuizScore(
            workflowData.answers
          );
          return {
            id: doc.id,
            sequenceName: sequence.name,
            quizScore: quizScore,
            ...workflowData,
          };
        })
      );

      return workflowsList;
    } catch (error) {
      console.error(error);
      throw new Error("Erreur dans la récupération des quiz terminés");
    }
  },

  async calculateQuizScore(answers) {
    const totalQuestions = answers.length;
    const correctAnswers = answers.filter((answer) => answer.isCorrect);
    const numCorrectAnswers = correctAnswers.length;
    const score = Math.round((numCorrectAnswers / totalQuestions) * 100);
    return score;
  },
};
