// Tabs.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from './screens/Home';
import SettingsScreen from './screens/Settings';
import PreferenceScreen from "./screens/Preferences";

const Tab = createBottomTabNavigator();

const Tabs = ({ route }) => {
    const initialTab = route.name === 'Settings' ? 'SettingsTab' : route.name === 'Preferences' ? 'PreferencesTab' : 'HomeTab';

    return (
        <Tab.Navigator initialRouteName={initialTab}>
            <Tab.Screen
                name="HomeTab"
                component={HomeScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="home" color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="SettingsTab"
                component={SettingsScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Settings',
                    tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="cog" color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="PreferencesTab"
                component={PreferenceScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Preferences',
                    tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="star" color={color} size={size} />,
                }}
            />
        </Tab.Navigator>
    );
};

export default Tabs;
