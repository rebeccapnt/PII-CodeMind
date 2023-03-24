import { StyleSheet, View, Text, ImageBackground } from "react-native";
import React from "react";

const ProgressionScreen = () => {
  return (
    <ImageBackground
      source={require("../assets/home.png")}
      resizeMode="cover"
      style={styles.container}
    >
      <View style={styles.main}>
        <Text> ProgressionScreen </Text>
        {/* Mettre la date actuelle en haut à droite
        peut etre le nombre de fois qu'il a lu un cours / Fait un quiz
        Penser à faire la distinction sur la page si pas de cours commencé
        Peut être mettre un nombre de pièce?*/}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    paddingHorizontal: 10,
  },
});
export default ProgressionScreen;
