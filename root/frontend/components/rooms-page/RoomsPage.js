import { SafeAreaView, View, Text } from "react-native";
import { Button } from "@react-native-material/core";
import Banner from "../generic/Banner";
import styles from "../../styles";

const RoomsPage = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.primaryContainer}>
      <Banner />
      <Text>This is the protected rooms page</Text>
      <Button
        title="Back to Login"
        onPress={() => navigation.navigate("Login")}
        style={styles.largeBtn}
      />
    </SafeAreaView>
  );
};
export default RoomsPage;
