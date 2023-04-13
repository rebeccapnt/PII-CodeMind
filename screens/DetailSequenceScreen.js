import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
  Image,
} from "react-native";
import { SequencesServices } from "../services/SequencesServices";
import { Button } from "../components/Button";

const DetailSequenceScreen = ({ navigation, route }) => {
  const { sequenceId, courseId } = route.params;
  const [sequence, setSequence] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({ title: sequence.name });
  }, [sequence.name]);

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
      style={{ flex: 1 }}
    >
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{sequence.name}</Text>
          </View>
          <Image
            source={require("../assets/romy/romystudy.png")}
            style={styles.icon}
          />
        </View>
      </View>

      <ScrollView>
        <View style={styles.container}>
          <View style={styles.main}>
            <Text style={styles.introduction}>Introduction</Text>
            <Text style={styles.subtitle}>
              {sequence.introduction.replace(/\\n/g, "\n")}
            </Text>

            {sequence.subChapter.map((item, index) => (
              <View key={index}>
                <View style={styles.separator} />
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
    alignItems: "center",
  },
  main: {
    padding: 15,
    backgroundColor: "white",
    margin: 14,
    borderRadius: 8,
  },
  header: {
    backgroundColor: "#335296",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderWidth: 1,
    borderColor: "#00216d",
    paddingHorizontal: 10,
    paddingBottom: 2,
    marginBottom: 6,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "white",
    paddingHorizontal: 10,
    alignSelf: "center",
    textAlign: "center",
  },
  introduction: {
    textAlign: "center",
    fontWeight: "700",
    color: "#00216d",
    fontSize: 22,
    paddingBottom: 16,
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
  icon: {
    width: 100,
    height: 100,
  },
  separator: {
    borderBottomWidth: 2,
    borderBottomColor: "#335296",
    marginVertical: 10,
    width: "20%",
  },
});

export default DetailSequenceScreen;
