import { StyleSheet, View, Text, Image, ImageBackground } from "react-native";
import React, { useLayoutEffect } from "react";
import { ChoiceAnswer } from "../components/ChoiceAnswer";
import { Question } from "../components/Question";

const QuizScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <ImageBackground
      source={require("../assets/background.png")}
      resizeMode="cover"
      style={styles.container}
    >
      <View style={styles.counterPoints}>
        <Image
          style={styles.logo}
          source={require("../assets/romy/romystudy.png")}
        />
      </View>
      <Question content="Quel est le mot clé utilisé pour commencer une boucle for en PHP ?" />
      <ChoiceAnswer answer="for" />
      <ChoiceAnswer answer="foreach" />
      <ChoiceAnswer answer="while" />
      <ChoiceAnswer answer="do while" />
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
    width: 200,
    height: 200,
    marginVertical: 10,
  },
});
export default QuizScreen;
