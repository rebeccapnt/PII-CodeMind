import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  ActivityIndicator,
} from "react-native";
import { Button } from "../components/Button";
import { ButtonOutline } from "../components/ButtonOutline";
import { WorkflowsServices } from "../services/WorkflowsServices";
import { SequencesServices } from "../services/SequencesServices";

const EndQuizScreen = ({ navigation, route }) => {
  const { workflowId } = route.params;
  const [workflow, setWorkflow] = useState();
  const [nextSequence, setNextSequence] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const onPressResult = async () => {
    navigation.navigate("Progression");
  };

  const onPressNextSequence = async () => {
    navigation.navigate("Detail", {
      courseId: workflow.course.id,
      sequenceId: nextSequence,
    });
  };

  useEffect(() => {
    const loadWorkflow = async () => {
      console.log(workflowId);

      try {
        const workflow = await WorkflowsServices.fetchWorkflow(workflowId);
        setWorkflow(workflow);
        console.log(workflow);
        const nextSequence = await SequencesServices.fetchNextSequence(
          workflow.sequence.id
        );
        setNextSequence(nextSequence.Id);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    loadWorkflow();
  }, [workflow]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00216d" />
      </View>
    );
  }

  if (error || !workflow) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Une erreur est survenue.</Text>
      </View>
    );
  }

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
        <Text style={styles.title}>Félicitations !</Text>
        <Text style={styles.subTitle}>
          Tu viens de terminer le quiz, voici les scores obtenus :
        </Text>
        <View style={styles.contentResult}>
          <Text style={styles.score}>
            Tu as gagné {workflow.score} points. Tu peux aller voir tes
            résultats dans la partie progression. Si score élevé, romy happy
            sinon romy sad.
          </Text>
        </View>
        <Button text="Voir mes résultats" action={() => onPressResult()} />
        <ButtonOutline
          text="Voir le chapitre suivant"
          action={() => onPressNextSequence()}
        />
      </View>
    </ImageBackground>
  );
};

export default EndQuizScreen;

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
    fontSize: 28,
    fontWeight: "600",
    paddingVertical: 10,
    marginTop: 10,
  },
  subTitle: {
    textAlign: "center",
    color: "#00216d",
    fontWeight: "500",
    fontSize: 16,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  contentResult: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  score: {
    color: "#00216d",
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});
