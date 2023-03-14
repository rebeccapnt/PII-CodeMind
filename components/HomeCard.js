import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

export const HomeCard = ({ action, progress }) => {
  return (
    <TouchableOpacity onPress={action} style={styles.card}>
      <View style={styles.container}>
        <Image
          source={require("../assets/CourseIcon/javaLogo.png")}
          style={styles.logo}
        />
        <View style={styles.content}>
          <Text style={styles.title}>Les bases de Java</Text>
          <Text style={styles.details}>28 lectures | 3 chapitres</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progress, { width: `${progress}%` }]} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginBottom: 5,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  details: {
    color: "#999",
    fontSize: 14,
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: "#ddd",
    borderRadius: 8,
    overflow: "hidden",
  },
  progress: {
    height: 8,
    backgroundColor: "#E75530",
  },
});
