import React, { useState, useEffect } from "react";
import { StyleSheet, Text, ImageBackground, FlatList } from "react-native";
import { SequenceCard } from "../components/SequenceCard";
import { SequencesServices } from "../services/SequencesServices";

const SequenceScreen = ({ route, navigation }) => {
  const { courseId } = route.params;
  const [sequences, setSequences] = useState([]);
  const [error, setError] = useState(false);

  const loadSequences = async () => {
    try {
      const sequences = await SequencesServices.fetchSequences(courseId);
      setSequences(sequences);
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  useEffect(() => {
    loadSequences();
  }, []);

  const onPressSequence = (sequence) => {
    navigation.navigate("Detail", { sequenceId: sequence.id });
  };

  return (
    <ImageBackground
      source={require("../assets/home.png")}
      resizeMode="cover"
      style={styles.container}
    >
      <FlatList
        data={sequences}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SequenceCard
            item={item}
            progress="18"
            onPress={() => onPressSequence(item)}
          />
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
