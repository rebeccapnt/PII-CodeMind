import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect } from "react";
import { FlatList } from "react-native-gesture-handler";
import { getAuth } from "firebase/auth";
import firebase from "../firebaseConfig.js";
import { HomeCard } from "../components/HomeCard";

const HomeScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [bestCourses, setBestCourses] = useState([]);

  const auth = getAuth();
  useEffect(() => {
    const subscriber = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return subscriber;
  }, []);

  useEffect(() => {
    const fetchBestCourses = async () => {
      // récupérer une référence à la collection "cours"
      const coursesCollection = firebase.db.collection("courses");
      // trier les cours par ordre décroissant de nbReadings et récupérer les trois premières
      const snapshot = await coursesCollection
        .orderBy("nbReadings", "desc")
        .limit(3)
        .get();
      const bestCoursesList = [];
      snapshot.forEach((doc) => {
        bestCoursesList.push(doc.data());
      });
      setBestCourses(bestCoursesList);
    };

    fetchBestCourses();
  }, []);

  return (
    <View style={styles.container}>
      {/* <Text>Bonjour {user.email}</Text> */}
      <ImageBackground
        source={require("../assets/home.png")}
        resizeMode="cover"
        style={styles.container}
      >
        <ScrollView>
          <View style={styles.header}>
            <Image
              style={styles.logo}
              source={require("../assets/romy/romy.png")}
            />
            <Text style={styles.headerTitle}>Bienvenue, Rebecca</Text>
            <Text style={styles.headerSubtitle}>
              Commencez de nouvelles aventures.{" "}
            </Text>
          </View>
          <View style={styles.main}>
            <View style={styles.bestCourses}>
              <Text style={styles.bestTitle}>Continuer mes cours</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Apprendre")}
              >
                <Text style={styles.seeAllCourses}>Voir tout</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.contentCourses}>
              {/* Ici mettre formations de l'utilisateur, le voir tout ramène au profil ? */}
              <HomeCard
                action={() => navigation.navigate("Apprendre")}
                progress="80"
              />
            </View>
            <View style={styles.bestCourses}>
              <Text style={styles.bestTitle}>Les cours populaires</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Apprendre")}
              >
                <Text style={styles.seeAllCourses}>Voir tout</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.contentCourses}>
              <FlatList
                nestedScrollEnabled
                data={bestCourses}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.courseId}
                renderItem={({ item }) => (
                  <HomeCard
                    item={item}
                    action={() => navigation.navigate("Apprendre")}
                    progress="25"
                  />
                )}
              />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    padding: 15,
  },
  header: {
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
    backgroundColor: "#335296",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderWidth: 1,
    borderColor: "#00216d",
  },
  logo: {
    marginTop: 10,
    width: 200,
    height: 200,
    marginTop: 10,
  },
  headerTitle: {
    textAlign: "center",
    color: "white",
    fontSize: 23,
    fontWeight: "700",
    paddingBottom: 10,
  },
  headerSubtitle: {
    fontSize: 14,
    fontWeight: "300",
    paddingBottom: 20,
    color: "white",
  },
  bestCourses: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  bestTitle: {
    textAlign: "left",
    fontSize: 20,
    fontWeight: "700",
    color: "#00216d",
    marginBottom: 12,
  },
  seeAllCourses: {
    textAlign: "right",
    fontWeight: "600",
    marginBottom: 12,
    color: "#00216d",
  },
});
export default HomeScreen;
