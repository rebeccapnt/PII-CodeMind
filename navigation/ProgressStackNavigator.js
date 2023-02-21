import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CourseScreen from "../screens/CourseScreen";
import SequenceScreen from "../screens/CourseScreen";

// Screen stack for home tab
const ProgressStack = createNativeStackNavigator();

const ProgressStackNavigator = () => {
  return (
    <ProgressStack.Navigator initialRouteName="Apprendre">
      <ProgressStack.Screen
        name="Apprendre"
        component={CourseScreen}
        options={{ title: "Apprendre" }}
      />
      <ProgressStack.Screen name="Sequence" component={SequenceScreen} />
    </ProgressStack.Navigator>
  );
};

export default ProgressStackNavigator;
