import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CourseScreen from "../screens/CourseScreen";
import SequenceScreen from "../screens/SequenceScreen";
import ContentScreen from "../screens/ContentScreen";
import QuizScreen from "../screens/QuizScreen";

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
        options={{ title: "Découverte PHP" }}
      />
      <CourseStack.Screen
        name="Content"
        component={ContentScreen}
        options={{ title: "Contenu" }}
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
