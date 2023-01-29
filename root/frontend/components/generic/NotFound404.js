import React from "react";
import { View, Text } from 'react-native';

const NotFound404 = () => {
    return (
        <View>
            <View style={[className]}>
                <Text style={[className]}>404 not found</Text>
                <Text>
                    Sorry :/ the resource you are looking for does not exist
                </Text>
            </View>
        </View>
    );
};

export default NotFound404;
