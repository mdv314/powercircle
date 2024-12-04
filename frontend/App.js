// App.js
import React, { useState, useEffect } from 'react';
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { supabase } from './supabase';
import LoginScreen from './Screens/LoginScreen';
import SignupScreen from './Screens/SignupScreen';
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
        return <LoginScreen setuser={setUser} navigate={setCurrentScreen}/>;
      case 'Signup':
        return <SignupScreen setuser={setUser} navigate={setCurrentScreen}/>;
      case 'WorkoutLog':
        return <WorkoutLogScreen user={user}/>;
      case 'PowerCircle':
        return <CircleScreen user={user} navigate={setCurrentScreen}/>;
      case 'FriendsScreen':
        return <FriendsScreen user={user} navigate={setCurrentScreen}/>;
      case 'Account':
        return <AccountScreen user={user}/>;
      default:
        return <WorkoutLogScreen user={user} />;
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
