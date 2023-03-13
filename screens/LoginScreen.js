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
import { Input } from "../components/Input";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const OnHandleLogin = () => {
    if (email !== "" && password !== "") {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          navigation.navigate("Accueil");
        })
        .catch((error) => {
          if (error.code === "auth/wrong-password") {
            setErrorMessage("Mauvais mot de passe");
          } else {
            setErrorMessage(
              "Il n'y a pas de compte associé à cette adresse mail."
            );
          }
        });
    } else {
      setErrorMessage("Attention ! Veuillez remplir tous les champs.");
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
    width: 220,
    height: 220,
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
