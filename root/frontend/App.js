import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingPage from "./components/landing-page/LandingPage";
import RoomsPage from "./components/rooms-page/RoomsPage";
import StartPage from "./components/rooms-page/StartPage";
import styles from "./styles";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={LandingPage} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
