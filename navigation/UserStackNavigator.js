import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AccountScreen from "../screens/AccountScreen";
import LoginScreen from "../screens/LoginScreen";

// Screen stack for home tab
const UserStack = createNativeStackNavigator();

const UserStackNavigator = () => {
  return (
    <UserStack.Navigator initialRouteName="Profil">
      <UserStack.Screen
        name="Profil"
        component={AccountScreen}
        options={{ title: "Mon compte" }}
      />
      <UserStack.Screen name="Login" component={LoginScreen} />
    </UserStack.Navigator>
  );
};

export default UserStackNavigator;
