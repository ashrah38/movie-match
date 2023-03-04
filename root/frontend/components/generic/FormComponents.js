import { TextInput, View, Text } from "react-native";
import styles from "../../styles";
const Input = ({ name, value, onChangeText, secureTextEntry }) => {
  return (
    <TextInput
      style={styles.inputField}
      name={name}
      placeholder={name}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
    />
  );
};

const ErrorAlert = ({ style, errorMsg }) => {
  return (
    <View style={styles.errorAlert}>
      <Text>{errorMsg}</Text>
    </View>
  );
};

export { Input, ErrorAlert };
