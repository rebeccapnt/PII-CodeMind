import React from "react";
import { Button } from "../components/Button";
import {
  Dimensions,
  TouchableHighlight,
  StyleSheet,
  Text,
  ScrollView,
  View,
  ImageBackground,
} from "react-native";

const SettingScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../assets/authentification.png")}
      resizeMode="cover"
      style={styles.container}
    ></ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
});
export default SettingScreen;
