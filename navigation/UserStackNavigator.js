import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AccountScreen from "../screens/AccountScreen";
import SettingsScreen from "../screens/SettingsScreen";
import LoginScreen from "../screens/LoginScreen";

import { Ionicons } from "@expo/vector-icons";

// Screen stack for home tab
const UserStack = createNativeStackNavigator();

const UserStackNavigator = ({ navigation }) => {
  return (
    <UserStack.Navigator
      initialRouteName="User"
      screenOptions={{ headerShown: true }}
    >
      <UserStack.Screen
        name="User"
        component={AccountScreen}
        options={({ route }) => ({
          headerTitle: "Profil",
          headerRight: () =>
            route.name === "User" && (
              <Ionicons
                name="settings-outline"
                size={24}
                color="black"
                onPress={() => {
                  navigation.navigate("Settings");
                }}
              />
            ),
        })}
      />
      <UserStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: "Paramètres" }}
      />
      <UserStack.Screen name="Login" component={LoginScreen} />
    </UserStack.Navigator>
  );
};

export default UserStackNavigator;
