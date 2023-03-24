import firebase from "./firebaseConfig.js";

export const UserServices = {
  //Récupère les informations de l'utilisateur grâce à l'adresse mail
  async getUser(email) {
    try {
      const userCollection = await firebase.db
        .collection("users")
        .where("email", "==", email)
        .get();
      // Renvoie le premier document de Firebase
      const userDoc = userCollection.docs[0];
      // Si le document existe, renvoie ses données, sinon renvoie null
      return userDoc ? userDoc.data() : null;
    } catch (error) {
      console.error(error);
      throw new Error("Erreur dans la récupération de l'utilisateur connecté");
    }
  },
};
