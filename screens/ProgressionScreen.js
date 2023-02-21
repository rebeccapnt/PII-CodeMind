import { StyleSheet, View, Text } from "react-native";
import React from "react";

const ProgressionScreen = () => {
  return (
    <View style={styles.container}>
      <Text>ProgressionScreen</Text>
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
export default ProgressionScreen;
