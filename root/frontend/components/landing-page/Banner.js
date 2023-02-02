import React from "react";
import { View, Text } from 'react-native';
import styles from '../../styles.js';

const Banner = () => {
    return (
        <View style={styles.title}>
            <Text>Movie Match</Text>
        </View>
    );
};

export default Banner;