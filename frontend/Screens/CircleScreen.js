// components/CircleScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, Button} from 'react-native';
import { supabase } from '../supabase';
import Navbar from '../components/Navbar';
import { Ionicons } from '@expo/vector-icons';

export default function CircleScreen({ user, navigate }) {
  const [friendWorkouts, setFriendWorkouts] = useState([]);

  const fetchFriendWorkouts = async () => {
    const { data, error } = await supabase
      .from('workout_logs')
      .select(`
        user_id,
        exercises,
        created_at,
        users (email)
      `)
      .in('user_id',
        supabase
          .from('friends')
          .select('friend_id')
          .eq('user_id', user.id)
          .eq('status', 'accepted')
      )
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching friend workouts:', error);
    } else {
      setFriendWorkouts(data);
    }
  };

  useEffect(() => {
    fetchFriendWorkouts();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <Text style={styles.heading}>Your Circle</Text>
      <Button title="Add Friend" onPress = {() => navigate('FriendsScreen')}/>
      <FlatList
        data={friendWorkouts}
        keyExtractor={(item, index) => `${item.user_id}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.friendEmail}>{item.users.email}</Text>
            <Text>{new Date(item.created_at).toLocaleDateString()}</Text>
            <FlatList
              data={item.exercises}
              keyExtractor={(exercise, idx) => `${exercise.name}-${idx}`}
              renderItem={({ item: exercise }) => (
                <Text style={styles.exercise}>
                  {exercise.name}: {exercise.sets.length} sets
                </Text>
              )}
            />
          </View>
        )}
      />
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 80, // Ensure space for the Navbar
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  friendEmail: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  exercise: {
    fontSize: 14,
    marginTop: 5,
  },
});