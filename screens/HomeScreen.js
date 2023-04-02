import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { AuthenticatedUserContext } from "../services/AuthContext";
import { CoursesServices } from "../services/CoursesServices";
import { UserServices } from "../services/UserServices";
import { HomeCard } from "../components/HomeCard";

const HomeScreen = ({ navigation }) => {
  const [userAuth, setUserAuth] = useState();
  const [coursesStarted, setCoursesStarted] = useState([]);
  const [bestCourses, setBestCourses] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useContext(AuthenticatedUserContext);

  const loadUser = async () => {
    try {
      const userAuth = await UserServices.getUser(user.email);
      setUserAuth(userAuth);
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  const loadCoursesStarted = async () => {
    try {
      if (userAuth) {
        const coursesStarted = await UserServices.getCoursesStartedByUser(
          userAuth.email
        );
        setCoursesStarted(coursesStarted);
      }
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const loadBestsCourses = async () => {
    try {
      const bestCourses = await CoursesServices.fetchBestsCourses();
      setBestCourses(bestCourses);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
    if (userAuth) {
      loadCoursesStarted();
      loadBestsCourses();
    }
  }, [userAuth]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#335296" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/home.png")}
        resizeMode="cover"
        style={styles.container}
      >
        <ScrollView>
          <View style={styles.header}>
            <Image
              style={styles.logo}
              source={require("../assets/romy/romyhappyfilled.png")}
            />
            <Text style={styles.headerTitle}>
              Bienvenue, {userAuth ? userAuth.nickname : ""}
            </Text>
            <Text style={styles.headerSubtitle}>
              Commençons de nouvelles aventures.
            </Text>
          </View>
          <View style={styles.main}>
            <View style={styles.bestCourses}>
              <Text style={styles.bestTitle}>Continuer mes cours</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Progression")}
              >
                <Text style={styles.seeAllCourses}>Voir tout</Text>
              </TouchableOpacity>
            </View>
            <View>
              {coursesStarted.length > 0 ? (
                coursesStarted.map((item) => {
                  return <HomeCard key={item.id} item={item} />;
                })
              ) : (
                <Text style={styles.noCoursesStarted}>
                  Vous n'avez pas encore commencé un de nos cours.{" "}
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Apprendre")}
                  >
                    <Text style={styles.startNow}>Débutez maintenant !</Text>
                  </TouchableOpacity>
                </Text>
              )}
            </View>

            <View style={styles.bestCourses}>
              <Text style={styles.bestTitle}>Les cours populaires</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Apprendre")}
              >
                <Text style={styles.seeAllCourses}>Voir tout</Text>
              </TouchableOpacity>
            </View>
            <View>
              {bestCourses.map((item) => {
                return <HomeCard key={item.id} item={item} />;
              })}
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
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
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
    backgroundColor: "#335296",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderWidth: 1,
    borderColor: "#00216d",
  },
  logo: {
    width: 200,
    height: 200,
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
    fontWeight: "300",
    paddingBottom: 20,
    color: "white",
  },
  bestCourses: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  bestTitle: {
    textAlign: "left",
    fontSize: 20,
    fontWeight: "700",
    color: "#00216d",
    marginBottom: 12,
  },
  seeAllCourses: {
    textAlign: "right",
    fontWeight: "600",
    marginBottom: 12,
    color: "#00216d",
  },
  noCoursesStarted: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "400",
    color: "#00216d",
    marginVertical: 20,
  },
  startNow: {
    color: "#ff6363",
    fontWeight: "800",
    marginTop: 8,
    fontSize: 17,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});
export default HomeScreen;
