import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ImageBackground } from "react-native";
import { SequencesServices } from "../services/SequencesServices";
import { Button } from "../components/Button";

const DetailSequenceScreen = ({ navigation, route }) => {
  const { sequenceId } = route.params;
  const [sequence, setSequence] = useState([]);
  const [error, setError] = useState(false);

  const loadSequence = async () => {
    try {
      const sequence = await SequencesServices.fetchSequence(sequenceId);
      setSequence(sequence);
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  useEffect(() => {
    loadSequence();
  }, []);

  const onPressQuiz = (sequence) => {
    navigation.navigate("Start", { sequenceId: sequence.id });
  };

  return (
    <ImageBackground
      source={require("../assets/home.png")}
      resizeMode="cover"
      style={styles.container}
    >
      <Text>{sequence.name}</Text>
      <View>
        <Button text="Faire le quiz" action={() => onPressQuiz(sequence)} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
  },
});
export default DetailSequenceScreen;
