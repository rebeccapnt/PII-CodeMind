import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";

// Screen stack for home tab
const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator initialRouteName="Accueil">
      <HomeStack.Screen name="Accueil" component={HomeScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
