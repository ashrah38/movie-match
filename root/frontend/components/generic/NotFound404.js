import React from "react";
import { View, Text } from 'react-native';
import styles from '../../styles.js';

const NotFound404 = () => {
    return (
        <View>
            <View style={styles.title}>
                <Text style={styles.name}>404 not found</Text>
                <Text style={styles.body}>
                    Sorry :/ the resource you are looking for does not exist
                </Text>
            </View>
        </View>
    );
};

export default NotFound404;
