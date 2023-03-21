import firebase from "./firebaseConfig.js";

export const UserServices = {
  //Récupère les informations de l'utilisateur connecté
  async getUser(user) {
    try {
      const userCollection = firebase.db
        .collection("users")
        .where("email", "==", user)
        .get();
      return userCollection;
    } catch (error) {
      console.error(error);
      throw new Error("Erreur dans la récupération de l'utilisateur connecté");
    }
  },
};
