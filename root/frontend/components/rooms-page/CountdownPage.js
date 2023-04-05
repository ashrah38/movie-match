import { useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView, View, Text } from "react-native";
import Banner from "../generic/Banner";
import Toolbar from "../generic/Toolbar";
import RoomCode from "./RoomCode";
import Countdown from "./Countdown";
import styles from "../../styles";
import { LandingPageContext } from "../landing-page/LandingPageContext";
import IP_ADDRESS from "../../global";

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
    // what needs to be sent to the server
    const token = await AsyncStorage.getItem("accessToken");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", accessToken: token },
      body: JSON.stringify({}),
    };
    // code this fetch request once backend is in order.
    // fetch(`http://${IP_ADDRESS}:4000/getDeck`, requestOptions).then((response) => {
    //   // add error handling here when someone has time
    //   if (response.status == 500) return;
    //   // if no error, assume the correct response has been received.
    //   return response.json();
    // });
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
