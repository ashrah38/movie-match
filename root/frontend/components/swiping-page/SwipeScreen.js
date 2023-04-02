import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Banner from "../generic/Banner";
import MatchBar from "./MatchBar";
import MovieDeck from "./MovieDeck";
import styles from "../../styles";

const SwipeScreen = () => {
  return (
    <SafeAreaView style={styles.swipeScreenContainer}>
      <View style={styles.swipeScreenContainer}>
        <Banner />
        <MovieDeck />
        <MatchBar />
      </View>
    </SafeAreaView>
  );
};

export default SwipeScreen;
