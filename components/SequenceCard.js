import React from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export const SequenceCard = ({ item, progress, onPress }) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(item)}
      style={styles.card}
      activeOpacity={0.6}
    >
      <View style={styles.container}>
        <View
          style={[
            styles.circle,
            {
              backgroundColor: progress < 0 ? "green" : "silver",
              borderColor: progress < 0 ? "darkgreen" : "lightslategrey",
            },
          ]}
        >
          {progress < 0 ? (
            <Ionicons name="checkmark-sharp" size={24} color="#FFF" />
          ) : (
            <Ionicons name="checkmark-sharp" size={24} color="white" />
          )}
        </View>
        <View style={styles.content}>
          <Text style={[styles.sequenceTitle, { marginLeft: 16 }]}>
            {item.nbSequence}. {item.name}
          </Text>
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
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    borderWidth: 2,
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
});
