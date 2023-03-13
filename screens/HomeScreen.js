import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect } from "react";
import { FlatList } from "react-native-gesture-handler";
import { CourseCard } from "../components/CourseCard";
import { getAuth, signOut } from "firebase/auth";
import { Button } from "../components/Button";

const HomeScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const auth = getAuth();
  useEffect(() => {
    const subscriber = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return subscriber;
  }, []);
  if (!user) {
    return <Text>Vous n'êtes pas connecté</Text>;
  }

  return (
    <ImageBackground
      source={require("../assets/home.png")}
      resizeMode="cover"
      style={styles.container}
    >
      <ScrollView>
        {/* <Text>Coucou {user.email}</Text> */}
        <View style={styles.header}>
          <Image style={styles.logo} source={require("../assets/romy.png")} />
          <Text style={styles.headerTitle}>Bienvenue sur CodeMind !</Text>
          <Text style={styles.headerContext}>
            Je m'appelle Sophie et je t'aiderai tout au long de ton
            apprentissage.
          </Text>

          <View style={styles.bestCourses}>
            <Text style={styles.bestTitle}>Les formations populaires</Text>
          </View>
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
    paddingHorizontal: 10,
  },
  header: {
    justifyContent: "center",
    width: "100%",
    // backgroundColor: "white",
    alignItems: "center",
    borderRadius: 50,
  },
  logo: {
    width: 260,
    height: 260,
    marginTop: 10,
  },
  headerTitle: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "700",
    paddingBottom: 10,
  },
  headerContext: {
    fontSize: 14,
    paddingBottom: 10,
  },
  bestCourses: {},
  bestTitle: {
    alignItems: "left",
    fontSize: 18,
    fontWeight: "600",
  },
});
export default HomeScreen;
