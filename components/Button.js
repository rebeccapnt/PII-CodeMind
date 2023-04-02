import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import React from "react";

export const Button = ({ action, text }) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={action} style={styles.button}>
        <Text style={styles.buttonText}> {text} </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2.5,
    elevation: 2,
  },
  button: {
    backgroundColor: "#00216d",
    width: "100%",
    padding: 15,
    marginTop: 2,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
    textAlign: "center",
  },
});
