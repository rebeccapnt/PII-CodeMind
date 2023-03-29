import firebase from "./firebaseConfig.js";

export const WorkflowsServices = {
    async createWorkflow(sequenceId, courseId, userId) {
        const currentDate = new Date().toISOString();
        try {
            const workflow = {
                course: firebase.db.doc("courses/" + courseId),
                sequence: firebase.db.doc("sequences/" + sequenceId),
                user: firebase.db.doc("users/" + userId),
                startedAt: currentDate,
            };
            firebase.db.collection("workflow").add(workflow);
        } catch (error) {
            console.error(error);
            throw new Error("Erreur dans la création d'un workflow");
        }
    },
};