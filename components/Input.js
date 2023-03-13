import { TextInput, StyleSheet, TouchableOpacity, View } from "react-native";
import { React, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export const Input = ({ placeholder }) => {
  const [value, setValue] = useState("");

  const clearInput = () => {
    setValue("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={(text) => setValue(text)}
        style={styles.input}
      />
      {value !== "" && (
        <Ionicons
          name="close-circle"
          size={24}
          color="gray"
          style={styles.icon}
          onPress={clearInput}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    height: 45,
    marginVertical: 10,
    borderRadius: 8,
    paddingLeft: 10,
    backgroundColor: "white",
  },
  input: {
    flex: 1,
  },
  icon: { marginRight: 10 },
});
