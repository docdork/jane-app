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
  const [eatState, setEatState] = useState("Bite");
  const [eatColor, setEatColor] = useState(styles.modalTextBite);

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
    setCounter(3);
    setEatState("Bite");
    setEatColor(styles.modalTextBite);
  }

  function closeHandler() {
    setModalState(false);
  }

  useEffect(() => {
    const timer =
      counter > -1 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  if (modalState) {
    if (counter === -1) {
      playPing();
      Vibration.vibrate();

      if (eatState === "Bite") {
        setEatState("Chew");
        setEatColor(styles.modalTextChew);
        setCounter(20);
      } else if (eatState === "Chew") {
        setEatState("Swallow");
        setEatColor(styles.modalTextSwallow);
        setCounter("5");
      } else if (eatState == "Swallow") {
        setEatState("Pause");
        setEatColor(styles.modalTextPause);
        setCounter("20");
      } else {
        setEatState("Bite");
        setEatColor(styles.modalTextBite);
        setCounter("3");
      }
    }
  }

  return (
    <View style={styles.container}>
      <Modal visible={modalState} animationType="slide">
        <View style={styles.container}>
          <Text style={eatColor}>{eatState}</Text>
          <Text style={styles.timerText}>{counter}</Text>
          <Pressable onPress={closeHandler} style={styles.button}>
            <Text style={styles.text}>Done</Text>
          </Pressable>
        </View>
      </Modal>
      <Text style={styles.mainText}>Ready to Eat?</Text>
      <View style={styles.footerContainer}>
        <Pressable onPress={clickHandler1} style={styles.button}>
          <Text style={styles.text}>Let's Eat!</Text>
        </Pressable>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#330528",
    alignItems: "center",
    justifyContent: "center",
    borderTopColor: "white",
    borderTopWidth: 1,
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
    fontSize: 100,
    padding: 30,
  },
  modalTextChew: {
    color: "#32c2a5",
    fontSize: 70,
    padding: 30,
  },
  modalTextPause: {
    color: "#BA324F",
    fontSize: 70,
    padding: 30,
  },
  modalTextSwallow: {
    color: "#4BA3C3",
    fontSize: 70,
    padding: 30,
  },
  modalTextPause: {
    color: "#BA324F",
    fontSize: 70,
    padding: 30,
  },
  modalTextBite: {
    color: "#227DAA",
    fontSize: 70,
    padding: 30,
  },
});
