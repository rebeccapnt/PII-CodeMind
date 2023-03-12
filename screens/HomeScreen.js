import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
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
  const onSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((err) => Alert.alert("Erreur de connexion :", err.message));
  };

  return (
    <ScrollView style={styles.container}>
      <Text>Coucou {user.email}</Text>
      <Button text="Me déconnecter" action={onSignOut} />

      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require("../assets/romy/romyhappy.png")}
        />
        <Text style={styles.headerTitle}>Bienvenue sur CodeMind</Text>
      </View>
      {/* <FlatList
        data={courses}
        renderItem={({ item }) => <CourseCard item={item} onPress={() => {}} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      /> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  header: {
    marginVertical: 10,
    justifyContent: "center",
    width: "100%",
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 50,
  },
  logo: {
    width: 260,
    height: 260,
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    paddingBottom: 10,
  },
});
export default HomeScreen;
