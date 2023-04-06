import React, { useState, useRef, useContext } from "react";
import { View, PanResponder, Animated, TouchableOpacity, Image } from "react-native";
import { Dimensions } from "react-native";
import { LandingPageContext } from "../landing-page/LandingPageContext";
import { getDeckOfMovies } from "./server-requests/getDeckOfMovies";
import { onSwipe } from "./server-requests/onSwipe";
import { debounce } from "lodash";
import styles from "../../styles";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
const CARD_WIDTH = SCREEN_WIDTH * 0.8;
const CARD_HEIGHT = SCREEN_HEIGHT * 0.5;

const MovieDeck = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const position = new Animated.ValueXY();
  const opacity = useRef(new Animated.Value(1)).current;

  // use context to obtain the movie deck.
  const context = useContext(LandingPageContext);
  let movieDeck = context.movieDeck.current;

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      // Allow horizontal or vertical movement
      return Math.abs(gestureState.dx) > 5 || Math.abs(gestureState.dy) > 5;
    },
    onPanResponderMove: (evt, gestureState) => {
      position.setValue({ x: gestureState.dx, y: gestureState.dy });
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx > 120) {
        sendSwipeData(1);
        // Swipe right sendSwipeData(1)
        Animated.spring(position, {
          toValue: { x: 500, y: gestureState.dy },
          useNativeDriver: false,
        }).start(() => {
          setCurrentIndex((currentIndex + 1) % 10);
          position.setValue({ x: 0, y: 0 });
        });
      } else if (gestureState.dx < -120) {
        sendSwipeData(0);
        // Swipe left sendSwipeData(0)
        Animated.spring(position, {
          toValue: { x: -500, y: gestureState.dy },
          useNativeDriver: false,
        }).start(() => {
          setCurrentIndex((currentIndex + 1) % 10);
          position.setValue({ x: 0, y: 0 });
        });
      } else if (gestureState.dy < -200) {
        // Swipe up (dismiss) sendSwipeData(2)
        sendSwipeData(2);
        Animated.timing(position, {
          toValue: { x: 0, y: -200 },
          useNativeDriver: false,
        }).start(() => {
          setCurrentIndex((currentIndex + 1) % 10);
          position.setValue({ x: 0, y: 0 });
        });
      } else {
        // Return to original position
        Animated.spring(position, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      }
    },
  });

  const sendSwipeData = (swipeDirection) => {
    onSwipe(context, movieDeck[currentIndex].imdbid, swipeDirection);
    // on every swipe, send movieId and swipeDirection back to the server.
    // Here you would send the data to the backend, passing in the movie id and swipe direction (0 for left, 1 for right, 2 for up)
    if (currentIndex == 9) {
      getDeckOfMovies(context);
    }
  };

  const rotateCard = position.x.interpolate({
    inputRange: [-500, 0, 500],
    outputRange: ["-120deg", "0deg", "120deg"],
  });

  const swipeLeft = debounce(() => {
    Animated.timing(position, {
      toValue: { x: -500, y: 0 },
      duration: 500, // adjust duration as needed
      useNativeDriver: false,
    }).start(() => {
      setCurrentIndex((currentIndex + 1) % 10);
      position.setValue({ x: 0, y: 0 });
    });
    sendSwipeData(0);
  }, 300);

  const swipeRight = debounce(() => {
    Animated.timing(position, {
      toValue: { x: 500, y: 0 },
      duration: 500, // adjust duration as needed
      useNativeDriver: false,
    }).start(() => {
      setCurrentIndex((currentIndex + 1) % 10);
      position.setValue({ x: 0, y: 0 });
    });
    sendSwipeData(1);
  }, 300);

  const swipeUp = debounce(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(position, {
        toValue: { x: 0, y: -200 },
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setCurrentIndex(currentIndex + 1);
      position.setValue({ x: 0, y: 0 });
      opacity.setValue(1);
    });
    sendSwipeData(2);
  }, 300);

  const animatedStyle = {
    transform: [
      { rotate: rotateCard },
      {
        translateX: position.x.interpolate({
          inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
          outputRange: [-CARD_WIDTH / 2, 0, CARD_WIDTH / 2],
          extrapolate: "clamp",
        }),
      },
      {
        translateY: position.y.interpolate({
          inputRange: [-SCREEN_HEIGHT / 2, 0, SCREEN_HEIGHT / 2],
          outputRange: [-CARD_HEIGHT / 2, 0, CARD_HEIGHT / 2],
          extrapolate: "clamp",
        }),
      },
    ],
    opacity: Animated.add(position.x, position.y).interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [0, 1, 0],
      extrapolate: "clamp",
    }),
  };

  const renderCards = () => {
    return movieDeck
      .map((item, index) => {
        if (index < currentIndex) {
          return null;
        } else if (index === currentIndex) {
          return (
            <Animated.View key={item.id} style={[styles.cardStyle, animatedStyle]} {...panResponder.panHandlers}>
              <Image source={{ uri: item.url }} style={styles.deckImageStyle} resizeMode="cover" />
            </Animated.View>
          );
        } else {
          return (
            <Animated.View key={item.id} style={[styles.cardStyle]}>
              <Image source={{ uri: item.url }} style={styles.deckImageStyle} resizeMode="cover" />
            </Animated.View>
          );
        }
      })
      .reverse();
  };

  return (
    <View style={styles.deckContainer}>
      {renderCards()}
      <View style={{ position: "absolute", width: "100%", bottom: 0 }}>
        <TouchableOpacity onPress={swipeLeft} style={[styles.circleContainerLeft, styles.shadowProp]}>
          <Image
            source={{ uri: "https://cdn-icons-png.flaticon.com/512/2601/2601781.png" }}
            style={{ height: 35, width: 35, resizeMode: "contain" }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={swipeUp} style={[styles.circleContainerCenter, styles.shadowProp]}>
          <Image
            source={{ uri: "https://cdn-icons-png.flaticon.com/512/2601/2601780.png" }}
            style={{ height: 35, width: 35, resizeMode: "contain" }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={swipeRight} style={[styles.circleContainerRight, styles.shadowProp]}>
          <Image
            source={{ uri: "https://cdn-icons-png.flaticon.com/512/391/391175.png" }}
            style={{ height: 35, width: 35, resizeMode: "contain" }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MovieDeck;
