// App.js
import React, { useState, useEffect } from 'react';
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { supabase } from './supabase';
import LoginScreen from './Screens/LoginScreen';
import WorkoutLogScreen from './Screens/WorkoutLogScreen';
import CircleScreen from './Screens/CircleScreen';
import FriendsScreen from './Screens/FriendsScreen';
import AccountScreen from './Screens/AccountScreen';

import Navbar from './components/Navbar';

const Tab = createBottomTabNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [currentScreen, setCurrentScreen] = useState('Login'); // here we use this state string to control the current screen we are displaying

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Login':
        return <GluestackUIProvider mode="light"><LoginScreen setuser={setUser} /></GluestackUIProvider>;
      case 'WorkoutLog':
        return <GluestackUIProvider mode="light"><WorkoutLogScreen user={user}/></GluestackUIProvider>;
      case 'PowerCircle':
        return <GluestackUIProvider mode="light"><CircleScreen user={user}/></GluestackUIProvider>;
      case 'FriendsScreen':
        return <GluestackUIProvider mode="light"><FriendsScreen user={user} navigate={setCurrentScreen}/></GluestackUIProvider>;
      case 'Account':
        return <GluestackUIProvider mode="light"><AccountScreen user={user}/></GluestackUIProvider>;
      default:
        return <GluestackUIProvider mode="light"><WorkoutLogScreen user={user} /></GluestackUIProvider>;
    }
  };

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      const loggedInUser = session?.user || null;
      setUser(loggedInUser);

      if (loggedInUser) {
        setCurrentScreen('WorkoutLog');
      }
    });
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <GluestackUIProvider mode="light"><View style={styles.container}>
        <View style={styles.content}>
          {renderScreen()}
        </View>
        { user && 
        <Navbar navigate={setCurrentScreen}/>
        }
      </View></GluestackUIProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
