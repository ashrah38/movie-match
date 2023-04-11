import { useState, useEffect, useContext } from "react";
import { SafeAreaView, View } from "react-native";
import { LandingPageContext } from "../landing-page/LandingPageContext";
import Banner from "../generic/Banner";
import Toolbar from "../generic/Toolbar";
import MatchBar from "./MatchBar";
import MovieDeck from "./MovieDeck";
import styles from "../../styles";
import IP_ADDRESS from "../../global";

const SwipeScreen = () => {
  // use context to obtain the movie deck.
  const context = useContext(LandingPageContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [roomMembers, setMembers] = useState([]);
  useEffect(() => {
    const getRoomMembers = async (context) => {
      const roomCode = context.roomCode;
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      const response = await fetch(`http://${IP_ADDRESS}:4000/getMembers?roomCode=${roomCode}`, requestOptions);
      if (response.status == 500) {
        // throw an alert
        return;
      }
      const data = await response.json();
      // data now is an array of usernames
      if (data) {
        setMembers(data);
      }
    };
    getRoomMembers(context);
  }, []);
  const setModal = (value) => {
    setModalVisible(value);
  };

  return (
    <SafeAreaView style={styles.swipeScreenContainer}>
      <Toolbar />
      <View style={styles.swipeScreenContainer}>
        <Banner />
        <MovieDeck modalVisible={modalVisible} changeModalVisible={(value) => setModal(value)} roomMembers={roomMembers} />
        <MatchBar modalVisible={modalVisible} changeModalVisible={(value) => setModal(value)} />
      </View>
    </SafeAreaView>
  );
};

export default SwipeScreen;
