// App.js
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider, DefaultTheme as PaperDefaultTheme } from "react-native-paper";
import { AuthProvider } from "./Screens/AuthContext";
import { AntDesign } from '@expo/vector-icons';


import Login from './Screens/Login';
import Scan from './Screens/Scan';


const theme = {
  ...PaperDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    primary: "#A52A2A", 
    background: "#FFFFFF",
    surface: "#FFFFFF",
    accent: "#A52A2A",
    text: "#fff",
  },
  dark: false,
};


const Tab = createBottomTabNavigator();



const MyTabs = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={{
      tabBarActiveTintColor: "white",
      tabBarInactiveTintColor: "black",
      tabBarStyle: { backgroundColor: "#A52A2A" },
      tabBarIcon: ({ color, size, focused }) => {
        let iconColor = focused ? "white" : "black";
        let borderColor = focused ? "#FFF" : "transparent";

        return (
          <PaperProvider theme={PaperDefaultTheme}>
            <AntDesign name={getIconName(route.name)} size={size} color={iconColor} />
          </PaperProvider>
        );
      },
    }}
  >
    <Tab.Screen
      name="Scan"
      component={Scan}
      options={{
        headerStyle: { backgroundColor: "#A52A2A" },
        tabBarIcon: ({ color, size }) => <AntDesign name="home" size={size} color={color} />,
      }}
    />
    <Tab.Screen
      name="Login"
      component={Login}
      options={{
        title: "Iniciar sesión",
        headerStyle: { backgroundColor: "#A52A2A" },
        tabBarIcon: ({ color, size }) => <AntDesign name="user" size={size} color={color} />,
      }}
    />
  </Tab.Navigator>
);


const App = () => {
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <NavigationContainer theme={theme}>
          <MyTabs />
        </NavigationContainer>
      </AuthProvider>
      <StatusBar style="light" />
    </PaperProvider>
  );
};

export default App;
