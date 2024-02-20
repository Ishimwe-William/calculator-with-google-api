import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { Provider as PaperProvider, DefaultTheme, MD2DarkTheme, Switch } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Drawers from "./src/Drawer";

export default function App() {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const getTheme = async () => {
        try {
            const theme = await AsyncStorage.getItem('theme');
            return theme === 'dark';
        } catch (error) {
            console.log('error', error);
            return false;
        }
    };

    useEffect(() => {
        getTheme()
            .then(res => {
                setIsDarkTheme(res);
            })
            .catch(err => {
                console.log('error', err);
            });
    }, []);

    const onChangeHandler = async (value) => {
        setIsDarkTheme(value);
        await AsyncStorage.setItem('theme', value ? 'dark' : 'light');
    };

    const theme = isDarkTheme ? MD2DarkTheme : DefaultTheme;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
            padding: 16, // Adjust the padding to your liking
        },
        switchContainer: {
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginBottom: 16, // Adjust the margin to your liking
        },
    });

    return (
        <PaperProvider theme={theme}>
            <NavigationContainer theme={theme}>
                <View style={styles.container}>
                    <View style={styles.switchContainer}>
                        <Switch value={isDarkTheme} onValueChange={onChangeHandler} />
                    </View>
                    <Drawers />
                    <StatusBar style="auto" />
                </View>
            </NavigationContainer>
        </PaperProvider>
    );
}
