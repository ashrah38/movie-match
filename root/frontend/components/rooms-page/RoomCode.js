import { useState } from "react";
import { View, Text } from "react-native";
import { Button } from "@react-native-material/core";
import ButtonContainer from "../generic/ButtonContainer";
import styles from "../../styles";

const RoomCode = ({ widgetStyles, onCancel }) => {
  // state used to update the username
  const [roomName, onChangeRoomName] = useState("");
  // state used to control the styles on the widgets
  const [widgetStyle, onChangeWidgetStyle] = useState([styles.chooseUsernameWidget]);

  const onSubmitHandler = () => {};

  return (
    <View style={widgetStyles}>
      <Text style={styles.widgetHeading}>Room Code</Text>
      <Text style={styles.roomCodeText}>891JF</Text>
      <ButtonContainer style={styles.btnContainerWidget}>
        <Button title="Start!" onPress={() => onCancelHandler()} />
        <Button title="Clipboard" onPress={() => copyToClipboard()} />
      </ButtonContainer>
    </View>
  );
};
export default RoomCode;
