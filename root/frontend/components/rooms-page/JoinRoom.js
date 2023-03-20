import { useState } from "react";
import { View, Text, Alert } from "react-native";
import { Button } from "@react-native-material/core";
import styles from "../../styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ButtonContainer from "../generic/ButtonContainer";
import { Input } from "../generic/FormComponents";
import IP_ADDRESS from "../../global";
import { useNavigation } from "@react-navigation/native";

const JoinRoom = ({ widgetStyles, onCancel }) => {
  const navigation = useNavigation();
  // state used to update the username
  const [roomCode, onChangeRoomCode] = useState("");

  const onCancelHandler = () => {
    // hide the username widget, and then display the underlying basic rooms display
    onCancel();
  };

  // make a POST request to the server ccontaining the room code.
  const onSubmitHandler = async (roomCode) => {
    const token = await AsyncStorage.getItem("accessToken");

    // room code cannot be less than 6 characters
    if (roomCode.length < 6) {
      Alert.alert("Invalid Room Code");
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", accessToken: token },
      body: JSON.stringify({ roomCode: roomCode }),
    };

    fetch(`http://${IP_ADDRESS}:4000/joinRoom`, requestOptions)
      .then((response) => {
        if (response.status == 500) {
          Alert.alert("Server not responding");
          return;
        } else if (response.status != 200) {
          Alert.alert("The room does not exist.");
          return;
        }
        // if no error, assume the correct response has been received.
        return response.json();
      })
      .then((data) => {
        // successful post request, the returned data is the Room object.
        // extract the deck, if there is one, and save it to global state.
        // then, navigate to the JoinRoomBuffer.
        if (data != undefined) {
          navigation.navigate("JoinRoomBuffer");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={widgetStyles}>
      <Text style={styles.widgetHeading}>Join Room</Text>
      <Input name="Join Room" value={roomCode} secureTextEntry={false} onChangeText={onChangeRoomCode} />
      <ButtonContainer style={styles.btnContainerWidget}>
        <Button title="Cancel" onPress={() => onCancelHandler()} />
        <Button title="Submit" onPress={() => onSubmitHandler(roomCode)} />
      </ButtonContainer>
    </View>
  );
};
export default JoinRoom;
