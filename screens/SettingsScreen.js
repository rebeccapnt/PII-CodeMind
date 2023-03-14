import React, { useState, useEffect } from "react";
import { Button } from "../components/Button";
import { ButtonOutline } from "../components/ButtonOutline";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View,
  ImageBackground,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getAuth, signOut } from "firebase/auth";

const SettingsScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);

  const auth = getAuth();
  useEffect(() => {
    const subscriber = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return subscriber;
  }, []);

  //Récupérer toutes les informations de l'utilisateur avec l'adresse mail :
  useEffect(() => {
    const fetchCourses = async () => {
      const userCollection = firebase.db
        .collection("users")
        .where("email", "==", user.email);
      const snapshot = await userCollection.get();
      setUser(snapshot);
    };

    fetchCourses();
  }, []);

  const onUpdatePress = () => {};
  const onSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((err) => Alert.alert("Erreur de connexion :", err.message));
  };

  return (
    <ImageBackground
      source={require("../assets/authentification.png")}
      resizeMode="cover"
      style={styles.container}
    >
      <View>
        <Text style={styles.title}>Mes paramètres</Text>
      </View>
      <View style={styles.background}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>
            <Ionicons name="happy-outline" size="18" /> Surnom :
          </Text>
          <Text style={styles.input}>rbk98</Text>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>
            <Ionicons name="mail-outline" size="18" /> Email :
          </Text>
          {/* <Text style={styles.input}>{user.email}</Text> */}
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>
            <Ionicons name="lock-closed-outline" size="18" /> Mot de passe :
          </Text>
          <Text style={styles.input}>........</Text>
        </View>
      </View>
      <Button text="Modifier" action={onUpdatePress} />
      <ButtonOutline text="Se déconnecter" action={onSignOut} />
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    backgroundColor: "white",
    width: "100%",
    borderRadius: 8,
    padding: 10,
  },
  title: {
    paddingTop: 30,
    paddingBottom: 20,
    fontWeight: "500",
    fontSize: 22,
    color: "#00216d",
  },
  formGroup: {
    marginBottom: 20,
    width: "100%",
  },
  label: {
    color: "#00216d",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    fontSize: 16,
    width: "100%",
  },
  inline: {},
});

export default SettingsScreen;