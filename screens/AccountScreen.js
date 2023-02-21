import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "../components/Button";
import { useNavigation } from "@react-navigation/native";

const AccountScreen = ({ navigation }) => {
  const onLoginPress = () => {
    navigation.navigate("Login");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Mon compte </Text>
      <Button text="Se connecter" action={onLoginPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  title: {
    paddingTop: 30,
    paddingBottom: 20,
    fontWeight: "500",
    fontSize: 20,
    color: "#00216d",
  },
});
export default AccountScreen;
