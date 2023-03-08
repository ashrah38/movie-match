import { useState } from "react";
import { View, Text } from "react-native";
import { Button } from "@react-native-material/core";
import styles from "../../styles";
import ButtonContainer from "../generic/ButtonContainer";
import { Input, ErrorAlert } from "../generic/FormComponents";

const ChooseUsername = ({ navigation }) => {
  // state used to update the username
  const [username, onChangeUsername] = useState("");
  // state used to update error messages if any.
  const [errorMsg, setErrorMsg] = useState("");
  // state used to show or hide error messages.
  const [errorMsgClass, setErrorMsgClass] = useState("error-alert hide");
  // state used to control the styles on the widgets
  const [widgetStyle, onChangeWidgetStyle] = useState([styles.roomWidgets]);

  const onCancelHandler = () => {
    // hide the username widget, and then display the underlying basic rooms display
    onChangeWidgetStyle([styles.chooseUsernameWidget, styles.hideWidget]);
  };

  const onSubmitHandler = (username) => {
    let formatVerified = false;
    if (username.length < 6) {
      setErrorMsg("Username needs to be at least 6 characters.");
      setErrorMsgClass("error-alert");
      return;
    } else {
      formatVerified = true;
    }
    // the request options attached to the POST request on form submission.
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username }),
    };

    // only when the format is verified does the POST request gets triggered.
    if (formatVerified) {
      fetch("http://192.168.0.16:4000/choose-username", requestOptions)
        .then((response) => {
          // 500 -> server not responding.
          if (response.status === 500) {
            setErrorMsg("Something went wrong :/");
            setErrorMsgClass("error-alert");
            return;
          }
          return response.json();
        })
        // returns on successful request
        .then((data) => {
          if (data) {
            // username is chosen, put functions to revert to main display.
          }
        })
        .catch(() => {
          setErrorMsg("Something went wrong :/");
          setErrorMsgClass("error-alert");
        });
    }
  };

  return (
    <View style={widgetStyle}>
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
