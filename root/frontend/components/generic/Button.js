import React from "react";
import { TouchableOpacity, View, Button } from 'react-native';

// use TouchableOpacity if button doesn't work
const Button = ({ className, buttonText, onSubmit }) => {
    return (
        <Button style={[className]} onPress={onSubmit}>
            <Text>{buttonText}</Text>
        </Button>
    );
};

const ButtonContainer = ({ className, children }) => {
    return <View style={[className]}>{children}</View>;
};

export { Button, ButtonContainer };
