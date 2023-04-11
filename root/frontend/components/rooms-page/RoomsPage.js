import { useState, useContext, useEffect } from "react";
import { SafeAreaView, View, Text, ScrollView, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IP_ADDRESS from "../../global";
import { Button } from "@react-native-material/core";
import Banner from "../generic/Banner";
import Toolbar from "../generic/Toolbar";
import styles from "../../styles";
import ChooseUsername from "./ChooseUsername";
import CreateRoom from "./CreateRoom";
import JoinRoom from "./JoinRoom";
import { LandingPageContext } from "../landing-page/LandingPageContext";

const RoomsPage = ({ navigation }) => {
  console.log("Rooms Page");
  // use context to see whether a user has a username
  const context = useContext(LandingPageContext);
  // state used to keep track of when the user has selected a username
  const [hasChosenUsername, setHasChosenUsername] = useState(false);
  // state used to show and hide the basic display
  const [roomDisplayStyles, onChangeRoomDisplayStyles] = useState();
  // state used to show and hide the widgets
  const [createRoomStyles, onChangeCreateRoomStyles] = useState([styles.roomWidgets, styles.hideWidget]);
  const [joinRoomStyles, onChangeJoinRoomStyles] = useState([styles.roomWidgets, styles.hideWidget]);
  const [chooseUsernameStyles, onChangeChooseUsernameStyles] = useState([styles.roomWidgets, styles.hideWidget]);
  // state to keep track of the recent rooms widget
  const [recentRooms, onChangeRecentRooms] = useState([]);
  // fetch recent rooms for this user
  useEffect(() => {
    // send an http request to fetch recent rooms
    const getRecentRooms = async () => {
      const token = await AsyncStorage.getItem("accessToken");
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json", accessToken: token },
      };
      try {
        const response = await fetch(`http://${IP_ADDRESS}:4000/getRooms`, requestOptions);
        const data = await response.json();
        if (data && data.length != 0) {
          onChangeRecentRooms(data);
        }
      } catch (error) {
        // throw an alert
        console.log(error);
      }
    };
    getRecentRooms();
  }, []);

  // if username does not exist, then display the username widget
  useEffect(() => {
    if (!context.hasUsername && !hasChosenUsername) {
      onChangeRoomDisplayStyles(styles.hideMainRoomDisplay);
      onChangeChooseUsernameStyles(styles.roomWidgets);
    }
  });
  // opens the create room widget when create room button is clicked
  const createRoomBtnHandler = () => {
    onChangeRoomDisplayStyles(styles.hideMainRoomDisplay);
    onChangeCreateRoomStyles(styles.roomWidgets);
  };

  // opens the join room widget when join room button is clicked
  const joinRoomBtnHandler = () => {
    onChangeRoomDisplayStyles(styles.hideMainRoomDisplay);
    onChangeJoinRoomStyles(styles.roomWidgets);
  };

  const onCancelHandler = () => {
    onChangeRoomDisplayStyles();
    onChangeCreateRoomStyles([styles.roomWidgets, styles.hideWidget]);
    onChangeJoinRoomStyles([styles.roomWidgets, styles.hideWidget]);
    onChangeChooseUsernameStyles([styles.roomWidgets, styles.hideWidget]);
  };

  return (
    <SafeAreaView style={styles.primaryContainer}>
      <Toolbar />
      <Banner />
      <View style={styles.roomsContainer}>
        <ChooseUsername widgetStyles={chooseUsernameStyles} onCancel={onCancelHandler} usernameCheck={setHasChosenUsername} />
        <CreateRoom
          widgetStyles={createRoomStyles}
          onCancel={onCancelHandler}
          setRoomName={context.setRoomValue}
          navigation={navigation}
        />
        <JoinRoom widgetStyles={joinRoomStyles} onCancel={onCancelHandler} />
        <View style={roomDisplayStyles}>
          <Button title="Create Room" style={styles.roomsBtn} onPress={() => createRoomBtnHandler()} />
          <Button title="Join Room" style={styles.roomsBtn} onPress={() => joinRoomBtnHandler()} navigation={navigation} />
          <View style={styles.recentRoomsWidget}>
            <Button title="Recent Rooms" style={styles.recentRoomsTitle} />
            <ScrollView style={styles.recentRoomsBtnContainer}>
              {recentRooms.map((room) => (
                <TouchableOpacity key={room.key} style={styles.recentRoomsBtn}>
                  <Text style={styles.recentRoomsName}>{room.roomName}</Text>
                  <Text style={styles.recentRoomsCode}>{room.roomCode}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default RoomsPage;
