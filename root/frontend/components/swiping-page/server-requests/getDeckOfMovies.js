import AsyncStorage from "@react-native-async-storage/async-storage";
import IP_ADDRESS from "../../../global";

export const getDeckOfMovies = async (context) => {
  const roomCode = context.roomCode;
  const token = await AsyncStorage.getItem("accessToken");
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", accessToken: token },
    body: JSON.stringify({ roomCode: roomCode }),
  };
  // code this fetch request once backend is in order.
  fetch(`http://${IP_ADDRESS}:4000/getMovies`, requestOptions)
    .then((response) => {
      // add error handling here when someone has time
      if (response.status == 500) return;
      // if no error, assume the correct response has been received.
      return response.json();
    })
    .then((data) => {
      // treat the data and store it in moviedeck
      let treatedData = [];
      let keyIterator = 1;
      data.forEach((item) => {
        treatedData.push({ id: keyIterator, imdbid: item.imdbid, text: item.title, url: item.image });
        keyIterator += 1;
      });
      context.updateMovieDeck(treatedData);
      console.log(treatedData);
      return;
    })
    .catch((err) => console.log(err));
};
