import React from "react";
import { StyleSheet, Text, ImageBackground } from "react-native";
import { SequenceCard } from "../components/SequenceCard";

const Sequence = () => {
  return (
    <ImageBackground
      source={require("../assets/home.png")}
      resizeMode="cover"
      style={styles.container}
    >
      <Text style={styles.title}> Introduction </Text>
      <SequenceCard title="Les variables" actionStart="Content" />
      <SequenceCard title="Les boucles" actionStart="Content" />
    </ImageBackground>
  );
};

export default Sequence;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  title: {
    paddingVertical: 10,
    fontWeight: "500",
    fontSize: 20,
    color: "#00216d",
  },
  content: {},
});
