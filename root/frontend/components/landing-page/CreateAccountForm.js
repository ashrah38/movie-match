import { useState } from "react";
import { View, SafeAreaView } from "react-native";
import { Input, ErrorAlert } from "../generic/FormComponents";
import { verifyInputFormat } from "../../helpers/verifyInputFormat";
import ButtonContainer from "../generic/ButtonContainer";
import Banner from "../generic/Banner";
import styles from "../../styles";
import { Button } from "@react-native-material/core";
import Icon from "react-native-vector-icons/FontAwesome";
import IP_ADDRESS from "../../global.js";
import { cookieExtractor } from "../../helpers/cookieExtractor";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NewAccountForm = ({ navigation }) => {
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
      }),
    };
    // only when the format is verified does the POST request gets triggered.
    if (formatVerified) {
      fetch(`http://${IP_ADDRESS}:4000/register`, requestOptions)
        .then((response) => {
          if (response.status === 501) {
            setErrorMsg("Email already in use");
            setErrorMsgClass("error-alert");
            return;
          }
          if (response.status !== 200) {
            setErrorMsg("Something went wrong :/");
            setErrorMsgClass("error-alert");
            return;
          }
          const token = cookieExtractor(response.headers);
          AsyncStorage.setItem("accessToken", token);
          return response;
        })
        .then((response) => {
          if (response.status == 200) {
            navigation.replace("Rooms");
          }
        })
        .catch((error) => {
          console.log(error);
          setErrorMsg("Something went wrong :/");
          setErrorMsgClass("error-alert");
          return;
        });
    }
  };
  return (
    <SafeAreaView style={styles.primaryContainer}>
      <Banner />
      <Icon.Button
        name="rotate-left"
        color="#000"
        backgroundColor="#f6f6f6"
        style={styles.returnBtn}
        onPress={() => navigation.navigate("Login")}
      ></Icon.Button>
      <View style={styles.loginForm}>
        <ErrorAlert className={errorMsgClass} errorMsg={errorMsg} />
        <Input name="Email" value={email} secureTextEntry={false} onChangeText={onChangeEmail} />
        <Input name="Password" value={password} secureTextEntry={true} onChangeText={onChangePassword} />
        <Input name="Verify Password" value={verifyPassword} secureTextEntry={true} onChangeText={onChangeVerifyPassword} />
        <ButtonContainer style={styles.btnContainer}>
          <Button
            title="Create an Account"
            onPress={() => onSubmitHandler(email, password, verifyPassword)}
            style={styles.largeBtn}
          />
        </ButtonContainer>
      </View>
    </SafeAreaView>
  );
};

export default NewAccountForm;
