// components/CircleScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { supabase } from '../supabase';

export default AccountScreen = ({ user }) => {

  // fetch function will have to be changed (Maanav can help with this part)
  /*
  const fetchAccountInfo = async () => {
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
  };*/

  /*
  useEffect(() => {
    fetchFriendWorkouts();
  }, []);*/

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.heading}>Account Info</Text>
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
    paddingBottom: 80,
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
