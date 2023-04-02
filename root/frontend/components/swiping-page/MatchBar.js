import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../../styles";

const MatchBar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.matchBarContainer}>
      <TouchableOpacity>
        <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/921/921347.png" }} style={styles.matchBarIcon} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/6009/6009398.png" }} style={styles.matchBarIcon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("MatchScreen")}>
        <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/1029/1029132.png" }} style={styles.matchBarIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default MatchBar;
