import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Button } from "../components/Button";
import { ButtonOutline } from "../components/ButtonOutline";
import { WorkflowsServices } from "../services/WorkflowsServices";
import { SequencesServices } from "../services/SequencesServices";

const EndQuizScreen = ({ navigation, route }) => {
  const { workflowId } = route.params;
  const [workflow, setWorkflow] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [resultQuiz, setResultQuiz] = useState();

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const onPressResult = async () => {
    navigation.navigate("Progression");
  };

  const onPressSequence = async () => {
    navigation.navigate("Apprendre", {
      screen: "Sequence",
      params: {
        courseId: workflow.course.id,
      },
    });
  };

  useEffect(() => {
    //Récupération du workflow pour afficher les données de fin du quiz
    const loadWorkflow = async () => {
      try {
        const workflow = await WorkflowsServices.fetchWorkflow(workflowId);
        setWorkflow(workflow);
        const resultQuiz = await WorkflowsServices.calculateQuizScore(
          workflow.answers
        );
        setResultQuiz(resultQuiz);
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
      <ScrollView>
        <View style={styles.container}>
          {workflow.score === 0 ? (
            <>
              <Image
                style={styles.logo}
                source={require("../assets/romy/romysadfilled.png")}
              />
              <Text style={styles.title}>Retente ta chance !</Text>
              <View style={styles.contentResult}>
                <Text style={styles.score}>
                  Tu n'as eu aucune bonne réponse à ce quiz, et tu n'as donc pas
                  obtenu de points... Tu peux retourner lire le cours si tu n'as
                  pas compris quelques notions, et recommencer le quiz lorsque
                  tu te sentiras prêt(e) !
                </Text>
              </View>
              <Button
                text="Voir mes résultats"
                action={() => onPressResult()}
              />
              <ButtonOutline
                text="Retourner lire le chapitre"
                action={() => onPressSequence()}
              />
            </>
          ) : (
            <>
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
                  Tu as réussi le quiz à{" "}
                  <Text style={{ fontWeight: "700" }}>{resultQuiz}% </Text>et tu
                  as gagné{" "}
                  <Text style={{ fontWeight: "700" }}>
                    {workflow.score} points
                  </Text>{" "}
                  ! Tu peux aller voir tes résultats dans la partie progression.
                </Text>
              </View>
              <Button
                text="Voir mes résultats"
                action={() => onPressResult()}
              />
              <ButtonOutline
                text="Continuer"
                action={() => onPressSequence()}
              />
            </>
          )}
        </View>
      </ScrollView>
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
    marginTop: 50,
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
