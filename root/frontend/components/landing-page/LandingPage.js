import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginForm from "./LoginForm";
import NewAccountForm from "./CreateAccountForm";
import RoomsPage from "../rooms-page/RoomsPage";

const Stack = createNativeStackNavigator();

const LandingPage = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginForm}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NewAccount"
        component={NewAccountForm}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Rooms"
        component={RoomsPage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default LandingPage;
