import { Text, TouchableOpacity, StyleSheet, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";

export const ContainerCourse = ({ title, image, resume, actionStart }) => {
  const navigation = useNavigation();

  const onStartPress = () => {
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
          <TouchableOpacity onPress={onStartPress}>
            <Text style={styles.textButtonStart}>Commencer &gt;</Text>
          </TouchableOpacity>
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
  },
  resume: {
    fontWeight: "300",
  },
  buttonStart: {
    paddingTop: 12,
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  textButtonStart: {
    fontWeight: "700",
  },
  logo: {
    width: 80,
    height: 80,
  },
});
