import { TextInput, StyleSheet, TouchableOpacity, View } from "react-native";
import { React, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export const Input = ({ placeholder, onSearch }) => {
  const [value, setValue] = useState("");

  const handleSearch = () => {
    onSearch(value);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={(text) => setValue(text)}
        onSubmitEditing={handleSearch}
        style={styles.input}
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Ionicons name="search" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },
  icon: {
    marginLeft: 10,
  },
  searchButton: {
    backgroundColor: "#00216d",
    borderRadius: 10,
    padding: 5,
    marginLeft: 10,
  },
});
