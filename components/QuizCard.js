import React from "react";
import { StyleSheet, View, Text } from "react-native";

export const QuizCard = ({item, workflow}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.formationName}>{item.name}</Text>
      <Text style={styles.quizScore}>Score: {quizScore}</Text>
      <Text style={styles.quizDate}>Date: {workflow.finishedAt}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  formationName: {
    color: "#00216d",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  quizScore: {
    color: "#00216d",
    fontSize: 16,
    marginBottom: 5,
  },
  quizDate: {
    color: "#00216d",
    fontSize: 16,
  },
});
