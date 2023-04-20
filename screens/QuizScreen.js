import { useState, useEffect, useLayoutEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { ChoiceAnswer } from "../components/ChoiceAnswer";
import { Question } from "../components/Question";
import { WorkflowsServices } from "../services/WorkflowsServices";
import { Button } from "../components/Button";
import { UserServices } from "../services/UserServices";
import { SequencesServices } from "../services/SequencesServices";

const QuizScreen = ({ navigation, route }) => {
  const { workflowId, sequenceId } = route.params;
  const [questions, setQuestions] = useState([]);
  const allQuestions = questions.length;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const currentQuestion = questions[currentQuestionIndex];
  const currentDate = new Date().toISOString();

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const questions = await SequencesServices.fetchQuestionsForQuiz(
          sequenceId
        );
        if (questions) {
          setQuestions(questions[0].questions);
        }
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    loadQuestions();
  }, []);

  const handleAnswer = (index) => {
    setIsAnswered(true);
    const updatedQuestions = [...questions]; //copie de "questions" actuel
    const currentQuestion = updatedQuestions[currentQuestionIndex];

    // parcours des réponses de la question actuelle
    currentQuestion.responses.forEach((response, i) => {
      response.isSelected = i === index;
    });

    setQuestions(updatedQuestions);
  };

  const handleNextQuestion = () => {
    const selectedResponseIndex = currentQuestion.responses.findIndex(
      (response) => response.isSelected
    );
    const isCorrect =
      currentQuestion.responses[selectedResponseIndex].isCorrect;
    const questionId = currentQuestionIndex;
    const responseId = selectedResponseIndex;

    const newAnswer = {
      questionId: questionId,
      responseId: responseId,
      isCorrect: isCorrect,
    };

    // Accéder à la dernière valeur de answers et ajouter la réponse
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers, newAnswer];
      WorkflowsServices.updateAnswersWorkflow(
        workflowId,
        newAnswers,
        currentDate
      );
      return newAnswers;
    });

    // Accéder à la dernière valeur de score et ajouter +2 si bonne réponse
    setScore((prevScore) => {
      const newScore = prevScore + (isCorrect ? 2 : 0);
      WorkflowsServices.updateScoreWorkflow(workflowId, newScore);
      UserServices;
      return newScore;
    });

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1); // Passer à la question suivante
      setIsAnswered(false); // Réinitialiser l'état de la réponse sélectionnée
      setShowNextButton(false); // Cacher le bouton suivant
    } else {
      navigation.navigate("EndQuiz", {
        workflowId: workflowId,
      });
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00216d" />
      </View>
    );
  }

  if (error || !questions) {
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
      <ScrollView style={{ flex: 1, width:"100%"}}>
        <View style={styles.header}>
          <Image
            style={styles.logo}
            source={require("../assets/romy/romystudy.png")}
          />
          <Question
            content={currentQuestion.question}
            currentQuestion={currentQuestionIndex + 1}
            nbQuestions={allQuestions}
          />
        </View>
        <View style={styles.quizSection}>
          {currentQuestion.responses.map((response, index) => (
            <ChoiceAnswer
              key={index}
              answer={response.response}
              onPress={() => handleAnswer(index)}
              isAnswered={isAnswered}
              isSelected={response.isSelected}
            />
          ))}
        </View>
        <View style={styles.buttonNext}>
          {isAnswered && (
            <Button text="Suivant" action={() => handleNextQuestion()} />
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: { alignItems: "center", width: "100%", paddingHorizontal: 20 },
  logo: {
    width: 200,
    height: 200,
    marginTop: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  quizSection: {
    paddingHorizontal: 30,
    width: "100%",
    alignItems: "center",
  },
  buttonNext: {
    alignItems: "center",
    marginBottom: 20,
  },
});

export default QuizScreen;
