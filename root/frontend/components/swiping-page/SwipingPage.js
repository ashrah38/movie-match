import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SwipeScreen from "./SwipeScreen";
import MatchScreen from "./MatchScreen";

const Stack = createNativeStackNavigator();

const SwipingPage = ({}) => {
  return (
    <Stack.Navigator initialRouteName="SwipingScreen">
      <Stack.Screen name="SwipingScreen" component={SwipeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MatchScreen" component={MatchScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};
export default SwipingPage;
