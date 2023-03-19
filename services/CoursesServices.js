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
      throw new Error("Failed to fetch courses");
    }
  },
  // Récupère la liste des cours associés au nom "name" entré par l'utilisateur
  async searchCourses(name) {
    const coursesCollection = firebase.db.collection("courses");
    const snapshot = await coursesCollection.get().Where("name", "==", search);
    const coursesList = [];
    snapshot.forEach((doc) => {
      coursesList.push(doc.data());
    });
    setCourses(coursesList);
  },
};
