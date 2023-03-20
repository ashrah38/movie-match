import { useState, useRef, useEffect } from "react";
import { View, Text, TouchableWithoutFeedback, Animated } from "react-native";
import { categoriesArray } from "./CategoriesArray";
import { Button } from "@react-native-material/core";
import styles from "../../styles";
import { Input, ErrorAlert } from "../generic/FormComponents";
import ButtonContainer from "../generic/ButtonContainer";
import Icon from "react-native-vector-icons/FontAwesome";

const StartDisplay = ({ chooseMode, startButtonHandler }) => {
  const [mode, onChangeMode] = useState();
  const [variantRF, onChangeVariantRF] = useState("contained");
  const [variantLB, onChangeVariantLB] = useState("outlined");
  const scaleValue = useRef(new Animated.Value(1)).current;

  const onPressHandlerMode = (chosenMode) => {
    //assign chosen mode to mode
    chooseMode(chosenMode);
    //turn on the correct button
    if (chosenMode == "rapidfire") {
      onChangeVariantRF("contained");
      onChangeVariantLB("outlined");
    } else {
      onChangeVariantRF("outlined");
      onChangeVariantLB("contained");
    }
  };

  const animatedStyle = {
    transform: [{ scale: scaleValue }],
  };

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 0.9,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View>
      <View style={styles.StartDisplayContainer}>
        <ButtonContainer style={styles.btnContainerMode}>
          <Button
            title="Rapid Fire"
            variant={variantRF}
            onPress={() => {
              onPressHandlerMode("rapidfire");
            }}
          />
          <Button
            title="Laid Back"
            variant={variantLB}
            onPress={() => {
              onPressHandlerMode("laidback");
            }}
          />
        </ButtonContainer>
        <Animated.View style={[{ marginTop: 50 }, animatedStyle]}>
          <Icon.Button
            name="play-circle-o"
            color="#6200ee"
            size={200}
            backgroundColor="#f6f6f6"
            borderRadius={100}
            style={styles.startBtn}
            onPress={() => {
              startButtonHandler();
            }}
          ></Icon.Button>
        </Animated.View>
      </View>
    </View>
  );
};
export default StartDisplay;
