import React from "react";
import { TextInput, View } from 'react-native';
import styles from '../../styles.js';

const Input = ({
    className = styles.input_field,
    name,
    type,
    value,
    onChange,
    readonly = false,
}) => {
    return (
        <TextInput
            style={className} /*not sure how to take className from styles*/
            name={name}
            placeholder={name}
            value={value}
            onChangeText={onChange}
            editable={!readonly}
            type={type}
        />
    );
};

const ErrorAlert = ({ className, errorMsg }) => {
    return <View style={className}> {/*not sure how to take className from styles*/}
        <Text>{errorMsg}</Text>
    </View>;
};

export default { Input, ErrorAlert };