import { StyleSheet, View, Text, Image } from "react-native";
import React from "react";
import ChoiceAnswer from "../components/ChoiceAnswer";
import Question from "../components/Question";
import { LinearGradient } from "expo-linear-gradient";

const QuizScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/romy/romyhappy.png")}
      />
      <Text>Es-tu prêt à démarrer le cours ? </Text>
      <Button
      text="Commencer"
      action ="Sequence"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
  logo: {
    width: 100,
    height: 100,
  },
});
export default QuizScreen;
