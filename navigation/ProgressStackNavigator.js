import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CourseScreen from "../screens/CourseScreen";
import SequenceScreen from "../screens/CourseScreen";

// Screen stack for home tab
const ProgressStack = createNativeStackNavigator();

const ProgressStackNavigator = () => {
  return (
    <ProgressStack.Navigator initialRouteName="Progress">
      <ProgressStack.Screen
        name="Progression"
        component={ProgressionScreen}
        options={{ title: "Ma progression" }}
      />
    </ProgressStack.Navigator>
  );
};

export default ProgressStackNavigator;
