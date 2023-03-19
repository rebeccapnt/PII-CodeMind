import React, { useState, useEffect } from "react";
import { StyleSheet, Text, ImageBackground, FlatList } from "react-native";
import { SequenceCard } from "../components/SequenceCard";
import firebase from "../services/firebaseConfig.js";

const SequenceScreen = ({ route, navigation }) => {
  const { courseId } = route.params;
  const [sequences, setSequences] = useState([]);

  const loadSequences = async () => {
    const sequencesCollection = firebase.db.collection("sequences");
    const snapshot = await sequencesCollection
      // .where("course", "==", courseId)
      .get();
    const sequencesList = [];
    snapshot.forEach((doc) => {
      const sequence = doc.data();
      sequence.id = doc.id;
      sequencesList.push(sequence);
    });
    setSequences(sequencesList);
  };

  useEffect(() => {
    loadSequences();
  }, []);

  return (
    <ImageBackground
      source={require("../assets/home.png")}
      resizeMode="cover"
      style={styles.container}
    >
      {/* <SequenceCard actionStart="Sequence" progress="18" />
      <SequenceCard actionStart="Sequence" progress="0" /> */}
      <FlatList
        data={sequences}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SequenceCard item={item} progress="18" actionStart="Content" />
        )}
      />
    </ImageBackground>
  );
};

export default SequenceScreen;

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
