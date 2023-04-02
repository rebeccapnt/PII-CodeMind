import firebase from "./firebaseConfig.js";

export const WorkflowsServices = {
    //Création d'un workflow en fonction de l'ID de la séquence, du cours, et de l'utilisateur
    async createWorkflow(sequenceId, courseId, userId) {
        const currentDate = new Date().toISOString();
        try {
            const workflow = {
                course: firebase.db.doc("courses/" + courseId),
                sequence: firebase.db.doc("sequences/" + sequenceId),
                user: firebase.db.doc("users/" + userId),
                score: 0,
                startedAt: currentDate,
            };
            firebase.db.collection("workflow").add(workflow);
            return workflow;
        } catch (error) {
            console.error(error);
            throw new Error("Erreur dans la création d'un workflow");
        }
    },
    async isWorklowFinished(sequenceId, courseId, userId) {
        //TODO : Bouton gris ou vert partie séquence : une fois que le workflow a la propriété FinishedAt remplie
    },

};