import React from "react";
import { Button } from "../components/Button";
import { ButtonOutline } from "../components/ButtonOutline";
import {
  Dimensions,
  TouchableHighlight,
  StyleSheet,
  Text,
  ScrollView,
  View,
  ImageBackground,
} from "react-native";
import { getAuth, signOut } from "firebase/auth";

const SettingScreen = ({ navigation }) => {
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
        <Button text="Modifier mes informations" action={onUpdatePress} />
        <ButtonOutline text="Me déconnecter" action={onSignOut} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
});
export default SettingScreen;
