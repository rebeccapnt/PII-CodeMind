import { Text, TouchableOpacity, StyleSheet, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button } from "./Button";

export const CourseCard = ({ item, actionStart }) => {
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
        <Text style={styles.title}> {item.name} </Text>
        <View style={styles.headerContainer}>
          <Image style={styles.logo} source={item.image} />
          <Text style={styles.resume} numberOfLines={3}>
            {item.resume}
          </Text>
        </View>
        <View style={styles.buttonStart}>
          <Text style={styles.footer}> {item.nbReadings} lectures</Text>
          <Text style={styles.footer}> {item.nbSequences} chapitres</Text>
          <Button text={"Voir"} action={onStartPress} />
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
  footer: { color: "dimgrey", fontWeight: "600", fontSize: 14 },
});
