import { StyleSheet, View, Text, ScrollView } from "react-native";
import React from "react";
import { ContainerCourse } from "../components/ContainerCourse";

const CourseScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Les enseignements disponibles </Text>
      <ScrollView>
        <ContainerCourse
          title="Débuter avec PHP"
          image="../assets/phpLogo.png"
          resume="Apprendre les bases de PHP. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie "
          actionStart="Sequence"
        />
        <ContainerCourse
          title="Les bases de Java"
          image="../assets/javaLogo.png"
          resume="Apprendre les bases de Java. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie "
          actionStart="Sequence"
        />
        <ContainerCourse
          title="Apprendre C#"
          image="../assets/javaLogo.png"
          resume="Apprendre les bases de C#. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie "
          actionStart="Sequence"
        />
        <ContainerCourse
          title="Python"
          image="../assets/javaLogo.png"
          resume="Apprendre les bases de Python. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie "
          actionStart="Sequence"
        />
        <ContainerCourse
          title="Test"
          image="../assets/javaLogo.png"
          resume="Apprendre les bases de Python. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie "
          actionStart="Sequence"
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e1ecff",
    paddingHorizontal: 10,
  },
  title: {
    paddingTop: 30,
    paddingBottom: 20,
    fontWeight: "500",
    fontSize: 20,
    color: "#00216d",
  },
});

export default CourseScreen;
