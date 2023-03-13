import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ImageBackground,
} from "react-native";
import React from "react";
import { CourseCard } from "../components/CourseCard";
import { Input } from "../components/Input";

const CourseScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../assets/home.png")}
      resizeMode="cover"
      style={styles.container}
    >
      <Text style={styles.title}>Rechercher des cours</Text>
      <Text style={styles.titleBottom}>
        Trouver les cours que vous souhaitez à l'aide de la recherche.
      </Text>
      <Input placeholder="Rechercher un cours..." />
      <ScrollView>
        <CourseCard
          title="Débuter avec PHP"
          image="../assets/phpLogo.png"
          resume="Apprendre les bases de PHP. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie "
          actionStart="Sequence"
        />
        <CourseCard
          title="Les bases de Java"
          image="../assets/javaLogo.png"
          resume="Apprendre les bases de Java. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie "
          actionStart="Sequence"
        />
        <CourseCard
          title="Apprendre C#"
          image="../assets/javaLogo.png"
          resume="Apprendre les bases de C#. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie "
          actionStart="Sequence"
        />
        <CourseCard
          title="Python"
          image="../assets/javaLogo.png"
          resume="Apprendre les bases de Python. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie "
          actionStart="Sequence"
        />
        <CourseCard
          title="Test"
          image="../assets/javaLogo.png"
          resume="Apprendre les bases de Python. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie "
          actionStart="Sequence"
        />
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  title: {
    paddingVertical: 10,
    fontWeight: "500",
    fontSize: 20,
    color: "#00216d",
  },
  titleBottom: {
    fontSize: 14,
    color: "#00216d",
  },
});

export default CourseScreen;
