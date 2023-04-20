import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ActivityIndicator,
  Image,
  TouchableHighlight,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { WorkflowsServices } from "../services/WorkflowsServices";
import { ScrollView } from "react-native-gesture-handler";

const DetailQuizScreen = ({ navigation, route }) => {
  const { quizId } = route.params;
  const [workflow, setWorkflow] = useState();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadWorkflow = async () => {
    try {
      const workflow = await WorkflowsServices.fetchWorkflow(quizId);
      setWorkflow(workflow);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadWorkflow();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00216d" />
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../assets/home.png")}
      resizeMode="cover"
      style={styles.container}
    >
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require("../assets/romy/romycrownfilled.png")}
        />
        <Text style={styles.headerTitle}>{workflow.sequenceName}</Text>
        <Text style={styles.headerSubtitle}>
          Voici tes résultats à ce quiz. N'hésites pas à revoir le cours si tu
          le souhaites !
        </Text>
      </View>
      <ScrollView>
        <View style={styles.containerResult}>
          <View style={styles.containerNote}>
            <Text style={styles.note}>Tu as eu un score global de : </Text>
            <TouchableHighlight style={styles.circle}>
              <Text style={styles.percentResult}>{workflow.quizScore} %</Text>
            </TouchableHighlight>
          </View>
          {workflow.incorrectQuestions.length > 0 ? (
            <View>
              <Text style={styles.numberError}>
                Mais attention ! Tu as fait {workflow.incorrectQuestions.length}{" "}
                erreur(s)...
              </Text>
              {workflow.incorrectQuestions.map((question, index) => (
                <View style={styles.incorrectAnswerContainer} key={index}>
                  <Text style={styles.question}>{question.question}</Text>
                  <Text style={styles.incorrectAnswer}>
                    Tu as répondu : {question.response}
                  </Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.noErrorQuiz}>
              Félicitations ! Tu n'as fait aucune erreur !
            </Text>
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default DetailQuizScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
    backgroundColor: "#335296",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 15,
  },
  logo: {
    marginTop: 10,
    width: 140,
    height: 140,
  },
  headerTitle: {
    textAlign: "center",
    color: "white",
    fontSize: 23,
    fontWeight: "700",
    paddingVertical: 7,
  },
  headerSubtitle: {
    fontSize: 16,
    fontWeight: "400",
    paddingBottom: 20,
    color: "white",
    paddingHorizontal: 15,
    textAlign: "center",
  },
  containerResult: { padding: 10 },
  containerNote: {
    borderColor: "#00216d",
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 20,
    paddingBottom: 20,
  },
  note: {
    padding: 14,
    textAlign: "center",
    fontSize: 17,
    color: "#00216d",
    fontWeight: "600",
  },
  percentResult: {
    color: "#00216d",
    fontSize: 20,
    fontWeight: "600",
  },
  circle: {
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    width: Dimensions.get("window").width * 0.18,
    height: Dimensions.get("window").width * 0.18,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#E7EEFF",
    borderColor: "#00216d",
    borderWidth: 4,
  },
  numberError: {
    color: "#00216d",
    textAlign: "center",
    paddingBottom: 15,
    fontSize: 17,
    fontWeight: "600",
  },
  incorrectAnswerContainer: {
    padding: 10,
    backgroundColor: "#FFBDBC",
    borderRadius: 10,
    borderColor: "#E97C7B",
    borderWidth: 1,
    marginBottom: 8,
  },
  question: {
    fontWeight: "bold",
    marginBottom: 5,
    fontSize: 16,
  },
  incorrectAnswer: {
    color: "#87100F",
    fontWeight: "600",
    fontSize: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});
