import { React, useEffect, useContext, useState } from "react";
import { ScrollView, View, Text, Image } from "react-native";
import Banner from "../generic/Banner";
import Toolbar from "../generic/Toolbar";
import styles from "../../styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { getGroupMatches } from "./server-requests/getGroupMatches";
import { LandingPageContext } from "../landing-page/LandingPageContext";

const MatchScreen = () => {
  // use context to obtain the movie deck.
  const context = useContext(LandingPageContext);
  const [matches, onChangeMatches] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let updatedMatches = await getGroupMatches(context);
        if (updatedMatches && updatedMatches.length > 0) onChangeMatches(updatedMatches);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView>
      <Toolbar />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.matchesContainer}>
          <Text style={styles.matchWidgetTitle}>Matches</Text>
          {matches.map((movie) => (
            <View style={styles.matchWidgetMovieContainer} key={movie.id}>
              <Image source={{ uri: movie.image }} style={styles.matchWidgetMovieImage} />
              <View style={styles.matchWidgetMovieDetails}>
                <Text style={styles.matchWidgetMovieTitle}>{movie.title}</Text>
                <Text style={styles.matchWidgetLikes}>{movie.likes.join(", ")}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MatchScreen;
