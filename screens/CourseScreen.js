import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  FlatList,
  Image,
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
        <View style={styles.headerSearch}>
          <View style={styles.content}>
            <Text style={styles.title}>Rechercher des cours</Text>
            <Text style={styles.subtitle}>
              A l'aide de la barre de recherche, tu peux chercher les cours qui
              t'intéressent.
            </Text>
          </View>
          <Image
            source={require("../assets/romy/romysmilefilled.png")}
            style={styles.icon}
          />
        </View>
        <Input
          style={styles.search}
          placeholder="Rechercher un cours..."
          // onSearch={({ nativeEvent: { text } }) => loadCourses(text)}
        />
      </View>
      <FlatList
        style={styles.main}
        data={courses}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.courseId}
        renderItem={({ item }) => (
          <CourseCard item={item} actionStart="Sequence" params={sequences} />
        )}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    backgroundColor: "#335296",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderWidth: 1,
    borderColor: "#00216d",
    paddingBottom: 16,
    paddingHorizontal: 15,
    marginBottom: 6,
  },
  headerSearch: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginVertical: 4,
    color: "white",
  },
  subtitle: {
    fontSize: 14,
    color: "white",
  },
  icon: {
    width: 80,
    height: 80,
  },
  main: {
    padding: 15,
  },
});

export default CourseScreen;
