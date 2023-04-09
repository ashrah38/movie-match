import { View, Image } from "react-native";
import styles from "../../styles";

const Banner = () => {
  const logo = require("../../assets/CinematchLogo.png");

  return (
    <View style={styles.banner}>
      <Image source={logo} style={styles.logo} />
    </View>
  );
};
export default Banner;
