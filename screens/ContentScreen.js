import { StyleSheet, View, Text, ImageBackground } from "react-native";
import React from "react";
import Button from "../components/Button";

const ContentScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../assets/home.png")}
      resizeMode="cover"
      style={styles.container}
    >
      <Text>ContentScreen</Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
  },
});
export default ContentScreen;
