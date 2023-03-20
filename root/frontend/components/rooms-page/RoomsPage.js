import { useState, useContext, useEffect } from "react";
import { SafeAreaView, View, Text } from "react-native";
import { Button } from "@react-native-material/core";
import Banner from "../generic/Banner";
import styles from "../../styles";
import ChooseUsername from "./ChooseUsername";
import CreateRoom from "./CreateRoom";
import JoinRoom from "./JoinRoom";
import { LandingPageContext } from "../landing-page/LandingPageContext";

const RoomsPage = ({ navigation }) => {
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
            <Button title="Recent Rooms" style={styles.roomsBtn} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default RoomsPage;
