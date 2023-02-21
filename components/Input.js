import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import React from "react";

export const Input = ({ placeholder, value, onchange }) => {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onchange}
      style={styles.input}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 8,
  },
});
