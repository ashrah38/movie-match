import React from "react";
import { TextInput, View } from 'react-native';

const Input = ({
    className = "input-field",
    name,
    type,
    value,
    onChange,
    readonly = false,
}) => {
    return (
        <TextInput
            style={[className]}
            name={name}
            placeholder={name}
            value={value}
            onChangeText={onChange}
            editable={!readonly}
        />
    );
};

const ErrorAlert = ({ className, errorMsg }) => {
    return <View style={[className]}>
        <Text>{errorMsg}</Text>
    </View>;
};