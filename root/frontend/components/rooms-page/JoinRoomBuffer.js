import { useState, useContext } from "react";
import { SafeAreaView, View, Text } from "react-native";
import Banner from "../generic/Banner";
import Countdown from "./Countdown";
import styles from "../../styles";
import { getDeckOfMovies } from "../swiping-page/server-requests/getDeckOfMovies";
import { LandingPageContext } from "../landing-page/LandingPageContext";

const JoinRoomBuffer = ({ navigation }) => {
  const context = useContext(LandingPageContext);
  // state used to show and hide countdown
  const [countdownHide, onChangeCountdownHide] = useState([styles.countdownTimerContainer]);
  // state used to start countdown.
  const [startCountdown, onChangeStartCountdown] = useState(true);
  // fetch request to get deck of movies
  // send a post request to the server.
  getDeckOfMovies(context);
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
