import { useState } from "react";
import { View } from "react-native";
import { Input, ErrorAlert } from "../generic/FormComponents";
import { verifyInputFormat } from "../../helpers.js/verifyInputFormat";
import ButtonContainer from "../generic/ButtonContainer";
import { Button } from "@react-native-material/core";
import styles from "../../styles";

const NewAccountForm = () => {
  // state used to update the input fields in real time.
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [verifyPassword, onChangeVerifyPassword] = useState("");
  // state used to update error messages if any.
  const [errorMsg, setErrorMsg] = useState("");
  // used to show or hide error messages.
  const [errorMsgClass, setErrorMsgClass] = useState("error-alert hide");
  //let navigate = useNavigate();

  const onSubmitHandler = (email, password, verifyPassword) => {
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

    if (formatVerified && password !== verifyPassword) {
      setErrorMsg("Passwords do not match");
      setErrorMsgClass("error-alert");
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
        verifyPassword: verifyPassword,
      }),
    };
    if (formatVerified) {
      fetch("http://localhost:4000/create-new", requestOptions)
        .then((response) => {
          if (response.status === 500) {
            setErrorMsg("Something went wrong :/");
            setErrorMsgClass("error-alert");
            return;
          }
          if (response.status === 501) {
            setErrorMsg("Email already in use");
            setErrorMsgClass("error-alert");
            return;
          }
          return response.json();
        })
        .then((data) => {
          navigate("/rooms", { replace: true });
        })
        .catch((error) => {
          setErrorMsg("Something went wrong :/");
          setErrorMsgClass("error-alert");
          return;
        });
    }
  };
  return (
    <View style={styles.loginForm}>
      <ErrorAlert className={errorMsgClass} errorMsg={errorMsg} />
      <Input
        name="Email"
        value={email}
        secureTextEntry={false}
        onChangeText={onChangeEmail}
      />
      <Input
        name="Password"
        value={password}
        secureTextEntry={true}
        onChangeText={onChangePassword}
      />
      <Input
        name="Verify Password"
        value={password}
        secureTextEntry={true}
        onChangeText={onChangeVerifyPassword}
      />
      <ButtonContainer style={styles.btnContainer}>
        <Button
          title="Create an Account"
          onPress={() => onSubmitHandler(email, password)}
          style={styles.largeBtn}
        />
      </ButtonContainer>
    </View>
  );
};

export default NewAccountForm;
