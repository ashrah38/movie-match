import { useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView, View, Text } from "react-native";
import Banner from "../generic/Banner";
import Toolbar from "../generic/Toolbar";
import Categories from "./Categories";
import StartDisplay from "./StartDisplay";
import styles from "../../styles";
import { LandingPageContext } from "../landing-page/LandingPageContext";
import IP_ADDRESS from "../../global";

const StartPage = ({ navigation }) => {
  const context = useContext(LandingPageContext);
  let roomName = context.roomName;
  // state to store styles for the categories component
  const [categoriesStyles, onChangeCategoriesStyles] = useState([styles.categoryContainer]);
  // state to store the categories chosen
  const [categories, setCategories] = useState([]);
  // state to store the chosen mode - rapidfire by default
  const [mode, setMode] = useState("rapidfire");

  const hideCategories = () => {
    onChangeCategoriesStyles([styles.categoryContainer, styles.hideWidget]);
  };

  const chooseMode = (chosenMode) => {
    setMode(chosenMode);
  };

  // send a post request to the server.
  // the payload includes a room name, categories [], and mode.
  const startButtonHandler = async (roomName, categories, mode) => {
    const token = await AsyncStorage.getItem("accessToken");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", accessToken: token },
      body: JSON.stringify({ roomName: roomName, categories: categories, mode: mode }),
    };
    fetch(`http://${IP_ADDRESS}:4000/createRoom`, requestOptions)
      .then((response) => {
        // add error handling here when someone has time
        if (response.status == 500) return;
        // if no error, assume the correct response has been received.
        return response.json();
      })
      .then((data) => {
        // successful post request, do whatever with the data here.
        context.setCodeValue(data);
        context.setChosenCategoriesValue(categories);
        navigation.navigate("CountdownPage");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={styles.primaryContainer}>
      <Toolbar />
      <Banner />
      <Categories widgetStyles={categoriesStyles} chosenCategories={setCategories} hideCategories={hideCategories} />
      <StartDisplay chooseMode={chooseMode} startButtonHandler={() => startButtonHandler(roomName, categories, mode)} />
    </SafeAreaView>
  );
};
export default StartPage;
