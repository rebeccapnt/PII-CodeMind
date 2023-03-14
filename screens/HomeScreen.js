import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { FlatList } from "react-native-gesture-handler";
import { getAuth } from "firebase/auth";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SequenceCard } from "../components/SequenceCard";
import { HomeCard } from "../components/HomeCard";

const HomeScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const auth = getAuth();
  useEffect(() => {
    const subscriber = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return subscriber;
  }, []);

  return (
    <ImageBackground
      source={require("../assets/home.png")}
      resizeMode="cover"
      style={styles.container}
    >
      <ScrollView>
        {/* <Text>Bonjour {user.email}</Text> */}
        <View style={styles.header}>
          <Image
            style={styles.logo}
            source={require("../assets/romy/romy.png")}
          />
          <Text style={styles.headerTitle}>Bienvenue sur CodeMind !</Text>
        </View>
        <View style={styles.bestCourses}>
          <Text style={styles.bestTitle}>Continuer mes cours</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Apprendre")}>
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
          <TouchableOpacity onPress={() => navigation.navigate("Apprendre")}>
            <Text style={styles.seeAllCourses}>Voir tout</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.contentCourses}>
          {/* Ici mettre 3 meilleurs formations ( à savoir celles avec le plus de vues mettre à la place de voir un icon ">") */}
          <HomeCard
            action={() => navigation.navigate("Apprendre")}
            progress="25"
          />
          <HomeCard
            action={() => navigation.navigate("Apprendre")}
            progress="50"
          />
          <HomeCard
            action={() => navigation.navigate("Apprendre")}
            progress="33"
          />
        </View>
        {/* <FlatList
        data={courses}
        renderItem={({ item }) => <CourseCard item={item} onPress={() => {}} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      /> */}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  header: {
    justifyContent: "center",
    width: "100%",
    // backgroundColor: "white",
    alignItems: "center",
    borderRadius: 10,
  },
  logo: {
    marginTop: 10,
    width: 260,
    height: 260,
    marginTop: 10,
  },
  headerTitle: {
    textAlign: "center",
    color: "#00216d",
    fontSize: 22,
    fontWeight: "700",
    paddingBottom: 10,
  },
  headerContext: {
    fontSize: 14,
    paddingBottom: 10,
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
