import React, { useState, useRef } from "react";
import { View, StyleSheet, PanResponder, Animated, TouchableOpacity, Image } from "react-native";
import { Dimensions } from "react-native";
import styles from "../../styles";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
const CARD_WIDTH = SCREEN_WIDTH * 0.8;
const CARD_HEIGHT = SCREEN_HEIGHT * 0.5;

const DATA = [
  { id: 1, text: "Card 1", url: "https://m.media-amazon.com/images/I/71niXI3lxlL._AC_SY679_.jpg" },
  { id: 2, text: "Card 2", url: "https://i.etsystatic.com/13669063/r/il/0b9f6f/2963422074/il_570xN.2963422074_2p88.jpg" },
  { id: 3, text: "Card 3", url: "https://m.media-amazon.com/images/I/61a03Zq9oRL._AC_.jpg" },
  { id: 4, text: "Card 4", url: "https://i.ebayimg.com/images/g/4XAAAOSwKOVitgWd/s-l1600.jpg" },
];

const MovieDeck = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const position = new Animated.ValueXY();
  const opacity = useRef(new Animated.Value(1)).current;

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
        sendSwipeDataDemo(1);
        // Swipe right sendSwipeData(1)
        Animated.spring(position, {
          toValue: { x: 500, y: gestureState.dy },
          useNativeDriver: false,
        }).start(() => {
          setCurrentIndex(currentIndex + 1);
          position.setValue({ x: 0, y: 0 });
        });
      } else if (gestureState.dx < -120) {
        sendSwipeDataDemo(0);
        // Swipe left sendSwipeData(0)
        Animated.spring(position, {
          toValue: { x: -500, y: gestureState.dy },
          useNativeDriver: false,
        }).start(() => {
          setCurrentIndex(currentIndex + 1);
          position.setValue({ x: 0, y: 0 });
        });
      } else if (gestureState.dy < -200) {
        // Swipe up (dismiss) sendSwipeData(2)
        sendSwipeDataDemo(2);
        Animated.timing(position, {
          toValue: { x: 0, y: -200 },
          useNativeDriver: false,
        }).start(() => {
          setCurrentIndex(currentIndex + 1);
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
    // Here you would send the data to the backend, passing in the movie id and swipe direction (0 for left, 1 for right)
    console.log("Sending swipe data:", currentCard.id, swipeDirection);
  };
  const sendSwipeDataDemo = (swipeDirection) => {
    // Here you would send the data to the backend, passing in the movie id and swipe direction (0 for left, 1 for right)
    console.log("Direction: ", swipeDirection);
  };

  const rotateCard = position.x.interpolate({
    inputRange: [-500, 0, 500],
    outputRange: ["-120deg", "0deg", "120deg"],
  });

  const swipeLeft = () => {
    sendSwipeDataDemo(0);
    Animated.timing(position, {
      toValue: { x: -500, y: 0 },
      duration: 500, // adjust duration as needed
      useNativeDriver: false,
    }).start(() => {
      setCurrentIndex(currentIndex + 1);
      position.setValue({ x: 0, y: 0 });
    });
  };

  const swipeRight = () => {
    sendSwipeDataDemo(1);
    Animated.timing(position, {
      toValue: { x: 500, y: 0 },
      duration: 500, // adjust duration as needed
      useNativeDriver: false,
    }).start(() => {
      setCurrentIndex(currentIndex + 1);
      position.setValue({ x: 0, y: 0 });
    });
  };

  const swipeUp = () => {
    sendSwipeDataDemo(2);
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
  };

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
    return DATA.map((item, index) => {
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
    }).reverse();
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
