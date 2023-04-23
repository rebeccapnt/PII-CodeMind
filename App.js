import { LogBox } from "react-native";
LogBox.ignoreAllLogs();
import React, { useState, createContext, useContext, useEffect } from "react";
import RootTabNavigator from "./navigation/RootTabNavigator";
import { NavigationContainer } from "@react-navigation/native";
import AuthentificationStackNavigator from "./navigation/AuthentificationStackNavigator";
import { onAuthStateChanged } from "firebase/auth";
import { View, ActivityIndicator } from "react-native";
import { getAuth } from "firebase/auth";
import {
  AuthenticatedUserProvider,
  AuthenticatedUserContext,
} from "./services/AuthContext";

const RootNavigator = () => {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuth = onAuthStateChanged(
      auth,
      async (authenticatedUser) => {
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
        setIsLoading(false);
      }
    );
    return unsubscribeAuth;
  }, [user]);
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <NavigationContainer>
      {user ? <RootTabNavigator /> : <AuthentificationStackNavigator />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  );
}
