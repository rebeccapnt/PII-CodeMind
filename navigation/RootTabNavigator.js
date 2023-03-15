import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CourseStackNavigator from "./CourseStackNavigator";
import UserStackNavigator from "./UserStackNavigator";
import HomeStackNavigator from "./HomeStackNavigator";
import ProgressStackNavigator from "./ProgressStackNavigator";

const Tab = createBottomTabNavigator();

const RootTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Course") {
            iconName = focused ? "book" : "book-outline";
          } else if (route.name === "Progress") {
            iconName = focused ? "bar-chart" : "bar-chart-outline";
          } else if (route.name === "User") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: "#00216d",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: {
          fontSize: 12,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Course" component={CourseStackNavigator} />
      <Tab.Screen name="Progress" component={ProgressStackNavigator} />
      <Tab.Screen name="User" component={UserStackNavigator} />
    </Tab.Navigator>
  );
};

export default RootTabNavigator;
