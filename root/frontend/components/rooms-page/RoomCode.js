import { useState } from "react";
import { View, Text, Alert } from "react-native";
import * as Clipboard from "expo-clipboard";
import { Button } from "@react-native-material/core";
import ButtonContainer from "../generic/ButtonContainer";
import styles from "../../styles";

const RoomCode = ({ widgetStyles, codeValue, startButtonHandler }) => {
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(codeValue);
    Alert.alert("Copied to clipboard");
  };

  return (
    <View style={widgetStyles}>
      <Text style={styles.widgetHeading}>Room Code</Text>
      <Text style={styles.roomCodeText}>{codeValue}</Text>
      <ButtonContainer style={styles.btnContainerWidget}>
        <Button title="Start!" onPress={() => startButtonHandler()} />
        <Button title="Clipboard" onPress={() => copyToClipboard()} />
      </ButtonContainer>
    </View>
  );
};
export default RoomCode;
