import { StyleSheet, View, Text, Image, ImageBackground } from "react-native";
import React from "react";
import ChoiceAnswer from "../components/ChoiceAnswer";
import Question from "../components/Question";

const QuizScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../assets/quiz-bg.png")}
      resizeMode="cover"
      style={styles.container}
    >
      <View style={styles.counterPoints}>
        <Image
          style={styles.logo}
          source={require("../assets/romy/romysmile.png")}
        />
      </View>
      {/* <Question content="Quel est le mot clé utilisé pour commencer une boucle for en PHP ?" /> */}
      {/* <ChoiceAnswer answer="for" />
      <ChoiceAnswer answer="foreach" />
      <ChoiceAnswer answer="while" />
      <ChoiceAnswer answer="do while" /> */}
    </ImageBackground>
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
    marginBottom: 20,
  },
});
export default QuizScreen;
