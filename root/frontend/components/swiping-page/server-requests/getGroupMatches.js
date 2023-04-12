import IP_ADDRESS from "../../../global";

export const getGroupMatches = async (context) => {
  const roomCode = context.roomCode;
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  // code this fetch request once backend is in order.
  console.log(roomCode);

  const response = await fetch(`http://${IP_ADDRESS}:4000/getGroupMatches?roomCode=${roomCode}`, requestOptions);
  if (response.status == 500) {
    // throw an alert
    return;
  }
  const data = await response.json();
  let treatedData = [];
  let keyIterator = 1;
  data.forEach((item) => {
    treatedData.push({ id: keyIterator, title: item.title, image: item.url, likes: item.likedBy });
    keyIterator += 1;
  });
  return treatedData;
};
