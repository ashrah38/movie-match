import { useState, useEffect } from "react";
import { View, Text, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../../styles";

const Countdown = ({ widgetStyles, seconds, startCountdown }) => {
  const navigation = useNavigation();
  const [timeLeft, setTimeLeft] = useState(seconds);
  useEffect(() => {
    if (startCountdown) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      if (timeLeft === 1) {
        // here, redirect the app to the swiping component.
        setTimeout(() => {
          navigation.navigate("SwipingPage");
        }, 1000);
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
