import React, { useState, useEffect, useContext } from "react";
import { Button } from "../components/Button";
import { ButtonOutline } from "../components/ButtonOutline";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View,
  ImageBackground,
} from "react-native";
import { AuthenticatedUserContext } from "../services/AuthContext";
import { UserServices } from "../services/UserServices";
import { getAuth, signOut } from "firebase/auth";

const SettingsScreen = ({ navigation }) => {
  const [userAuth, setUserAuth] = useState();

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

  useEffect(() => {
    loadUser();
  }, []);

  const onUpdatePress = () => {
    navigation.navigate("UpdateUser");
  };

  const onSignOut = () => {
    // Récupération de l'objet d'authentification Firebase et appel de la fonction SignOut pour déconnecter l'utilisateur actuel
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Redirection vers la page de connexion
        navigation.navigate("Login");
      })
      .catch((err) => {
        // Affichage d'une alerte en cas d'erreur lors de la déconnexion
        Alert.alert("Erreur de connexion :", err.message);
      });
  };

  return (
    <ImageBackground
      source={require("../assets/home.png")}
      resizeMode="cover"
      style={styles.container}
    >
      <View>
        <Text style={styles.title}>Mes paramètres</Text>
      </View>
      <View style={styles.background}>
        <View style={styles.formGroup}>
          <View style={styles.row}>
            <Text style={styles.label}>Surnom :</Text>
            <Text style={styles.value}>
              {userAuth ? userAuth.nickname : ""}
            </Text>
          </View>
        </View>
        <View style={styles.formGroup}>
          <View style={styles.row}>
            <Text style={styles.label}>E-mail :</Text>
            <Text style={styles.value}>{userAuth ? userAuth.email : ""}</Text>
          </View>
        </View>
      </View>
      <Button text="Modifier mon mot de passe" action={onUpdatePress} />
      <ButtonOutline text="Se déconnecter" action={onSignOut} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    backgroundColor: "white",
    width: "90%",
    borderRadius: 8,
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  title: {
    paddingTop: 30,
    paddingBottom: 20,
    fontWeight: "700",
    fontSize: 22,
    color: "#00216d",
  },
  formGroup: {
    marginVertical: 10,
    width: "100%",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    color: "#00216d",
    fontSize: 17,
    fontWeight: "bold",
    marginRight: 10,
  },
  value: {
    fontSize: 16,
  },
});

export default SettingsScreen;
