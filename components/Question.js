import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Question = ({ content }) => {
  return (
    <View style={styles.content}>
      <Text style={styles.title}> {content} </Text>
    </View>
  );
};

export default Question;

const styles = StyleSheet.create({
  content: {
    padding: 20,
    marginBottom: 20,
    paddingVertical: 80,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "white",
  },
  title: {
    color: "#00216d",
    fontSize: 22,
    fontWeight: "500",
    textAlign: "center",
  },
});
