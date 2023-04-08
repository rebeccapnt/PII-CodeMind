import { useState, useEffect, useLayoutEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { ChoiceAnswer } from "../components/ChoiceAnswer";
import { Question } from "../components/Question";
import { QuizzesServices } from "../services/QuizzesServices";
import { Button } from "../components/Button";

const QuizScreen = ({ navigation, route }) => {
  const { sequenceId, workflowId, quizId } = route.params;
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const questions = await QuizzesServices.fetchQuestionsForQuiz(quizId);
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
    const updatedQuestions = [...questions];
    const currentQuestion = updatedQuestions[currentQuestionIndex];

    currentQuestion.responses.forEach((response, i) => {
      response.isSelected = i === index;
    });

    setQuestions(updatedQuestions);
  };

  const handleNextQuestion = () => {
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

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <ImageBackground
      source={require("../assets/background.png")}
      resizeMode="cover"
      style={styles.container}
    >
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require("../assets/romy/romystudy.png")}
        />
        <Question content={currentQuestion.question} />
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
      {isAnswered && (
        <Button text="Suivant" action={() => handleNextQuestion()} />
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: { alignItems: "center" },
  logo: {
    width: 200,
    height: 200,
    marginTop: 20,
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
});

export default QuizScreen;
