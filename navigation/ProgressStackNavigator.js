import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProgressionScreen from "../screens/ProgressionScreen";
import DetailQuizScreen from "../screens/DetailQuizScreen";

// Screen stack for progress tab
const ProgressStack = createNativeStackNavigator();

const ProgressStackNavigator = () => {
  return (
    <ProgressStack.Navigator initialRouteName="Progress">
      <ProgressStack.Screen
        name="Progress"
        component={ProgressionScreen}
        options={{ title: "Ma progression" }}
      />
      <ProgressStack.Screen
        name="Result"
        component={DetailQuizScreen}
        options={{ title: "Résultat" }}
      />
    </ProgressStack.Navigator>
  );
};

export default ProgressStackNavigator;
