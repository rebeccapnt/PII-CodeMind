import React from "react";
import { StatusBar } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CourseStackNavigator from "./CourseStackNavigator";
import LoginScreen from "../screens/LoginScreen";
import ProgressionScreen from "../screens/ProgressionScreen";

const Tab = createBottomTabNavigator();

const RootTabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Apprendre") {
              iconName = focused ? "book" : "book-outline";
            } else if (route.name === "Progression") {
              iconName = focused ? "bar-chart" : "bar-chart-outline";
            } else if (route.name === "Profil") {
              iconName = focused ? "person" : "person-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#00216d",
          tabBarInactiveTintColor: "gray",
          headerShown: false,
        })}
      >
        <Tab.Screen name="Apprendre" component={CourseStackNavigator} />
        <Tab.Screen name="Progression" component={ProgressionScreen} />
        <Tab.Screen name="Profil" component={LoginScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default RootTabNavigator;