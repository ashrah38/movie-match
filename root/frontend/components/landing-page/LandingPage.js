import { useState, createContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginForm from "./LoginForm";
import NewAccountForm from "./CreateAccountForm";
import RoomsPage from "../rooms-page/RoomsPage";
import StartPage from "../rooms-page/StartPage";
import CountdownPage from "../rooms-page/CountdownPage";
import JoinRoomBuffer from "../rooms-page/JoinRoomBuffer";
import { LandingPageContext } from "./LandingPageContext";
const Stack = createNativeStackNavigator();

const LandingPage = () => {
  const [hasUsername, setHasUsername] = useState(false);
  const [roomName, setRoomName] = useState();
  const [roomCode, setRoomCode] = useState();
  const [chosenCategories, setChosenCategories] = useState();

  const setRoomValue = (name) => {
    setRoomName(name);
  };

  const setCodeValue = (code) => {
    setRoomCode(code);
  };

  const setChosenCategoriesValue = (chosenCategories) => {
    setChosenCategories(chosenCategories);
  };

  return (
    <LandingPageContext.Provider
      value={{
        hasUsername,
        setHasUsername,
        roomName,
        setRoomValue,
        roomCode,
        setCodeValue,
        chosenCategories,
        setChosenCategoriesValue,
      }}
    >
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginForm} options={{ headerShown: false }} />
        <Stack.Screen name="NewAccount" component={NewAccountForm} options={{ headerShown: false }} />
        <Stack.Screen name="Rooms" component={RoomsPage} options={{ headerShown: false }} />
        <Stack.Screen name="StartPage" component={StartPage} options={{ headerShown: false }} />
        <Stack.Screen name="CountdownPage" component={CountdownPage} options={{ headerShown: false }} />
        <Stack.Screen name="JoinRoomBuffer" component={JoinRoomBuffer} options={{ headerShown: false }} />
      </Stack.Navigator>
    </LandingPageContext.Provider>
  );
};

export default LandingPage;
