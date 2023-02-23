import React from "react";
import { Button } from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import {
  Dimensions,
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
} from "react-native";

const AccountScreen = ({ navigation }) => {
  const onLoginPress = () => {
    navigation.navigate("Login");
  };
  const onSignInPress = () => {
    navigation.navigate("SignIn");
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableHighlight style={styles.circle}>
          <Text style={styles.nicknameInitial}> RP</Text>
        </TouchableHighlight>
        <Text style={styles.footer}>Actif depuis le 02 janvier 2023.</Text>
      </View>

      <Button text="Se connecter" action={onLoginPress} />
      <Button text="Créer son compte" action={onSignInPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 25,
  },
  title: {
    paddingTop: 30,
    paddingBottom: 20,
    fontWeight: "500",
    fontSize: 20,
    color: "#00216d",
  },
  nicknameInitial: {
    color: "#00216d",
    fontSize: 40,
  },
  circle: {
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    width: Dimensions.get("window").width * 0.4,
    height: Dimensions.get("window").width * 0.4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "#00216d",
    borderWidth: 5,
  },
  footer: {
    paddingTop: 8,
  },
});
export default AccountScreen;
