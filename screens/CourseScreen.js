import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ImageBackground,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { CourseCard } from "../components/CourseCard";
import { Card } from "../components/Card";
import { Input } from "../components/Input";
import firebase from "../firebaseConfig.js";

const CourseScreen = ({ navigation }) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const coursesCollection = firebase.db.collection("courses");
      const snapshot = await coursesCollection.get();
      const coursesList = [];
      snapshot.forEach((doc) => {
        coursesList.push(doc.data());
      });
      setCourses(coursesList);
    };

    fetchCourses();
  }, []);

  return (
    <ImageBackground
      source={require("../assets/home.png")}
      resizeMode="cover"
      style={styles.container}
    >
      <Text style={styles.title}>Rechercher des cours</Text>
      <Text style={styles.titleBottom}>
        Trouver les cours que vous souhaitez à l'aide de la recherche.
      </Text>
      <Input placeholder="Rechercher un cours..." />
      <FlatList
        data={courses}
        keyExtractor={(item) => item.courseId}
        renderItem={({ item }) => (
          <Card item={item} actionStart="Sequence" />
        )}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  title: {
    paddingVertical: 10,
    fontWeight: "500",
    fontSize: 20,
    color: "#00216d",
  },
  titleBottom: {
    fontSize: 14,
    color: "#00216d",
  },
});

export default CourseScreen;
