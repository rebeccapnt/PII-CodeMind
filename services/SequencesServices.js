import firebase from "./firebaseConfig.js";

export const SequencesServices = {
  //Récupère la liste des séquences selon un cours
  async fetchSequences(courseId) {
    try {
      // Récupération de la collection des cours sur Firebase
      const coursesCollection = firebase.db.collection("courses");
      const courseDoc = await coursesCollection.doc(courseId).get();

      // Vérifier si le document de cours avec l'id spécifié existe
      if (!courseDoc.exists) {
        throw new Error(`Cours avec l'id ${courseId} n'existe pas.`);
      }

      const courseData = courseDoc.data();
      const courseRef = courseDoc.ref;
      const sequencesCollection = firebase.db.collection("sequences");

      // Récupération des séquences associées au cours
      const snapshot = await sequencesCollection
        .where("course", "==", courseRef)
        .get();

      const sequencesList = snapshot.docs.map((doc) => {
        const sequence = doc.data();
        sequence.id = doc.id; // Ajout de l'ID de la séquence
        return sequence;
      });
      sequencesList.sort((a, b) => a.nbSequence - b.nbSequence); //Trie des séquences en fonction du numéro de séquence
      return { course: courseData, sequencesList }; // Retourne le cours ainsi que la liste des séquences
    } catch (error) {
      console.error(error);
      throw new Error("Erreur dans la récupération des séquences");
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

  //Récupère la prochaine séquence en fonction d'un id de séquence
  async fetchNextSequence(sequenceId) {
    const sequence = await SequencesServices.fetchSequence(sequenceId);
    if (sequence) {
      const nextId = sequence.nbSequence + 1;
      const sequencesCollection = await firebase.db
        .collection("sequences")
        .where("nbSequence", "==", nextId)
        .get();
      const sequenceDoc = sequencesCollection.docs[0];
      // Si le document existe, renvoie ses données, sinon renvoie null
      return sequenceDoc ? { Id: sequenceDoc.id, ...sequenceDoc.data() } : null;
    }
  },
};
