import { StyleSheet, Text, View } from "react-native";
import React from "react";

const AccountScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Mon compte</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e1ecff",
  },
});
export default AccountScreen;
