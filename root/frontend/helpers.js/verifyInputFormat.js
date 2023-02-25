export const verifyInputFormat = (data, type) => {
  if (type === "Email") {
    return Boolean(
      String(data)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    );
  }
  if (type === "Password") {
    return data.length >= 8;
  }
  if (type === "Username") {
    return data.length >= 6;
  }

  if (type === "Room Name") {
    return data.length >= 4;
  }

  if (type === "Room Code") {
    return data.length === 6;
  }
};
