import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

const ProgressionScreen = () => {
  const [activeTab, setActiveTab] = useState("details");
  return (
    <ImageBackground
      source={require("../assets/home.png")}
      resizeMode="cover"
      style={styles.container}
    >
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require("../assets/romy/romycrownfilled.png")}
        />
        <View style={styles.scoreContainer}>
          <Image
            style={styles.coinIcon}
            source={require("../assets/icon_money.png")}
          />
          <Text style={styles.scoreText}>30 points</Text>
        </View>
      </View>
      <View style={styles.main}>
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "details" && styles.activeTab]}
            onPress={() => setActiveTab("details")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "details" && { fontWeight: "bold" },
              ]}
            >
              Détails
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "badge" && styles.activeTab]}
            onPress={() => setActiveTab("badge")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "badge" && { fontWeight: "bold" },
              ]}
            >
              Badge
            </Text>
          </TouchableOpacity>
        </View>
        {activeTab === "details" && (
          <View>
            <Text style={styles.title}>Mes derniers quiz</Text>
          </View>
        )}
        {activeTab === "badge" && (
          <View>
            <Text style={styles.title}>Mes badges</Text>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    padding: 15,
  },
  header: {
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
    backgroundColor: "#335296",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderWidth: 1,
    borderColor: "#00216d",
  },
  logo: {
    marginTop: 5,
    width: 180,
    height: 180,
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    backgroundColor: "white",
    color: "#F1952E",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },
  coinIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  scoreText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ff6d0b",
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
    textAlign: "center",
  },
  tab: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#DFDFDF",
    marginRight: 10,
  },
  activeTab: {
    backgroundColor: "white",
  },
  tabText: {
    fontSize: 18,
    color: "#00216d",
    textAlign: "center",
  },
  title: {
    textAlign: "left",
    fontSize: 20,
    fontWeight: "700",
    color: "#00216d",
    paddingTop: 10,
  },
});

export default ProgressionScreen;
