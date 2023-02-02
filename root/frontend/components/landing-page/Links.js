import React from "react";
import { Linking, Text, View } from "react-native";
import styles from '../../styles.js';

const PasswordLink = () => {
    return (
        <View style={styles.forgot_password_link}>
            <Text
                style={styles.links, { color: "blue" }}
                onPress={() => Linking.openURL("/forgot-password")}
            >
                Forgot Password?
            </Text>
        </View>
    );
};

const NewAccountLink = () => {
    return (
        <View style={styles.create_account_container}>
            <Text>Don't have an account? </Text>
            <Text style={{ color: "blue" }} onPress={() => Linking.openURL("/create-new")}>
                Create New
            </Text>
        </View>
    );
};

export { PasswordLink, NewAccountLink };



