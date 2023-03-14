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
import Ionicons from "react-native-vector-icons/Ionicons";
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
    <View style={styles.container}>
      <ScrollView>
        {/* <Text>Bonjour {user.email}</Text> */}
        <ImageBackground
          source={require("../assets/home.png")}
          resizeMode="cover"
          style={styles.container}
        >
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
          </View>

          {/* <FlatList
        data={courses}
        renderItem={({ item }) => <CourseCard item={item} onPress={() => {}} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      /> */}
        </ImageBackground>
      </ScrollView>
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
