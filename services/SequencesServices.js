import firebase from "./firebaseConfig.js";

export const SequencesServices = {
  //Récupère la liste des séquences selon un cours
  async fetchSequences(courseId) {
    try {
      const coursesCollection = firebase.db.collection("courses");
      const courseDoc = await coursesCollection.doc(courseId).get();

      if (!courseDoc.exists) {
        throw new Error(`Cours avec l'id ${courseId} n'existe pas.`);
      }

      const courseRef = courseDoc.ref;
      const sequencesCollection = firebase.db.collection("sequences");
      const snapshot = await sequencesCollection
        .where("course", "==", courseRef)
        .get();
      const sequencesList = snapshot.docs.map((doc) => {
        const sequence = doc.data();
        sequence.id = doc.id;
        return sequence;
      });
      return sequencesList;
    } catch (error) {
      console.error(error);
      throw new Error("Erreur dans la récupération des cours");
    }
  },

  // Récupère les informations d'une séquence à l'aide de l'id
  async fetchSequence(sequenceId) {
    const sequenceRef = firebase.db.collection("sequences").doc(sequenceId);
    const doc = await sequenceRef.get();
    if (!doc.exists) {
      // La séquence n'a pas été trouvée
      return null;
    }
    return doc.data();
  },
};
