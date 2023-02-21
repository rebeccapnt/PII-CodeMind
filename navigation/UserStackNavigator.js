import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CourseScreen from "../screens/CourseScreen";
import SequenceScreen from "../screens/CourseScreen";

// Screen stack for home tab
const UserStack = createNativeStackNavigator();

const UserStackNavigator = () => {
  return (
    <UserStack.Navigator initialRouteName="Apprendre">
      <UserStack.Screen
        name="Apprendre"
        component={CourseScreen}
        options={{ title: "Apprendre" }}
      />
      <UserStack.Screen name="Sequence" component={SequenceScreen} />
    </UserStack.Navigator>
  );
};

export default UserStackNavigator;
