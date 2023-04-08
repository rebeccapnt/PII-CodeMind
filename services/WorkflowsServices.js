import firebase from "./firebaseConfig.js";
import { SequencesServices } from "./SequencesServices.js";

export const WorkflowsServices = {
    //Création d'un workflow en fonction de l'ID de la séquence, du cours, et de l'utilisateur
    async createWorkflow(sequenceId, courseId, quizId, userId) {
        const currentDate = new Date().toISOString();
        try {
            const workflow = {
                course: firebase.db.doc("courses/" + courseId),
                sequence: firebase.db.doc("sequences/" + sequenceId),
                quiz: firebase.db.doc("quizzes/" + quizId),
                user: firebase.db.doc("users/" + userId),
                score: 0,
                startedAt: currentDate,
                finishedAt: "",
                answers: [],
            };
            const workflowRef = await firebase.db
                .collection("workflows")
                .add(workflow);
            const workflowId = workflowRef.id;
            return workflowId;
        } catch (error) {
            console.error(error);
            throw new Error("Erreur dans la création d'un workflow");
        }
    },

    async isWorklowFinished(sequenceId, userId) {
        const workflowsCollection = await firebase.db
            .collection("workflows")
            .where("sequence", "==", sequenceId)
            .where("user", "==", userId)
            // .where("finishedAt", "!=", "null")
            .get();
        if (!workflowsCollection.empty) {
            const workflowDoc = workflowsCollection.docs[0];
            return { Id: workflowDoc.id, ...workflowDoc.data() };
        } else {
            return null;
        }
    },

    async fetchWorkflow(workflowId) {
        const workflowRef = firebase.db.collection("workflows").doc(workflowId);
        const doc = await workflowRef.get();
        if (!doc.exists) {
            // Le workflow n'a pas été trouvé
            return null;
        }
        return doc.data();
    },
};