import { useState, useEffect } from "react";
import { View, Text, Alert } from "react-native";
import * as Clipboard from "expo-clipboard";
import { Button } from "@react-native-material/core";
import ButtonContainer from "../generic/ButtonContainer";
import styles from "../../styles";

const Countdown = ({ widgetStyles, seconds, startCountdown }) => {
  const [timeLeft, setTimeLeft] = useState(seconds);
  useEffect(() => {
    if (startCountdown) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      if (timeLeft === 1) {
        // here, redirect the app to the swiping component.
        clearInterval(timer);
      }
      return () => clearInterval(timer);
    }
  }, [timeLeft, startCountdown]);

  return (
    <View style={widgetStyles}>
      <Text style={styles.countdownTimer}>{timeLeft}</Text>
    </View>
  );
};
export default Countdown;
