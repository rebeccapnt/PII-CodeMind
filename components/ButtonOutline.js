import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import React from "react";

export const ButtonOutline = ({ action, text }) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={action} style={styles.buttonOutline}>
        <Text style={styles.buttonOutlineText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonOutline: {
    backgroundColor: "white",
    width: "100%",
    padding: 10,
    marginTop: 2,
    borderRadius: 8,
    alignItems: "center",
    borderColor: "#00216d",
    borderWidth: 1,
  },
  buttonOutlineText: {
    color: "#00216d",
    fontWeight: "500",
    fontSize: 15,
  },
});
