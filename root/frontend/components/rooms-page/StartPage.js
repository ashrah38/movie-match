import { useState } from "react";
import { SafeAreaView, View, Text } from "react-native";
import { Button } from "@react-native-material/core";
import Banner from "../generic/Banner";
import Categories from "./Categories";
import styles from "../../styles";

const StartPage = ({}) => {
  return (
    <SafeAreaView style={styles.primaryContainer}>
      <Banner />
      <View style={styles.roomsContainer}>
        <Categories />
      </View>
    </SafeAreaView>
  );
};
export default StartPage;
