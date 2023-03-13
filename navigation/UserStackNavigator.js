import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AccountScreen from "../screens/AccountScreen";
import SettingScreen from "../screens/SettingScreen";

import { Ionicons } from "@expo/vector-icons";

// Screen stack for home tab
const UserStack = createNativeStackNavigator();

const UserStackNavigator = ({ navigation }) => {
  return (
    <UserStack.Navigator
      initialRouteName="Profil"
      screenOptions={{ headerShown: true }}
    >
      <UserStack.Screen
        name="Profil"
        component={AccountScreen}
        options={({ route }) => ({
          headerTitle: "Profil",
          headerRight: () =>
            route.name === "Profil" && (
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
        component={SettingScreen}
        options={{ title: "Paramètres" }}
      />
    </UserStack.Navigator>
  );
};

export default UserStackNavigator;
