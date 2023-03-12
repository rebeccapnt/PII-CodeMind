import { StyleSheet, View, Text, Image } from "react-native";
import React from "react";
import ChoiceAnswer from "../components/ChoiceAnswer";
import Question from "../components/Question";
import { LinearGradient } from "expo-linear-gradient";

const QuizScreen = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["rgba(245, 116, 39, 0.8)", "white"]}
        style={styles.background}
      />
      <View style={styles.counterPoints}>
        <Image
          style={styles.logo}
          source={require("../assets/romy/romyhappy.png")}
        />
      </View>
      <Question content="Quel est le mot clé utilisé pour commencer une boucle for en PHP ?" />
      <ChoiceAnswer answer="for" />
      <ChoiceAnswer answer="foreach" />
      <ChoiceAnswer answer="while" />
      <ChoiceAnswer answer="do while" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 1000,
  },
  logo: {
    width: 100,
    height: 100,
  },
});
export default QuizScreen;