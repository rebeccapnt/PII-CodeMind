import { StyleSheet } from "react-native";

// Styles communs
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#white",
  },
  text: { fontSize: 18, paddingBottom: 10 },
});

// Options communes pour les screens
export const screenOptions = {
  headerStyle: {
    backgroundColor: "#e1ecff",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
  },
};
StyleSheet.defaultFontFamily = "Roboto";

export default styles;
