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
