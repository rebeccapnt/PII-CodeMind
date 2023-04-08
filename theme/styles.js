import { StyleSheet } from "react-native";

// Styles communs
const stylesCommuns = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        paddingTop: 30,
        paddingBottom: 20,
        fontWeight: "500",
        fontSize: 22,
        color: "#00216d",
    },
    text: { fontSize: 18, paddingBottom: 10 },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
    },
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