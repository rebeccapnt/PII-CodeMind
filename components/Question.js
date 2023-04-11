import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const Question = ({ content, currentQuestion, nbQuestions }) => {
  return (
    <View style={styles.content}>
      <Text style={styles.nbQuestions}>
        {currentQuestion} / {nbQuestions}
      </Text>
      <Text style={styles.title}> {content} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    borderRadius: 10,
    backgroundColor: "white",
    marginBottom: 20,
    width: "100%",
  },
  title: {
    color: "#00216d",
    fontSize: 22,
    fontWeight: "500",
    textAlign: "center",
    padding: 15,
    paddingBottom: 32,
    paddingHorizontal: 24,
  },
  nbQuestions: {
    color: "#00216d",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    marginVertical: 10,
  },
});
