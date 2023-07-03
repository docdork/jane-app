import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import Button from "./Button";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>Jane's App</Text>
      <View style={styles.footerContainer}>
        <Button label={"Press Me!!!"} />
        <Button label={"And Me!!!"} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },

  mainText: {
    color: "#fff",
    fontSize: 30,
    padding: 30
  },

  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
});
