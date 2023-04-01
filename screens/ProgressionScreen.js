import { StyleSheet, View, Text, ImageBackground, Image } from "react-native";
import React from "react";

const ProgressionScreen = () => {
  return (
    <ImageBackground
      source={require("../assets/home.png")}
      resizeMode="cover"
      style={styles.container}
    >
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require("../assets/romy/romycrownfilled.png")}
        />
        <Text style={styles.headerTitle}>Score</Text>
      </View>
      <View style={styles.main}>
        <Text>Badge</Text>
        <Text>Détails</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    padding: 15,
  },
  header: {
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
    backgroundColor: "#335296",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderWidth: 1,
    borderColor: "#00216d",
  },
  logo: {
    marginTop: 10,
    width: 200,
    height: 200,
  },
  headerTitle: {
    textAlign: "center",
    color: "white",
    fontSize: 23,
    fontWeight: "700",
    paddingVertical: 7,
  },
  main: {
    padding: 15,
  },
});
export default ProgressionScreen;
