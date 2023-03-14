import React, { useState } from "react";
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
import { getAuth, signOut } from "firebase/auth";

const SettingsScreen = ({ navigation }) => {
  const [surnom, setSurnom] = useState("");
  const [email, setEmail] = useState("jean@example.com");
  const [password, setPassword] = useState("");

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
          <Text style={styles.label}>Surnom:</Text>
          <Text style={styles.input}>RebeccaPinoteau</Text>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.input}>rgrenet@ensc.fr</Text>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Mot de passe:</Text>
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
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    fontSize: 16,
    padding: 10,
    width: "100%",
  },
  inline: {},
});

export default SettingsScreen;
