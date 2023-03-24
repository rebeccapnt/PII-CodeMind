import { StyleSheet, View, Text, Image, ImageBackground } from "react-native";
import React, { useLayoutEffect } from "react";
import { Button } from "../components/Button";

const StartScreen = ({ navigation, route }) => {
  const { sequenceId } = route.params;

  const onPressStart = () => {
    navigation.navigate("Quiz");
  };
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <ImageBackground
      source={require("../assets/quiz-bg.png")}
      resizeMode="cover"
      style={styles.container}
    >
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../assets/romy/romyhappy.png")}
        />
        <Text>Es-tu prêt à démarrer le quiz ? </Text>
        <Button text="Commencer >" action={() => onPressStart()} />
        <Button text="< Retour au cours" action={() => navigation.goBack()} />
      </View>
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
export default StartScreen;
