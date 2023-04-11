import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  ImageBackground,
  FlatList,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import { SequenceCard } from "../components/SequenceCard";
import { SequencesServices } from "../services/SequencesServices";
import { WorkflowsServices } from "../services/WorkflowsServices";
import { AuthenticatedUserContext } from "../services/AuthContext";

const SequenceScreen = ({ route, navigation }) => {
  const { user } = useContext(AuthenticatedUserContext);
  const { courseId } = route.params;
  const [sequences, setSequences] = useState([]);
  const [courseName, setCourseName] = useState();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({ title: courseName });
  }, [courseName]);

  const loadSequences = async () => {
    try {
      const sequences = await SequencesServices.fetchSequences(courseId);
      const updatedSequences = await Promise.all(
        sequences.sequencesList.map(async (seq) => {
          const isFinished = await WorkflowsServices.isWorkflowFinished(
            seq.id,
            user.uid
          );
          return { ...seq, isFinished };
        })
      );
      setSequences(updatedSequences);
      setCourseName(sequences.course.name);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSequences();
  }, []);

  const onPressSequence = (sequence) => {
    navigation.navigate("Detail", {
      sequenceId: sequence.id,
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

  return (
    <ImageBackground
      source={require("../assets/home.png")}
      resizeMode="cover"
      style={styles.container}
    >
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require("../assets/romy/romystudy.png")}
        />
        <Text style={styles.headerTitle}>{courseName}</Text>
        <Text style={styles.headerSubtitle}>
          Voici à ta disposition tous les chapitres de ce cours.
        </Text>
      </View>
      <FlatList
        style={styles.main}
        data={sequences}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SequenceCard
            item={item}
            isFinished={item.isFinished}
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
  },
  header: {
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
    backgroundColor: "#335296",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 15,
  },
  logo: {
    marginTop: 10,
    width: 140,
    height: 140,
  },
  headerTitle: {
    textAlign: "center",
    color: "white",
    fontSize: 23,
    fontWeight: "700",
    paddingVertical: 7,
  },
  headerSubtitle: {
    fontSize: 14,
    fontWeight: "400",
    paddingBottom: 20,
    color: "white",
  },
  main: {
    padding: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});
