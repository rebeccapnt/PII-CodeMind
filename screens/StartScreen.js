import { StyleSheet, View, Text, Image, ImageBackground } from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { Button } from "../components/Button";
import { WorkflowsServices } from "../services/WorkflowsServices";
import { getAuth } from "firebase/auth";
import { ButtonOutline } from "../components/ButtonOutline";

const StartScreen = ({ navigation, route }) => {
  const { sequenceId, courseId } = route.params;
  const [workflow, setWorkflow] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

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
        workflowId: workflow,
      });
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/background.png")}
      resizeMode="cover"
      style={styles.container}
    >
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../assets/romy/romyhappyfilled.png")}
        />
        <Text style={styles.title}>Es-tu prêt(e) à démarrer le quiz ?</Text>
        <Text style={styles.subTitle}>
          Tu n'auras pas de limite de temps pour faire le quiz. L'important est
          de voir si tu as compris et retenu le cours !
        </Text>
        <Button text="Je suis prêt(e) ! " action={() => onPressStart()} />
        <ButtonOutline
          text="Retourner lire le cours"
          action={() => navigation.goBack()}
        />
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
    width: 240,
    height: 240,
  },
  title: {
    textAlign: "center",
    color: "#00216d",
    fontSize: 23,
    fontWeight: "700",
    paddingVertical: 10,
    marginTop: 20,
  },
  subTitle: {
    textAlign: "center",
    color: "#00216d",
    fontSize: 15,
    padding: 10,
    paddingHorizontal: 20,
  },
});
export default StartScreen;
