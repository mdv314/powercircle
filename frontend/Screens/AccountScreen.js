import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, Button } from 'react-native';
import { supabase } from '../supabase';

export default function HistoryScreen({ user, navigate }) {
  const [userWorkouts, setUserWorkouts] = useState([]);

  const fetchUserWorkouts = async () => {
    // Fetch workout logs for the logged-in user
    const { data, error } = await supabase
      .from('workout_logs')
      .select('user_id, exercises, created_at')
      .eq('user_id', user.id) // Fetch for the logged-in user
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching user workouts:', error);
    } else {
      setUserWorkouts(data);
    }
  };

  useEffect(() => {
    fetchUserWorkouts();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.heading}>Your Workout History</Text>
        <Button title="Go to Friends" onPress={() => navigate('CircleScreen')} />
        <FlatList
          data={userWorkouts}
          keyExtractor={(item, index) => `${item.user_id}-${index}`}
          renderItem={({ item }) => (
            <View style={styles.card}>
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
  exercise: {
    fontSize: 14,
    marginTop: 5,
  },
});
