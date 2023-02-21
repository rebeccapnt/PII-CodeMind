import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Sequence = () => {
  return (
    <View>
      <Text style={styles.title}>Début du cours </Text>
    </View>
  );
};

export default Sequence;

const styles = StyleSheet.create({
  title: {
    fontSize: "18px",
  },
});
