import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

export const Card = ({ item, actionStart }) => {
  const navigation = useNavigation();

  const onStartPress = () => {
    navigation.setOptions({
      headerBackTitle: "Retour",
    });
    navigation.navigate(actionStart);
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
          <Text style={styles.footerText}>{item.nbSequences}</Text>
          <Text style={styles.footerLabel}>chapitres</Text>
        </View>
        <View style={styles.footerBar}></View>
        <View style={styles.footerItem}>
          <Text style={styles.footerText}>{item.nbReadings}</Text>
          <Text style={styles.footerLabel}>Lecteurs</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  logoContainer: {
    width: 90,
    height: 90,
    // marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
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
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "left",
  },
  summary: {
    fontSize: 14,
    marginBottom: 10,
  },
  footer: {
    backgroundColor: "#f2f2f2",
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    borderRadius: 5,
  },
  footerItem: {
    flex: 1,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  footerLabel: {
    fontSize: 12,
    color: "#aaa",
  },
  footerBar: {
    width: 1,
    height: 15,
    backgroundColor: "#aaa",
    marginHorizontal: 10,
  },
});
