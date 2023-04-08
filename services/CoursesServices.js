import firebase from "./firebaseConfig.js";

export const CoursesServices = {
  //Récupère la liste de tous les cours
  async fetchCourses() {
    try {
      // Récupération de la collection des cours sur Firebase
      const coursesCollection = firebase.db.collection("courses");
      const snapshot = await coursesCollection.get();
      // Map des données de chaque document et stock de l'id du document dans l'objet course
      const coursesList = snapshot.docs.map((doc) => {
        const course = doc.data();
        course.id = doc.id;
        return course;
      });
      // Retourne la liste des objets "course"
      return coursesList;
    } catch (error) {
      console.error(error);
      throw new Error("Erreur dans la récupération des cours");
    }
  },

  //Récupère la liste des 3 meilleurs cours
  async fetchBestsCourses() {
    try {
      // Récupération de la collection des cours sur Firebase
      const coursesCollection = firebase.db.collection("courses");

      // Récupération de la collection triée par ordre décroissant en fonction du nombre de lectures
      const snapshot = await coursesCollection
        .orderBy("nbReadings", "desc")
        .limit(3)
        .get();
      const bestCoursesList = snapshot.docs.map((doc) => {
        const course = doc.data();
        course.id = doc.id; // Ajout de l'id du document à l'objet course
        return course;
      });
      return bestCoursesList;
    } catch (error) {
      console.error(error);
      throw new Error("Erreur dans la récupération des meilleurs cours");
    }
  },

  // Récupère la liste des cours associés au nom "name" entré par l'utilisateur
  async searchCourses(name) {
    try {
      // Récupération de la collection des cours sur Firebase
      const coursesCollection = firebase.db.collection("courses");

      // Requête avec le champ "name" de la collection des cours
      const snapshot = await coursesCollection.where("name", "==", name).get();

      //Création d'une liste de cours à partir des documents retournés
      const coursesList = snapshot.docs.map((doc) => {
        const course = doc.data();
        course.id = doc.id;
        return course;
      });
      //Retourne la liste de cours trouvés
      return coursesList;
    } catch (error) {
      console.error(error);
      throw new Error(
        "Erreur dans la récupération des cours en fonction de la recherche"
      );
    }
  },
};
