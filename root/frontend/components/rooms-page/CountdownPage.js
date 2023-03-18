import { useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView, View, Text } from "react-native";
import Banner from "../generic/Banner";
import RoomCode from "./RoomCode";
import styles from "../../styles";
import { LandingPageContext } from "../landing-page/LandingPageContext";
import IP_ADDRESS from "../../global";

const CountdownPage = ({ navigation }) => {
  const context = useContext(LandingPageContext);
  const roomCode = context.roomCode;

  // send a post request to the server.
  const startButtonHandler = async () => {
    const token = await AsyncStorage.getItem("accessToken");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", accessToken: token },
      body: JSON.stringify({}),
    };
    fetch(`http://${IP_ADDRESS}:4000/createRoom`, requestOptions).then((response) => {
      // add error handling here when someone has time
      if (response.status == 500) return;
      // if no error, assume the correct response has been received.
      return response.json();
    });
  };

  return (
    <SafeAreaView style={styles.primaryContainer}>
      <Banner />
      <View style={styles.roomsContainer}>
        <RoomCode widgetStyles={styles.roomWidgets} />
      </View>
    </SafeAreaView>
  );
};
export default CountdownPage;
