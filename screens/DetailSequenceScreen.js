import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SequencesServices } from "../services/SequencesServices";
import { Button } from "../components/Button";

const DetailSequenceScreen = ({ navigation, route }) => {
  const { sequenceId, courseId } = route.params;
  const [sequence, setSequence] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadSequence = async () => {
    try {
      const sequence = await SequencesServices.fetchSequence(sequenceId);
      setSequence(sequence);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSequence();
  }, []);

  const onPressQuiz = (sequence) => {
    console.log(sequence.id);
    console.log(courseId);
    navigation.navigate("Start", {
      sequenceId: sequenceId,
      courseId: courseId,
    });
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00216d" />
      </View>
    );
  }

  if (error || !sequence) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Une erreur est survenue.</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../assets/home.png")}
      resizeMode="cover"
      style={styles.container}
    >
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>{sequence.name}</Text>
          <View style={styles.main}>
            <Text style={styles.subtitle}>
              {sequence.introduction.replace(/\\n/g, "\n")}
            </Text>

            {sequence.subChapter.map((item, index) => (
              <View key={index}>
                <Text style={styles.subChapterTitle}>{item.title}</Text>
                <Text style={styles.subChapterContent}>
                  {item.content.replace(/\\n/g, "\n")}
                </Text>
              </View>
            ))}
          </View>
          <View style={styles.buttonContainer}>
            <Button text="Faire le quiz" action={() => onPressQuiz(sequence)} />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  main: {
    padding: 15,
    backgroundColor: "white",
    margin: 14,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 15,
    color: "#00216d",
  },
  subtitle: {
    fontSize: 16,
    paddingBottom: 10,
  },
  subChapterTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
    color: "#00216d",
    marginTop: 5,
  },
  subChapterContent: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    marginBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});

export default DetailSequenceScreen;
