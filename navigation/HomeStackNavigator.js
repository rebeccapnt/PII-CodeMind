import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import CourseStackNavigator from "./CourseStackNavigator";

// Screen stack for home tab
const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Accueil" }}
      />
      <HomeStack.Screen name="Course" component={CourseStackNavigator} />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
