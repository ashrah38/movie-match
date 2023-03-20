import { useState } from "react";
import { SafeAreaView, View, Text } from "react-native";
import Banner from "../generic/Banner";
import Countdown from "./Countdown";
import styles from "../../styles";

const JoinRoomBuffer = ({ navigation }) => {
  // state used to show and hide countdown
  const [countdownHide, onChangeCountdownHide] = useState([styles.countdownTimerContainer]);
  // state used to start countdown.
  const [startCountdown, onChangeStartCountdown] = useState(true);

  return (
    <SafeAreaView style={styles.primaryContainer}>
      <Banner />
      <View style={styles.roomsContainer}>
        <Countdown widgetStyles={countdownHide} seconds={3} startCountdown={startCountdown} />
      </View>
    </SafeAreaView>
  );
};
export default JoinRoomBuffer;
