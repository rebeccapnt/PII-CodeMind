import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { CourseCard } from "../components/CourseCard";
import { Input } from "../components/Input";
import firebase from "../firebaseConfig.js";

const CourseScreen = ({ navigation }) => {
  const [courses, setCourses] = useState([]);
  const [sequences, setSequences] = useState([]);

  // const loadCourses = async (search = "") => {
  //   const coursesCollection = firebase.db.collection("courses");
  //   const snapshot = await coursesCollection.get().Where("name", "==", search);
  //   const coursesList = [];
  //   snapshot.forEach((doc) => {
  //     coursesList.push(doc.data());
  //   });
  //   setCourses(coursesList);
  // };

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

  useEffect(() => {
    const fetchSequences = async () => {
      const sequencesCollection = firebase.db.collection("sequences");
      const snapshot = await sequencesCollection.get();
      const sequencesList = [];
      snapshot.forEach((doc) => {
        sequencesList.push(doc.data());
      });
      setSequences(sequencesList);
    };

    fetchSequences();
  }, []);

  return (
    <ImageBackground
      source={require("../assets/home.png")}
      resizeMode="cover"
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Rechercher des cours</Text>
        <Text style={styles.titleBottom}>
          Trouver les cours que vous souhaitez à l'aide de la recherche.
        </Text>
        <Input
          style={styles.search}
          placeholder="Rechercher un cours..."
          // onSearch={({ nativeEvent: { text } }) => loadCourses(text)}
        />
      </View>
      <View style={styles.main}>
        <FlatList
          data={courses}
          keyExtractor={(item) => item.courseId}
          renderItem={({ item }) => (
            <CourseCard item={item} actionStart="Sequence" params={sequences} />
          )}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#335296",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderWidth: 1,
    borderColor: "#00216d",
    paddingBottom: 16,
    paddingHorizontal: 15,
  },
  title: {
    paddingVertical: 10,
    fontWeight: "600",
    fontSize: 22,
    color: "white",
  },
  titleBottom: {
    fontSize: 14,
    color: "white",
    fontWeight: "300",
  },
  main: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
});

export default CourseScreen;
