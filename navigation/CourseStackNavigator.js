import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CourseScreen from "../screens/CourseScreen";
import SequenceScreen from "../screens/SequenceScreen";
import DetailSequenceScreen from "../screens/DetailSequenceScreen";
import QuizScreen from "../screens/QuizScreen";
import StartScreen from "../screens/StartScreen";
import EndQuizScreen from "../screens/EndQuizScreen";

// Screen stack for Course tab
const CourseStack = createNativeStackNavigator();

const CourseStackNavigator = () => {
  return (
    <CourseStack.Navigator initialRouteName="Learn">
      <CourseStack.Screen
        name="Learn"
        component={CourseScreen}
        options={{ title: "Les enseignements disponibles" }}
      />
      <CourseStack.Screen
        name="Sequence"
        component={SequenceScreen}
        options={({ route }) => ({
          title: "Chapitre",
          headerShown: true,
        })}
      />
      <CourseStack.Screen
        name="Detail"
        component={DetailSequenceScreen}
        options={{ title: "Contenu" }}
      />
      <CourseStack.Screen
        name="Start"
        component={StartScreen}
        options={{ title: "Commencer le quiz" }}
      />
      <CourseStack.Screen
        name="Quiz"
        component={QuizScreen}
        options={{ title: "Quiz" }}
      />
      <CourseStack.Screen
        name="EndQuiz"
        component={EndQuizScreen}
        options={{ title: "Fin du quiz" }}
      />
    </CourseStack.Navigator>
  );
};

export default CourseStackNavigator;
