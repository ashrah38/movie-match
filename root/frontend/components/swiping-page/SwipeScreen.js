import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Banner from "../generic/Banner";
import Toolbar from "../generic/Toolbar";
import MatchBar from "./MatchBar";
import MovieDeck from "./MovieDeck";
import styles from "../../styles";

const SwipeScreen = () => {
  return (
    <SafeAreaView style={styles.swipeScreenContainer}>
      <Toolbar />
      <View style={styles.swipeScreenContainer}>
        <Banner />
        <MovieDeck />
        <MatchBar />
      </View>
    </SafeAreaView>
  );
};

export default SwipeScreen;
