import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Sequence = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Introduction </Text>
      <Text style={styles.content}>
        Le PHP est un langage de programmation qui est utilisé pour créer des
        sites web dynamiques. Cela signifie que le contenu des pages peut
        changer en fonction de l'interaction de l'utilisateur avec le site.
      </Text>
    </View>
  );
};

export default Sequence;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  title: {
    paddingTop: 30,
    paddingBottom: 20,
    fontWeight: "500",
    fontSize: 20,
    color: "#00216d",
  },
  content: {},
});
