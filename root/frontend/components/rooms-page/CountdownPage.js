import { useState, useContext } from "react";
import { SafeAreaView, View, Text } from "react-native";
import Banner from "../generic/Banner";
import Toolbar from "../generic/Toolbar";
import RoomCode from "./RoomCode";
import Countdown from "./Countdown";
import styles from "../../styles";
import { getDeckOfMovies } from "../swiping-page/server-requests/getDeckOfMovies";
import { LandingPageContext } from "../landing-page/LandingPageContext";

const CountdownPage = ({ navigation }) => {
  const context = useContext(LandingPageContext);
  const roomCode = context.roomCode;
  // state used to show and hide the widgets
  const [roomCodeStyles, onChangeRoomCodeStyles] = useState([styles.roomWidgets]);
  // state used to show and hide countdown
  const [countdownHide, onChangeCountdownHide] = useState([styles.countdownTimerContainer, styles.hideWidget]);
  // state used to start countdown.
  const [startCountdown, onChangeStartCountdown] = useState(false);

  // send a post request to the server.
  const startButtonHandler = async () => {
    // hide the room code widget
    onChangeRoomCodeStyles([[styles.roomWidgets, styles.hideWidget]]);
    // start and display the countdown
    onChangeStartCountdown(true);
    onChangeCountdownHide();
    getDeckOfMovies(context);
  };

  return (
    <SafeAreaView style={styles.primaryContainer}>
      <Toolbar />
      <Banner />
      <View style={styles.roomsContainer}>
        <RoomCode widgetStyles={roomCodeStyles} codeValue={roomCode} startButtonHandler={startButtonHandler} />
        <Countdown widgetStyles={countdownHide} seconds={3} startCountdown={startCountdown} />
      </View>
    </SafeAreaView>
  );
};
export default CountdownPage;
