import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AccountScreen from "../screens/AccountScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";

// Screen stack for home tab
const UserStack = createNativeStackNavigator();

const UserStackNavigator = () => {
  return (
    <UserStack.Navigator screenOptions={{ headerShown: false }}>
      <UserStack.Screen name="Login" component={LoginScreen} />
      <UserStack.Screen name="SignUp" component={SignUpScreen} />
    </UserStack.Navigator>
  );
};

export default UserStackNavigator;
