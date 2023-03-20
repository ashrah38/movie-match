import { useState } from "react";
import { View, Text } from "react-native";
import { Button } from "@react-native-material/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../../styles";
import ButtonContainer from "../generic/ButtonContainer";
import { Input, ErrorAlert } from "../generic/FormComponents";
import IP_ADDRESS from "../../global";

const ChooseUsername = ({ widgetStyles, onCancel, usernameCheck }) => {
  // state used to update the username
  const [username, onChangeUsername] = useState("");
  // state used to update error messages if any.
  const [errorMsg, setErrorMsg] = useState("");
  // state used to show or hide error messages.
  const [errorMsgClass, setErrorMsgClass] = useState("error-alert hide");
  // state used to control the styles on the widgets

  const onCancelHandler = () => {
    usernameCheck(true);
    onCancel();
  };

  const onSubmitHandler = async (username) => {
    let formatVerified = false;
    if (username.length < 6) {
      setErrorMsg("Username needs to be at least 6 characters.");
      setErrorMsgClass("error-alert");
      return;
    } else {
      formatVerified = true;
    }
    const token = await AsyncStorage.getItem("accessToken");
    // the request options attached to the POST request on form submission.
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", accessToken: token },
      body: JSON.stringify({ username: username }),
    };

    // only when the format is verified does the POST request gets triggered.
    if (formatVerified) {
      usernameCheck(true);
      fetch(`http://${IP_ADDRESS}:4000/chooseUsername`, requestOptions)
        .then((response) => {
          // 500 -> server not responding.
          if (response.status === 500) {
            setErrorMsg("Something went wrong :/");
            setErrorMsgClass("error-alert");
            return;
          }
          // Unauthorized Access
          if (response.status === 401 || response.status === 403) {
            setErrorMsg("Something went wrong :/");
            setErrorMsgClass("error-alert");
            return;
          }
          return response.json();
        })
        // returns on successful request
        .then((data) => {
          if (data) {
            console.log("Username saved.");
            onCancelHandler();
          }
        })
        .catch((error) => {
          console.log(error);
          setErrorMsg("Something went wrong :/");
          setErrorMsgClass("error-alert");
        });
    }
  };

  return (
    <View style={widgetStyles}>
      <Text style={styles.widgetHeading}>Choose Username</Text>
      <Input name="Username" value={username} secureTextEntry={false} onChangeText={onChangeUsername} />
      <ButtonContainer style={styles.btnContainerWidget}>
        <Button title="Cancel" onPress={() => onCancelHandler()} />
        <Button title="Submit" onPress={() => onSubmitHandler(username)} />
      </ButtonContainer>
    </View>
  );
};
export default ChooseUsername;
