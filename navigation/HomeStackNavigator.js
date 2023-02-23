import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";

// Screen stack for home tab
const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen
        name="Accueil"
        component={HomeScreen}
        options={{ title: "Accueil" }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
