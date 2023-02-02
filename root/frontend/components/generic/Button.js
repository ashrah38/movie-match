import React from "react";
import { TouchableOpacity, View, Button } from 'react-native';
import styles from '../../styles.js';

// use TouchableOpacity if button doesn't work
const Button = ({ style, buttonText, onSubmit }) => {
    return (
        <Button style={style} onPress={onSubmit}>  {/*not sure how to take className from styles*/}
            <Text>{buttonText}</Text>
        </Button>
    );
};

const ButtonContainer = ({ className, children }) => {
    return <View style={[className]}>{children}</View>;
};

export default { Button, ButtonContainer };
