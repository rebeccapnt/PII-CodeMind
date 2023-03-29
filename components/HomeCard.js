import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { IMAGES_PATH } from "./globals";

export const HomeCard = ({ item, onPress }) => {
  const progress = 45;
  return (
    <TouchableOpacity
      onPress={() => onPress(item)}
      style={styles.card}
      activeOpacity={0.6}
    >
      <View style={styles.container}>
        <Image source={IMAGES_PATH[item.image]} style={styles.logo} />
        <View style={styles.content}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.details}>
            {item.nbSequences}
            <Ionicons name="library" size={14} /> chapitres | {item.nbReadings}
            <Ionicons name="book" size={12} /> lectures
          </Text>
          <View style={styles.progressBar}>
            <View style={[styles.progress, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}> {progress}%</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#335296" />
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
    shadowOpacity: 0.4,
    shadowRadius: 2,
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
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 3,
  },
  details: {
    color: "#335296",
    fontSize: 14,
    marginTop: 3,
    marginBottom: 6,
  },
  progressBar: {
    height: 8,
    backgroundColor: "#ddd",
    borderRadius: 2,
    overflow: "hidden",
    marginTop: 5,
  },
  progress: {
    height: 8,
    backgroundColor: "#ff6d0b",
  },
  progressText: {
    color: "#335296",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "right",
    paddingTop: 5,
  },
});
