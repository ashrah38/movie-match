import { View } from "react-native";
import Banner from "../generic/Banner";
import LoginForm from "./LoginForm";
import NewAccountForm from "./CreateAccountForm";
import styles from "../../styles";

const LandingPage = () => {
  return (
    <View>
      <Banner />
      <View style={styles.formContainer}>
        <NewAccountForm />
      </View>
    </View>
  );
};
export default LandingPage;
