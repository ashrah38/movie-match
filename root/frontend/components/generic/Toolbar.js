import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import styles from "../../styles";
import { useNavigation } from "@react-navigation/native";

const Toolbar = () => {
  const navigation = useNavigation();

  const onBackHandler = (navigation) => {
    navigation.goBack(); // navigate to the previous screen
  };

  const onLogoutHandler = (navigation) => {
    navigation.goBack(); // navigate to the previous screen
  };

  return (
    <View style={styles.toolbarContainer}>
      <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }} onPress={() => onBackHandler(navigation)}>
        <AntDesign name="back" size={20} color="black" />
        <Text style={{ marginLeft: 5, fontWeight: "bold" }}>Back</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }}>
        <AntDesign name="logout" size={20} color="black" />
        <Text style={{ marginLeft: 5, fontWeight: "bold" }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Toolbar;
