import { StyleSheet, View, Text, Image, ImageBackground } from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { Button } from "../components/Button";
import { WorkflowsServices } from "../services/WorkflowsServices";
import { getAuth } from "firebase/auth";

const StartScreen = ({ navigation, route }) => {
  const { sequenceId, courseId } = route.params;
  const [workflow, setWorkflow] = useState(null);
  const [user, setUser] = useState(null);

  const auth = getAuth();

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return subscriber;
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const onPressStart = async () => {
    try {
      const workflow = await WorkflowsServices.createWorkflow(
        sequenceId,
        courseId,
        user.uid
      );
      setWorkflow(workflow);
      navigation.navigate("Quiz", {
        sequenceId: sequenceId,
        courseId: courseId,
        workflowId: workflow,
      });
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

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
        <Text>Es-tu prêt à démarrer le quiz ?</Text>
        {/* Dire vous n'avez pasdetemps limité etc permet de voir si t'as bien compris le cours */}
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
