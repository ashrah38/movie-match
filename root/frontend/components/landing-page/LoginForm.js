import { useState } from "react";
import { View } from "react-native";
import { Input, ErrorAlert } from "../generic/FormComponents";
import { verifyInputFormat } from "../../helpers.js/verifyInputFormat";
import ButtonContainer from "../generic/ButtonContainer";
import { Button } from "@react-native-material/core";
import styles from "../../styles";

const LoginForm = () => {
  // state used to update the input fields in real time.
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  // state used to update error messages if any.
  const [errorMsg, setErrorMsg] = useState("");
  // used to show or hide error messages.
  const [errorMsgClass, setErrorMsgClass] = useState("error-alert hide");
  //let navigate = useNavigate();

  // triggered on form submission - the function verifies the input format, and returns an error if the format is invalid.
  const onSubmitHandler = (email, password) => {
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
      fetch("http://localhost:4000/login", requestOptions)
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
          return response.json();
        })
        // data is only returned if login was successful - on successful login, navigate the user to /rooms.
        .then((data) => {
          if (data) {
            //navigate("/rooms", { replace: true });
          }
        })
        .catch((error) => {
          setErrorMsg("Something went wrong :/");
          setErrorMsgClass("error-alert");
        });
    }
  };
  return (
    <View style={styles.loginForm}>
      <ErrorAlert className={errorMsgClass} errorMsg={errorMsg} />
      <Input
        name="Email"
        type="Email"
        value={email}
        secureTextEntry={false}
        onChangeText={onChangeEmail}
      />
      <Input
        name="Password"
        type="Password"
        value={password}
        secureTextEntry={true}
        onChangeText={onChangePassword}
      />
      <ButtonContainer style={styles.btnContainer}>
        <Button
          title="Login"
          onPress={() => onSubmitHandler(email, password)}
        />
        <Button title="Create an Account" />
      </ButtonContainer>
    </View>
  );
};

export default LoginForm;
