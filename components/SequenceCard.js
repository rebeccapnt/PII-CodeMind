import { Text, TouchableOpacity, StyleSheet, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button } from "./Button";

//Changer les attributs par item
export const SequenceCard = ({ title, actionStart }) => {
  const navigation = useNavigation();

  const onStartPress = () => {
    navigation.setOptions({
      headerBackTitle: "Retour",
    });
    navigation.navigate(actionStart);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}> {title} </Text>
      <View style={styles.buttonStart}>
        <Button text={"Voir"} action={onStartPress} />
      </View>
    </View>
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
  title: {
    paddingLeft: 10,
    paddingBottom: 15,
    fontWeight: "700",
    textAlign: "left",
    fontSize: "20px",
    color: "#00216d",
  },
  buttonStart: {
    paddingTop: 8,
    justifyContent: "flex-end",
    flexDirection: "row",
  },
});
