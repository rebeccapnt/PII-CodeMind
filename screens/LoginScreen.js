import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { ButtonOutline } from "../components/ButtonOutline";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //   const navigation = useNavigation();

  //   //Event Listener : if user is already login
  //   useEffect(() => {
  //     const unsubscribe = auth().onAuthStateChanged((user) => {
  //       if (user) {
  //         navigation.navigate("Accueil");
  //       }
  //     });
  //     return unsubscribe;
  //   }, []);
  //   const handleSignUp = () => {
  //     auth
  //       .createUserWithEmailAndPassword(email, password)
  //       .then((userCredentials) => {
  //         const user = userCredentials.user;
  //         console.log(user.email);
  //       })
  //       .catch((error) => alert(error.message));
  //   };

  //   const handleLogin = () => {
  //     auth
  //       .createUserWithEmailAndPassword(email, password)
  //       .then((userCredentials) => {
  //         const user = userCredentials.user;
  //         console.log("Connecté avec :", user.email);
  //       })
  //       .catch((error) => alert(error.message));
  //   };
  const navigation = useNavigation();

  const onLoginPress = () => {
    navigation.navigate("Apprendre");
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Image style={styles.logo} source={require("../assets/logo.png")} />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Mot de passe"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>
      <Button action={onLoginPress} text="Se connecter" />
      <ButtonOutline action={() => {}} text="Créer mon compte" />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e1ecff",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 40,
  },
  inputContainer: {
    width: "80%",
    fontSize: 16,
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 8,
  },
});
