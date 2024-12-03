// App.js
import React, { useState, useEffect } from 'react';
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { supabase } from './supabase';
import LoginScreen from './components/LoginScreen';
import WorkoutLogScreen from './components/WorkoutLogScreen';
import CircleScreen from './components/CircleScreen';
import FriendsScreen from './components/FriendsScreen';

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <Stack.Screen name="Login">
            {(props) => <LoginScreen {...props} setUser={setUser} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Workout Log">
              {(props) => <WorkoutLogScreen {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen
              name="Circle"
              options={({ navigation }) => ({
                headerRight: () => (
                  <Button
                    title="Friends"
                    onPress={() => navigation.navigate('Friends')}
                  />
                ),
              })}
            >
              {(props) => <CircleScreen {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen name="Friends">
              {(props) => <FriendsScreen {...props} user={user} />}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
