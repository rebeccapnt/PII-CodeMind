import React from "react";
import {
  Dimensions,
  TouchableHighlight,
  StyleSheet,
  Text,
  ScrollView,
  View,
  ImageBackground,
} from "react-native";

const AccountScreen = ({ navigation }) => {
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
          <Text style={styles.userName}>Rebecca Pinoteau</Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 25,
  },
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
    width: Dimensions.get("window").width * 0.4,
    height: Dimensions.get("window").width * 0.4,
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
    color: "#00216d",
    paddingTop: 20,
  },
});
export default AccountScreen;
