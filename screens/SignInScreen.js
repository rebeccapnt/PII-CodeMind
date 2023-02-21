import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { useNavigation } from "@react-navigation/native";

const SignInScreen = ({ navigation }) => {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Image style={styles.logo} source={require("../assets/logo.png")} />

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Surnom"
          value={nickname}
          onChangeText={(text) => setNickname(text)}
          style={styles.input}
        />
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
        <TextInput
          placeholder="Saisir à nouveau le mot de passe"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>
      <Button action={() => {}} text="Créer mon compte" />
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;

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
