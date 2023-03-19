import React from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export const SequenceCard = ({ item, progress, action }) => {
  return (
    <TouchableOpacity onPress={action} style={styles.card} activeOpacity={0.6}>
      <View style={styles.container}>
        <View style={styles.circle}>
          <Text style={styles.sequenceNumber}>{item.nbSequence}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.sequenceTitle}>{item.name}</Text>
          {progress > 0 && (
            <>
              <View style={styles.progressBar}>
                <View style={[styles.progress, { width: `${progress}%` }]} />
              </View>
              <Text style={styles.progressText}> {progress}%</Text>
            </>
          )}
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
  circle: {
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    width: Dimensions.get("window").width * 0.12,
    height: Dimensions.get("window").width * 0.12,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    borderWidth: 3,
    borderColor: "#335296",
  },
  sequenceNumber: {
    color: "#335296",
    fontSize: 20,
    fontWeight: "700",
  },
  content: {
    flex: 1,
    marginRight: 10,
  },
  sequenceTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginVertical: 4,
    color: "#335296",
  },
  progressBar: {
    flexDirection: "row",
    alignItems: "center",
    height: 8,
    backgroundColor: "#ddd",
    borderRadius: 8,
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
