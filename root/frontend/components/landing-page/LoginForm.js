import { useState, useContext } from "react";
import { View, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Input, ErrorAlert } from "../generic/FormComponents";
import { verifyInputFormat } from "../../helpers/verifyInputFormat";
import { cookieExtractor } from "../../helpers/cookieExtractor";
import ButtonContainer from "../generic/ButtonContainer";
import Banner from "../generic/Banner";
import { Button } from "@react-native-material/core";
import styles from "../../styles";
import IP_ADDRESS from "../../global.js";
import { LandingPageContext } from "./LandingPageContext";

const LoginForm = ({ navigation }) => {
  // use context to update whether a user has a username or not
  const context = useContext(LandingPageContext);
  // set the following context once we check whether user has username
  // state used to update the input fields in real time.
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  // state used to update error messages if any.
  const [errorMsg, setErrorMsg] = useState("");
  // used to show or hide error messages.
  const [errorMsgClass, setErrorMsgClass] = useState("error-alert hide");

  // triggered on form submission - the function verifies the input format, and returns an error if the format is invalid.
  const onSubmitHandler = async (email, password) => {
    let formatVerified = false;

    if (verifyInputFormat(email, "Email") === false) {
      setErrorMsg("Invalid email format");
      setErrorMsgClass("error-alert");
      return;
    } else if (verifyInputFormat(password, "Password") === false) {
      setErrorMsg("Password needs to be at least 8 characters");
      setErrorMsgClass("error-alert");
      return;
    } else {
      formatVerified = true;
    }

    // the request options attached to the POST request on form submission.
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    };
    // only when the format is verified does the POST request gets triggered.
    if (formatVerified) {
      fetch(`http://${IP_ADDRESS}:4000/login`, requestOptions)
        .then((response) => {
          // 500 -> server not responding.
          if (response.status === 500) {
            setErrorMsg("Something went wrong :/");
            setErrorMsgClass("error-alert");
            return;
          }
          // 501 OR  502-> email not in use OR incorrect password.
          if (response.status === 501) {
            setErrorMsg("Email not in use");
            setErrorMsgClass("error-alert");
            return;
          }
          if (response.status === 502) {
            setErrorMsg("Incorrect Password");
            setErrorMsgClass("error-alert");
            return;
          }
          // extract the JWT from the header and store it on the server side.
          const token = cookieExtractor(response.headers);
          AsyncStorage.setItem("accessToken", token);
          return response.json();
        })
        // data is only returned if login was successful - on successful login, navigate the user to /rooms.
        .then((data) => {
          if (data.username != undefined && data.username != "") {
            // has username
            context.setHasUsername(true);
          } else {
            context.setHasUsername(false);
          }
          navigation.navigate("Rooms");
        })
        .catch((error) => {
          console.log(error);
          setErrorMsg("Something went wrong :/");
          setErrorMsgClass("error-alert");
        });
    }
  };
  return (
    <SafeAreaView style={styles.primaryContainer}>
      <Banner />
      <View style={styles.loginForm}>
        <ErrorAlert className={errorMsgClass} errorMsg={errorMsg} />
        <Input name="Email" type="Email" value={email} secureTextEntry={false} onChangeText={onChangeEmail} />
        <Input name="Password" type="Password" value={password} secureTextEntry={true} onChangeText={onChangePassword} />
        <ButtonContainer style={styles.btnContainer}>
          <Button title="Login" onPress={() => onSubmitHandler(email, password)} />
          <Button title="Create an Account" onPress={() => navigation.navigate("NewAccount")} />
        </ButtonContainer>
      </View>
    </SafeAreaView>
  );
};

export default LoginForm;
