import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Vibration,
  Pressable,
  Modal,
} from "react-native";
import { useState, useEffect } from "react";
import { Audio } from "expo-av";

export default function App() {
  const [sound, setSound] = useState();
  const [modalState, setModalState] = useState(false);
  const [counter, setCounter] = useState(20);

  async function playPing() {
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/snd_fragment_retrievewav-14728.mp3")
    );
    setSound(sound);
    await sound.playAsync();
  }
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
    setModalState(true);
    setCounter(20);
  }

  function closeHandler() {
    setModalState(false);
  }

  useEffect(() => {
    if (modalState) {
      const timer =
        counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [counter]);

  if (counter === 0) {
    playPing();
    Vibration.vibrate();
    setCounter(20);
  }

  return (
    <View style={styles.container}>
      <Modal visible={modalState} animationType="slide">
        <View style={styles.container}>
          <Text style={styles.timerText}>{counter}</Text>
          <Pressable onPress={closeHandler} style={styles.button}>
            <Text style={styles.text}>Done</Text>
          </Pressable>
        </View>
      </Modal>
      <Text style={styles.mainText}>Jane's App</Text>
      <View style={styles.footerContainer}>
        <Pressable onPress={clickHandler1} style={styles.button}>
          <Text style={styles.text}>Let's Eat</Text>
        </Pressable>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    backgroundColor: "#451a52",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
    borderWidth: 20,
    borderRadius: 55,
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 20,
    backgroundColor: "blue",
    borderWidth: 1,
    borderColor: "white",
    marginTop: 10,
  },

  mainText: {
    color: "#fff",
    fontSize: 40,
    padding: 30,
  },

  text: {
    color: "#fff",
    fontSize: 20,
    padding: 10,
  },

  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
  timerText: {
    color: "#fff",
    fontSize: 40,
    padding: 30,
  },
});
