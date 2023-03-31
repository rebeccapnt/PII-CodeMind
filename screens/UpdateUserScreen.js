import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React from "react";

const UpdateUserScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../assets/authentification.png")}
      resizeMode="cover"
      style={styles.container}
    >
      <View>
        <Text style={styles.title}>Modifier mes informations</Text>
      </View>
      <View style={styles.background}></View>
    </ImageBackground>
  );
};

export default UpdateUserScreen;

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
});
