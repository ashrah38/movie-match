import { View, SafeAreaView } from "react-native";
import LandingPage from "./components/landing-page/LandingPage";
import styles from "./styles";

export default function App() {
  return (
    <SafeAreaView style={styles.primaryContainer}>
      <View style={styles.secondaryContainer}>
        <LandingPage />
      </View>
    </SafeAreaView>
  );
}
