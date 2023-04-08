import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export const ChoiceAnswer = ({ answer, onPress, isSelected }) => {
  const buttonStyle = isSelected ? styles.selectedButton : styles.button;
  const textStyle = isSelected ? styles.selectedText : styles.text;

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
    >
      <View style={styles.row}>
        <Text style={textStyle}>
          {answer}
        </Text>
        {isSelected && (
          <Ionicons
            name="checkmark-circle"
            size={22}
            color="white"
            style={styles.icon}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#00216d",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
    width: "100%",
  },
  selectedButton: {
    backgroundColor: "#00216d",
    borderWidth: 1,
    borderColor: "#00216d",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
    width: "100%",
  },
  text: {
    color: "#00216d",
    textAlign: "left",
    flex: 1,
    fontSize: 16,
  },
  selectedText: {
    color: "white",
    textAlign: "left",
    fontWeight: "700",
    fontSize: 17,
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: {
    marginLeft: 10,
  },
});
