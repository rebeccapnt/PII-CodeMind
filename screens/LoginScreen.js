import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const OnHandleLogin = () => {
    // Vérification si les champs d'email et de mot de passe sont remplis
    if (email !== "" && password !== "") {
      const auth = getAuth(); // Récupération de l'objet d'authentification Firebase et appel de la fonction signInWithEmailAndPassword
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          navigation.navigate("Accueil"); // Redirection vers l'écran "Accueil" si la connexion a été effectuée
        })
        .catch((error) => {
          // Si la connexion échoue, récupère l'objet d'erreur
          if (error.code === "auth/wrong-password") {
            setErrorMessage("Mauvais mot de passe"); //Affichage d'un message d'erreur si le mot de passe est incorrect
          } else {
            setErrorMessage(
              "Il n'y a pas de compte associé à cette adresse mail."
            ); //Affichage d'un message d'erreur s'il n'y a pas de compte associé à cette email
          }
        });
    } else {
      setErrorMessage("Attention ! Veuillez remplir tous les champs."); // Affichage d'un message d'erreur si les champs email et de mot de passe sont obligatoires
      return;
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ImageBackground
        source={require("../assets/authentification.png")}
        resizeMode="cover"
        style={styles.container}
      >
        <Image style={styles.logo} source={require("../assets/icon-512.png")} />
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            value={email}
            autoCapitalize="none"
            keyboardType="email-adress"
            textContentType="emailAdress"
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Mot de passe"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            value={password}
            textContentType="password"
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
          />
          {errorMessage ? (
            <Text
              style={{
                color: "red",
                textAlign: "center",
                fontSize: 16,
                paddingTop: 10,
              }}
            >
              {errorMessage}
            </Text>
          ) : null}
        </View>
        <Button action={OnHandleLogin} text="Se connecter" />
        <View style={styles.signUp}>
          <Text style={{ color: "dimgrey", fontWeight: "600", fontSize: 14 }}>
            Pas encore de compte ?{" "}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.signUpButton}>S'inscrire</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 60,
  },
  inputContainer: {
    width: "80%",
    fontSize: 16,
  },
  input: {
    backgroundColor: "#FAFCFA",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 8,
  },
  signUp: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  signUpButton: { color: "#00216d", fontWeight: "600", fontSize: 15 },
});
