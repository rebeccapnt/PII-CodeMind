import React, { useContext, useState, useEffect } from "react";
import {
  Dimensions,
  TouchableHighlight,
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AuthenticatedUserContext } from "../services/AuthContext";
import { UserServices } from "../services/UserServices";
import { HomeCard } from "../components/HomeCard";
import moment from "moment";
import "moment/locale/fr";

const AccountScreen = ({ navigation }) => {
  const [userAuth, setUserAuth] = useState();
  const [formattedDate, setFormattedDate] = useState();
  const [coursesStarted, setCoursesStarted] = useState([]);
  const [coursesFinished, setCoursesFinished] = useState([]);
  const [error, setError] = useState(false);
  const { user } = useContext(AuthenticatedUserContext);

  const loadUser = async () => {
    try {
      const userAuth = await UserServices.getUser(user.email);
      setUserAuth(userAuth);
      const formattedDate = moment(userAuth.createdAt)
        .locale("fr")
        .format("LL");
      setFormattedDate(formattedDate);
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  const loadCoursesStarted = async () => {
    try {
      const coursesStarted = await UserServices.getCoursesStartedByUser(
        user.email
      );
      setCoursesStarted(coursesStarted);
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  const loadCoursesFinished = async () => {
    try {
      const coursesFinished = await UserServices.getCoursesFinishedByUser(
        user.email
      );
      setCoursesFinished(coursesFinished);
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  const onPressCourse = (course) => {
    navigation.navigate("Sequence", { courseId: course.id });
  };

  useEffect(() => {
    loadUser();
    loadCoursesStarted();
    loadCoursesFinished();
  }, []);

  return (
    <ImageBackground
      source={require("../assets/home.png")}
      resizeMode="cover"
      style={styles.container}
    >
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableHighlight style={styles.circle}>
            <Text style={styles.nicknameInitial}>
              {userAuth ? userAuth.nickname.charAt(0) : ""}
            </Text>
          </TouchableHighlight>
          <Text style={styles.userName}>
            {userAuth ? userAuth.nickname : ""}
          </Text>
          <Text style={styles.subtitle}>Actif depuis le {formattedDate}.</Text>
          <View style={styles.cardResume}>
            <View style={[styles.section, { backgroundColor: "#e17618" }]}>
              <View
                style={[styles.iconBackground, { backgroundColor: "#e1a682" }]}
              >
                <Ionicons
                  name="book"
                  size={22}
                  style={styles.icon}
                  color="white"
                />
              </View>
              <Text style={[styles.sectionLabel, { color: "white" }]}>
                Cours commencé(s)
              </Text>
              <Text style={[styles.sectionNumber, { color: "white" }]}>
                {coursesStarted.length}
              </Text>
            </View>
            <View style={[styles.section, { backgroundColor: "white" }]}>
              <View
                style={[styles.iconBackground, { backgroundColor: "#d4def6" }]}
              >
                <Ionicons
                  name="checkmark-circle"
                  size={24}
                  style={styles.icon}
                  color="#00216d"
                />
              </View>
              <Text style={[styles.sectionLabel, { color: "#00216d" }]}>
                Cours terminé(s)
              </Text>
              <Text style={[styles.sectionNumber, { color: "#00216d" }]}>
                {coursesFinished.length}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.main}>
          <View>
            <Text style={styles.title}>Cours commencé(s)</Text>
            <View style={styles.contentCourses}>
              {coursesStarted.length > 0 ? (
                coursesStarted.map((item) => {
                  return <HomeCard key={item.id} item={item} progress={23} />;
                })
              ) : (
                <Text style={styles.noCoursesStarted}>
                  Tu n'as pas encore commencé un de nos cours.{" "}
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Apprendre")}
                  >
                    <Text style={styles.startNow}>Débutez maintenant !</Text>
                  </TouchableOpacity>
                </Text>
              )}
            </View>
          </View>
          <View>
            <Text style={styles.title}>Cours terminé(s)</Text>
            <View style={styles.contentCourses}>
              {coursesFinished.length > 0 ? (
                coursesFinished.map((item) => {
                  return (
                    <HomeCard
                      key={item.id}
                      item={item}
                      progress={item.progress}
                    />
                  );
                })
              ) : (
                <Text style={styles.noCoursesStarted}>
                  Tu n'as pas encore terminé un de nos cours.{" "}
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Apprendre")}
                  >
                    <Text style={styles.startNow}>Continuez maintenant !</Text>
                  </TouchableOpacity>
                </Text>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#335296",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderWidth: 1,
    borderColor: "#00216d",
    padding: 18,
    paddingHorizontal: 15,
    marginBottom: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  main: { paddingHorizontal: 10 },
  title: {
    paddingTop: 30,
    paddingBottom: 20,
    fontWeight: "700",
    fontSize: 20,
    color: "#00216d",
  },
  nicknameInitial: {
    color: "#00216d",
    fontSize: 40,
  },
  circle: {
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    width: Dimensions.get("window").width * 0.3,
    height: Dimensions.get("window").width * 0.3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "#00216d",
    borderWidth: 5,
  },
  footer: {
    paddingTop: 8,
  },
  userName: {
    fontSize: 20,
    color: "white",
    paddingTop: 20,
  },
  subtitle: {
    color: "white",
    paddingTop: 5,
    fontSize: 13,
    fontWeight: "300",
  },
  cardResume: {
    paddingHorizontal: 10,
    marginTop: 14,
    borderRadius: 8,
    flexDirection: "row",
  },
  section: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    marginHorizontal: 15,
    borderRadius: 10,
    shadowColor: "#00216d",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2.5,
    elevation: 3,
  },
  sectionLabel: { fontWeight: "500" },
  sectionNumber: {
    marginTop: 12,
    fontSize: 24,
    fontWeight: "500",
  },
  iconBackground: {
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    width: Dimensions.get("window").width * 0.12,
    height: Dimensions.get("window").width * 0.12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  noCoursesStarted: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "400",
    color: "#00216d",
    marginVertical: 20,
  },
  startNow: {
    color: "#00216d",
    fontWeight: "800",
    marginTop: 8,
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});
export default AccountScreen;
