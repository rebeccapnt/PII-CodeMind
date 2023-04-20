import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import moment from "moment";

export const QuizCard = ({ workflow, onPress }) => {
  const date = moment(workflow.finishedAt).format("DD MMMM YYYY");
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress()}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.formationName}>{workflow.sequenceName}</Text>
          <Text style={styles.quizScore}>Score: {workflow.quizScore}%</Text>
          <Text style={styles.quizDate}>Réalisé le {date}.</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#E86231" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderColor: "#FFEFE6",
    borderWidth: 1,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 3,
    marginBottom: 5,
    marginHorizontal:4
  },
  card: { paddingBottom: 4 },
  content: {
    flex: 1,
    marginRight: 10,
  },
  formationName: {
    color: "#E86231",
    fontWeight: "700",
    fontSize: 17,
    marginBottom: 5,
  },
  quizScore: {
    color: "#00216d",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
  quizDate: {
    color: "#00216d",
    fontSize: 15,
  },
});
