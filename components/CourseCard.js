import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export const CourseCard = ({ item, actionStart, params }) => {
  const navigation = useNavigation();

  const onStartPress = () => {
    navigation.setOptions({
      headerBackTitle: "Retour",
    });
    navigation.navigate(actionStart, params);
  };

  return (
    <TouchableOpacity onPress={onStartPress} style={styles.card}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/CourseIcon/javaLogo.png")}
            style={styles.logo}
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.summary} numberOfLines={6}>
            {item.resume}
          </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.footerItem}>
          <Text style={styles.footerText}>
            {item.nbSequences} <Ionicons name="library" size="18" />
          </Text>
          <Text style={styles.footerLabel}>chapitres</Text>
        </View>
        <View style={styles.footerBar}></View>
        <View style={styles.footerItem}>
          <Text style={styles.footerText}>
            {item.nbReadings} <Ionicons name="glasses" size="18" />
          </Text>
          <Text style={styles.footerLabel}>Lecteurs</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 5,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#335296",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  logoContainer: {
    width: 90,
    height: 90,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginRight: 5,
  },
  logo: {
    width: 80,
    height: 80,
  },
  content: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 5,
    textAlign: "left",
    color: "#0C2C75",
  },
  summary: {
    fontSize: 14,
    marginBottom: 10,
  },
  footer: {
    backgroundColor: "#335296",
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    borderRadius: 4,
  },
  footerItem: {
    flex: 1,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  footerLabel: {
    fontSize: 12,
    color: "white",
  },
  footerBar: {
    width: 1,
    height: 15,
    backgroundColor: "#aaa",
    marginHorizontal: 10,
  },
});
