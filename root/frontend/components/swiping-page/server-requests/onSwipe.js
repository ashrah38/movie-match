import AsyncStorage from "@react-native-async-storage/async-storage";
import IP_ADDRESS from "../../../global";

export const onSwipe = async (context, movieID, swipeDirection) => {
  const roomCode = context.roomCode;
  const token = await AsyncStorage.getItem("accessToken");
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", accessToken: token },
    body: JSON.stringify({ roomCode: roomCode, movieID: movieID, swipeDirection: swipeDirection }),
  };
  // code this fetch request once backend is in order.
  fetch(`http://${IP_ADDRESS}:4000/onSwipe`, requestOptions)
    .then((response) => {
      // add error handling here when someone has time
      if (response.status == 500) {
        console.log("Something went wrong");
      }
      // if no error, assume the correct response has been received.
      return;
    })
    .catch((err) => {
      console.log(err);
      return;
    });
};
