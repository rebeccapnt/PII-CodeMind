import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const Question = ({ content }) => {
  return (
    <View style={styles.content}>
      <Text style={styles.title}> {content} </Text>
    </View>
  );
};

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
