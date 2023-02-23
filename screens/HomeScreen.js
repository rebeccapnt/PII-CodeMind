import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import React from "react";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Image
            style={styles.logo}
            source={require("../assets/romy/romyhappy.png")}
          />
          <Text style={styles.headerTitle}>Bienvenue sur CodeMind</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  header: {
    marginVertical: 10,
    justifyContent: "center",
    width: "100%",
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 50,
  },
  logo: {
    width: 260,
    height: 260,
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    paddingBottom: 10,
  },
});
export default HomeScreen;
