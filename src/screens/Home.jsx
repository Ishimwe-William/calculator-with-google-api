import {useTheme} from '@react-navigation/native';
import React from 'react';
import Login from "./Login";
import ConnectionStatus from "../utils/BroadcastReceiver";

const HomeScreen = () => {
    const colors = useTheme().colors;

    return (
            <Login/>
    );
};

export default HomeScreen;
