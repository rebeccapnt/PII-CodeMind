import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProgressionScreen from "../screens/ProgressionScreen";

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
    </ProgressStack.Navigator>
  );
};

export default ProgressStackNavigator;
