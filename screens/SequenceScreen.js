import React from "react";
import { StyleSheet, Text, ImageBackground, FlatList } from "react-native";

const Sequence = ({ route, navigation }) => {
  const { sequences } = route.params;

  return (
    <ImageBackground
      source={require("../assets/home.png")}
      resizeMode="cover"
      style={styles.container}
    >
      <Text style={styles.title}> Php </Text>
      {/* Ici afficher les chapitres, avec un badge/jauge si commencé à lire, terminer */}
      {/* <FlatList
        data={sequences}
        keyExtractor={(item) => item.Id}
        renderItem={({ item }) => (
          <SequenceCard title={item.name} actionStart="Content" />
        )}
      /> */}
      {/* <SequenceCard title="Les variables" actionStart="Content" />
      <SequenceCard title="Les boucles" actionStart="Content" /> */}
    </ImageBackground>
  );
};

export default Sequence;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  title: {
    paddingVertical: 10,
    fontWeight: "500",
    fontSize: 20,
    color: "#00216d",
  },
  content: {},
});
