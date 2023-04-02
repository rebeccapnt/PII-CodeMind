import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
} from "react-native";
import { Button } from "../components/Button";
import firebase from "../services/firebaseConfig.js";
import {
  getAuth,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";

const UpdateUserScreen = ({ navigation }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onPressUpdateUser = async () => {
    const auth = getAuth();
    if (currentPassword !== "" && newPassword !== "") {
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email, // Récupération de l'adresse mail de l'utilisateur connecté
        currentPassword
      );
      try {
        const result = await reauthenticateWithCredential(
          auth.currentUser,
          credential
        );
        updatePassword(auth.currentUser, newPassword); //Mis à jour du mot de passe
        navigation.goBack();
      } catch (error) {
        console.error(error);
      }
    } else {
      setErrorMessage("Attention ! Veuillez remplir tous les champs."); // Affichage d'un message d'erreur si les champs email et de mot de passe sont obligatoires
    }
  };

  return (
    <ImageBackground
      source={require("../assets/authentification.png")}
      resizeMode="cover"
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Modifier mon mot de passe</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.subtitle}>
            Veuillez saisir votre mot de passe actuel et le nouveau :{" "}
          </Text>
          {errorMessage !== "" && (
            <Text style={styles.errorText}>{errorMessage}</Text>
          )}
          <TextInput
            style={styles.input}
            placeholder="Mot de passe actuel"
            placeholderTextColor="#ddd"
            value={currentPassword}
            onChangeText={setCurrentPassword}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Nouveau mot de passe"
            placeholderTextColor="#ddd"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button text="Modifier" action={onPressUpdateUser} />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "80%",
  },
  inputContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginTop: 20,
  },
  title: {
    fontWeight: "700",
    fontSize: 22,
    color: "#00216d",
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontWeight: "300",
    fontSize: 17,
    color: "#00216d",
    marginBottom: 8,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    fontSize: 16,
    paddingVertical: 5,
  },
  input: {
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 16,
    marginTop: 10,
  },
  buttonContainer: { alignItems: "center" },
});
export default UpdateUserScreen;
