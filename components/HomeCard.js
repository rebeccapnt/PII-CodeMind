import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export const HomeCard = ({ action, progress }) => {
  return (
    <TouchableOpacity onPress={action} style={styles.card} activeOpacity={0.6}>
      <View style={styles.container}>
        <Image
          source={require("../assets/CourseIcon/javaLogo.png")}
          style={styles.logo}
        />
        <View style={styles.content}>
          <Text style={styles.title}></Text>
          <Text style={styles.details}>
            28  <Ionicons name="book" size="13" /> |{" "}
             chapitres <Ionicons name="library" size="15" />
          </Text>
          <View style={styles.progressBar}>
            <View style={[styles.progress, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}> {progress}%</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,

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
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 2,
  },
  details: {
    color: "#335296",
    fontSize: 14,
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: "#ddd",
    borderRadius: 8,
    overflow: "hidden",
    marginTop: 5,
  },
  progress: {
    height: 8,
    backgroundColor: "#FF6600",
  },
  progressText: {
    color: "#335296",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "right",
    paddingTop: 5,
  },
});
