import { useState } from "react";
import { View, Text } from "react-native";
import { Button } from "@react-native-material/core";
import styles from "../../styles";
import ButtonContainer from "../generic/ButtonContainer";
import { Input, ErrorAlert } from "../generic/FormComponents";

// this widget does not make a post request.
// the room name is held by the RoomsPage, and this function is passed the OnChangeRoomName function
// upon submission, the room name is held passed back to the RoomsPage
// the user is directed to the choose categories widget next
const CreateRoom = ({ widgetStyles, onCancel, navigation, setRoomName }) => {
  // state used to update the username
  const [roomName, onChangeRoomName] = useState("");
  // state used to update error messages if any.
  const [errorMsg, setErrorMsg] = useState("");
  // state used to show or hide error messages.
  const [errorMsgClass, setErrorMsgClass] = useState("error-alert hide");
  // state used to control the styles on the widgets

  const onCancelHandler = () => {
    onCancel();
  };

  const onSubmitHandler = (username) => {
    let formatVerified = false;
    if (username.length < 3) {
      setErrorMsg("Room name needs to be at least 3 characters.");
      setErrorMsgClass("error-alert");
      return;
    } else {
      formatVerified = true;
    }
    // only when the format is verified does the following trigger
    if (formatVerified) {
      setRoomName(roomName);
      navigation.navigate("StartPage");
    }
  };

  return (
    <View style={widgetStyles}>
      <Text style={styles.widgetHeading}>Create Room</Text>
      <Input name="Create Room" value={roomName} secureTextEntry={false} onChangeText={onChangeRoomName} />
      <ButtonContainer style={styles.btnContainerWidget}>
        <Button title="Cancel" onPress={() => onCancelHandler()} />
        <Button title="Submit" onPress={() => onSubmitHandler(roomName)} />
      </ButtonContainer>
    </View>
  );
};
export default CreateRoom;
