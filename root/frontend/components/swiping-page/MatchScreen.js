import React from "react";
import { ScrollView, View, Text, StyleSheet, Image } from "react-native";
import Banner from "../generic/Banner";
import Toolbar from "../generic/Toolbar";
import styles from "../../styles";
import { SafeAreaView } from "react-native-safe-area-context";

const MatchScreen = () => {
  const movies = [
    {
      id: 1,
      title: "Avengers",
      image: "https://m.media-amazon.com/images/I/71niXI3lxlL._AC_SY679_.jpg",
      likes: ["Alice", "Bob", "Charlie", "Dave", "Alice", "Bob", "Charlie", "Dave"],
    },
    {
      id: 2,
      title: "Jaws",
      image: "https://i.etsystatic.com/13669063/r/il/0b9f6f/2963422074/il_570xN.2963422074_2p88.jpg",
      likes: ["Alice", "Charlie", "Dave"],
    },
  ];

  return (
    <SafeAreaView>
      <Toolbar />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Banner />
        <View style={styles.matchesContainer}>
          <Text style={styles.matchWidgetTitle}>Matches</Text>
          {movies.map((movie) => (
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
