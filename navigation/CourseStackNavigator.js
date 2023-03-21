import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CourseScreen from "../screens/CourseScreen";
import SequenceScreen from "../screens/SequenceScreen";
import DetailSequenceScreen from "../screens/DetailSequenceScreen";
import QuizScreen from "../screens/QuizScreen";
import StartScreen from "../screens/StartScreen";

// Screen stack for home tab
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
        options={{ title: "Chapitres" }}
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
    </CourseStack.Navigator>
  );
};

export default CourseStackNavigator;
