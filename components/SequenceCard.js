import { Text, TouchableOpacity, StyleSheet, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";

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
      <TouchableOpacity style={styles.item}>
        <Text style={styles.nom}>Apprendre PHP</Text>
        <Text style={styles.info}>Lecteurs : 3</Text>
        <Text style={styles.info}>Chapitres : 12</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  item: {
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  nom: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  info: {
    fontSize: 14,
    marginBottom: 3,
  },
  bouton: {
    backgroundColor: "#fff",
    padding: 15,
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  texteBouton: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
