import { useState } from "react";
import { SafeAreaView, View, Text } from "react-native";
import { Button } from "@react-native-material/core";
import Banner from "../generic/Banner";
import Categories from "./Categories";
import StartDisplay from "./StartDisplay";
import styles from "../../styles";

const StartPage = ({}) => {
  return (
    <SafeAreaView style={styles.primaryContainer}>
      <Banner />
      <StartDisplay />
      <View style={styles.roomsContainer}></View>
    </SafeAreaView>
  );
};
export default StartPage;
