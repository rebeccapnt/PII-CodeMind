import firebase from "./firebaseConfig.js";

export const CoursesServices = {
  //Récupère la liste de tous les cours
  async fetchCourses() {
    try {
      const coursesCollection = firebase.db.collection("courses");
      const snapshot = await coursesCollection.get();
      const coursesList = snapshot.docs.map((doc) => {
        const course = doc.data();
        course.id = doc.id;
        return course;
      });
      return coursesList;
    } catch (error) {
      console.error(error);
      throw new Error("Erreur dans la récupération des cours");
    }
  },

  //Récupère la liste des 3 meilleurs cours
  async fetchBestsCourses() {
    try {
      const coursesCollection = firebase.db.collection("courses");
      const snapshot = await coursesCollection
        .orderBy("nbReadings", "desc")
        .limit(3)
        .get();
      const bestCoursesList = snapshot.docs.map((doc) => {
        const course = doc.data();
        course.id = doc.id;
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
    const coursesCollection = firebase.db.collection("courses");
    const snapshot = await coursesCollection.where("name", "==", name).get();
    const coursesList = snapshot.docs.map((doc) => {
      const course = doc.data();
      course.id = doc.id;
      return course;
    });
    return coursesList;
  },
};
