import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { AuthenticatedUserContext } from "../services/AuthContext";
import { UserServices } from "../services/UserServices";
import { QuizCard } from "../components/QuizCard";
import { WorkflowsServices } from "../services/WorkflowsServices";
import { ScrollView } from "react-native-gesture-handler";

const ProgressionScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("details");
  const [userAuth, setUserAuth] = useState();
  const [error, setError] = useState(false);
  const [workflows, setWorkflows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useContext(AuthenticatedUserContext);

  //Récupération de l'utilisateur connecté
  const loadUser = async () => {
    try {
      const userAuth = await UserServices.getUser(user.email);
      setUserAuth(userAuth);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  //Récupération des quiz terminés par l'utilisateur
  const loadFinishedQuiz = async () => {
    try {
      const workflows = await WorkflowsServices.fetchWorkflows(userAuth);
      setWorkflows(workflows);
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    if (userAuth) {
      loadFinishedQuiz();
    }
  }, [userAuth]);

  const onPressQuiz = (quiz) => {
    navigation.navigate("Result", {
      quizId: quiz.id,
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
          source={require("../assets/romy/romycrownfilled.png")}
        />
        <View style={styles.userInfo}>
          <Text style={styles.subtitle}>Vous avez un score total de : </Text>
          <View style={styles.scoreContainer}>
            <Image
              style={styles.coinIcon}
              source={require("../assets/icon_money.png")}
            />
            <Text style={styles.scoreText}>{userAuth.score} points</Text>
          </View>
        </View>
      </View>
      <View style={styles.main}>
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "details" && styles.activeTab]}
            onPress={() => setActiveTab("details")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "details" && { fontWeight: "bold" },
              ]}
            >
              Détails
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "badge" && styles.activeTab]}
            onPress={() => setActiveTab("badge")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "badge" && { fontWeight: "bold" },
              ]}
            >
              Badge
            </Text>
          </TouchableOpacity>
        </View>
        {activeTab === "details" && (
          <View>
            <Text style={styles.title}>Mes derniers quiz</Text>
            <ScrollView style={styles.containerWorkflows}>
              {workflows.length > 0 ? (
                workflows.map((item) => {
                  return (
                    <QuizCard
                      key={item.id}
                      workflow={item}
                      onPress={() => onPressQuiz(item)}
                    />
                  );
                })
              ) : (
                <Text style={styles.noCoursesStarted}>
                  Tu n'as pas encore répondu à un de nos quiz.{" "}
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Apprendre")}
                  >
                    <Text style={styles.startNow}>Commences maintenant !</Text>
                  </TouchableOpacity>
                </Text>
              )}
            </ScrollView>
          </View>
        )}
        {activeTab === "badge" && (
          <View>
            <Text style={styles.title}>Mes badges obtenus</Text>
            <View style={styles.badgeContainer}>
              {userAuth.score < 10 && (
                <Text style={styles.errorMessage}>
                  Tu n'as pas encore réalisé assez de quiz...
                </Text>
              )}
              {userAuth.score > 25 && (
                <View style={styles.badgeItem}>
                  <Image
                    style={styles.badgeIcon}
                    source={require("../assets/apprentiBadge.png")}
                  />
                  <Text style={styles.badgeLabel}>Apprenti</Text>
                </View>
              )}
              {userAuth.score > 50 && (
                <View style={styles.badgeItem}>
                  <Image
                    style={styles.badgeIcon}
                    source={require("../assets/confirmBadge.png")}
                  />
                  <Text style={styles.badgeLabel}>Confirmé</Text>
                </View>
              )}
            </View>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    padding: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#335296",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderWidth: 1,
    borderColor: "#00216d",
    padding: 10,
  },
  logo: {
    width: 140,
    height: 140,
  },
  userInfo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "white",
    marginBottom: 5,
  },
  points: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ff6d0b",
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    backgroundColor: "white",
    color: "#F1952E",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 10,
    borderColor: "#e17618",
    borderWidth: 1,
  },
  coinIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#E86231",
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
    textAlign: "center",
  },
  tab: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#DFDFDF",
    marginRight: 10,
  },
  activeTab: {
    backgroundColor: "white",
  },
  tabText: {
    fontSize: 19,
    color: "#00216d",
    textAlign: "center",
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userNickname: {
    fontSize: 16,
    fontWeight: "700",
    color: "#00216d",
  },
  userPoints: {
    fontSize: 14,
    fontWeight: "500",
    color: "#B93100",
  },
  title: {
    textAlign: "left",
    fontSize: 19,
    fontWeight: "700",
    color: "#00216d",
    paddingTop: 10,
    marginBottom: 12,
  },
  badgeContainer: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 10,
    borderRadius: 20,
    backgroundColor: "white",
  },
  badgeIcon: {
    width: 70,
    height: 80,
  },
  badgeLabel: {
    color: "#00216d",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});

export default ProgressionScreen;
