import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, Vibration, Modal } from "react-native";
import { useState, useEffect } from "react";
import { Audio } from "expo-av";

export default function App() {
  const [sound, setSound] = useState();

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/decidemp3-14575.mp3")
    );
    setSound(sound);
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  function clickHandler1() {
    Vibration.vibrate();
    playSound();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>Jane's App</Text>
      <View style={styles.footerContainer}>
        <Button onPress={clickHandler1} title={"Let's Eat"} />
        
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
    padding: 30,
  },

  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
});
