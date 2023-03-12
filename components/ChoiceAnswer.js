import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const ChoiceAnswer = ({ answer }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => {}} key={"test"}>
        <Text style={styles.textAnswer}>{answer}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChoiceAnswer;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    borderWidth: 1,
    borderColor: "#00216d",
    backgroundColor: "white",
    width: "100%",
    padding: 15,
    marginTop: 2,
    borderRadius: 8,
    alignItems: "center",
  },
  textAnswer: {
    fontSize: 16,
    color: "#00216d",
    fontWeight: "500",
  },
});
