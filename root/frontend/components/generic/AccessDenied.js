import React from "react";
import { View } from "react-native";

const AccessDenied = () => {
    return (
        <View>
            <View style={styles.title}>
                <View style={styles.name}>Access Denied</View>
            </View>
        </View>
    );
};

const styles = {
    title: {},
    name: {}
};

export default AccessDenied;
