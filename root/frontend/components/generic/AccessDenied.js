import React from "react";
import { View } from "react-native";
import styles from '../../styles.js';

const AccessDenied = () => {
    return (
        <View>
            <View style={styles.title}>
                <View style={styles.name}>Access Denied</View>
            </View>
        </View>
    );
};

export default AccessDenied;
