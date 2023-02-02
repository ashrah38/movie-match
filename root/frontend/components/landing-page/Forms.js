import React, { useState } from "react";
import { Input, ErrorAlert } from "../generic/FormComponents";
import { Button, ButtonContainer } from "../generic/Button";
import { verifyInputFormat } from "../../helpers/verifyInputFormat";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from '../../styles.js';

const ForgotPasswordForm = ({ className }) => {
    const [formData, setFormData] = useState({ email: "" });
    const [errorMsg, setErrorMsg] = useState("");
    const [errorMsgClass, setErrorMsgClass] = useState("error-alert hide");

    const onSubmitHandler = (formData) => {
        const { email } = formData;
        let formatVerified = false;

        if (verifyInputFormat(email, "Email") === false) {
            setErrorMsg("Invalid email format");
            setErrorMsgClass("error-alert");
            return;
        } else {
            formatVerified = true;
        }

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: email }),
        };
        if (formatVerified) {
            fetch("http://localhost:4000/forgot-password", requestOptions).then(
                (response) => { }
            );
        }
    };
    return (
        <View>
            {/*<Text style={errorMsgClass}>{errorMsg}</Text>
            <TextInput
                placeholder="Email"
                keyboardType="email-address"
                value={formData.email}
                onChangeText={(text) => {
                    setFormData({ email: text });
                }}
            />*/}

            <ErrorAlert style={errorMsgClass} errorMsg={errorMsg} /> {/* not sure if errorMsgClass will work like this*/}
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="ios-arrow-back" size={32} color="#000000" />
            </TouchableOpacity>
            <Input
                name="Email"
                type="Email"
                value={formData.email}
                onChange={(e) => {
                    setFormData({ email: e.target.value });
                }}
            />

            <ButtonContainer style={styles.btn_container}>
                <Button
                    style={styles.large_btn}
                    buttonText="Send reset link"
                    onSubmit={() => onSubmitHandler(formData)}
                />
            </ButtonContainer>
        </View>
    );
};

export {
    
    ForgotPasswordForm
  
};
