import React, { useContext } from "react";
import {
  Dimensions,
  TouchableHighlight,
  StyleSheet,
  Text,
  ScrollView,
  View,
  ImageBackground,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AuthenticatedUserContext } from "../App.js";

const AccountScreen = ({ navigation }) => {
  const { user } = useContext(AuthenticatedUserContext);

  return (
    <ImageBackground
      source={require("../assets/authentification.png")}
      resizeMode="cover"
      style={styles.container}
    >
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableHighlight style={styles.circle}>
            <Text style={styles.nicknameInitial}> RP</Text>
          </TouchableHighlight>
          <Text style={styles.userName}>{user.email}</Text>
          <Text style={styles.subtitle}>Actif depuis le 3 février 2023.</Text>
          <View style={styles.cardResume}>
            <View style={[styles.section, { backgroundColor: "#e17618" }]}>
              <View
                style={[styles.iconBackground, { backgroundColor: "#e1a682" }]}
              >
                <Ionicons
                  name="book"
                  size={22}
                  style={styles.icon}
                  color="white"
                />
              </View>
              <Text style={[styles.sectionLabel, { color: "white" }]}>
                Cours commencés
              </Text>
              <Text style={[styles.sectionNumber, { color: "white" }]}>3</Text>
            </View>
            <View style={[styles.section, { backgroundColor: "white" }]}>
              <View
                style={[styles.iconBackground, { backgroundColor: "#d4def6" }]}
              >
                <Ionicons
                  name="checkmark-circle"
                  size={24}
                  style={styles.icon}
                  color="#00216d"
                />
              </View>
              <Text style={[styles.sectionLabel, { color: "#00216d" }]}>
                Cours terminés
              </Text>
              <Text style={[styles.sectionNumber, { color: "#00216d" }]}>
                7
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.main}>
          <View>
            <Text style={styles.title}>Cours commencé(s)</Text>
            {/* Mettre ici un scrollview horizontal avec les courses commencés (attention ceux commencé et pas terminés, faire ça dans un autre scrollview) */}
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#335296",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderWidth: 1,
    borderColor: "#00216d",
    padding: 18,
    paddingHorizontal: 15,
    marginBottom: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  main: { paddingHorizontal: 10 },
  title: {
    paddingTop: 30,
    paddingBottom: 20,
    fontWeight: "500",
    fontSize: 20,
    color: "#00216d",
  },
  nicknameInitial: {
    color: "#00216d",
    fontSize: 40,
  },
  circle: {
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    width: Dimensions.get("window").width * 0.3,
    height: Dimensions.get("window").width * 0.3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "#00216d",
    borderWidth: 5,
  },
  footer: {
    paddingTop: 8,
  },
  userName: {
    fontSize: 20,
    color: "white",
    paddingTop: 20,
  },
  subtitle: {
    color: "white",
    paddingTop: 5,
    fontSize: 13,
    fontWeight: "300",
  },
  cardResume: {
    paddingHorizontal: 10,
    marginTop: 14,
    borderRadius: 8,
    flexDirection: "row",
  },
  section: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    marginHorizontal: 15,
    borderRadius: 10,
    shadowColor: "#00216d",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2.5,
    elevation: 3,
  },
  sectionLabel: { fontWeight: "500" },
  sectionNumber: {
    marginTop: 12,
    fontSize: 24,
    fontWeight: "500",
  },

  iconBackground: {
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    width: Dimensions.get("window").width * 0.12,
    height: Dimensions.get("window").width * 0.12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
});
export default AccountScreen;
