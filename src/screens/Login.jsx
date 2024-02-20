import React, { useEffect, useState } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
    const [userInfo, setUserInfo] = useState('');
    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: '434369619375-g8j6ihrahl8gci3fkhnjvcjlva4dia3t.apps.googleusercontent.com',
        webClientId: '434369619375-aucnq13kp9s32iu3rijv8ak34dht5c3v.apps.googleusercontent.com',
    });

    useEffect(() => {
        handleSignInWithGoogle();
    }, [response]);

    async function handleSignInWithGoogle() {
        const user = await AsyncStorage.getItem('@user');
        if (!user && response?.type === 'success') {
            await getUserInfo(response.authentication.accessToken);
        } else {
            setUserInfo(JSON.parse(user));
        }
    }

    const getUserInfo = async (token) => {
        if (!token) return;
        try {
            const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const user = await response.json();
            await AsyncStorage.setItem('@user', JSON.stringify(user));
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    };

    const handleDeleteLocalStorage = async () => {
        await AsyncStorage.removeItem('@user');
        setUserInfo(''); // Clear user info in the component state
    };

    return (
        <View style={styles.container}>
            <Text>{JSON.stringify(userInfo)}</Text>
            <Button title="Sign in with Google" onPress={promptAsync} />
            <Button title="Delete local storage" onPress={handleDeleteLocalStorage} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
