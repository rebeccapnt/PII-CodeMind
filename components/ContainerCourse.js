import { Text, TouchableOpacity, StyleSheet, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button } from "../components/Button";

export const ContainerCourse = ({ title, image, resume, actionStart }) => {
  const navigation = useNavigation();

  const onStartPress = () => {
    navigation.setOptions({
      headerBackTitle: "Retour",
    });
    navigation.navigate(actionStart);
  };
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.headerContainer}>
          <Image
            style={styles.logo}
            source={require("../assets/javaLogo.png")}
          />
          <Text style={styles.resume}>{resume}</Text>
        </View>
        <View style={styles.buttonStart}>
          <Button text={"Commencer"} action={onStartPress} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginTop: 10,
    borderRadius: 8,
  },
  headerContainer: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    paddingLeft: 10,
    paddingBottom: 15,
    fontWeight: "700",
    textAlign: "left",
    fontSize: "20px",
    color: "#00216d",
  },
  resume: {
    fontWeight: "300",
  },
  buttonStart: {
    paddingTop: 8,
    justifyContent: "flex-end",
    flexDirection: "row",
  },

  logo: {
    width: 80,
    height: 80,
  },
});
