// components/FriendsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert, StyleSheet,  } from 'react-native';
import { supabase } from '../supabase';
import Navbar from '../components/Navbar';

export default function FriendsScreen({ user }) {
  const [friendEmail, setFriendEmail] = useState('');
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    fetchFriends();
  }, []);

  const fetchFriends = async () => {
    const { data, error } = await supabase
      .from('friends')
      .select(`
        friend_id,
        friend_email:auth_users(email)
      `)
      .eq('user_id', user.id);
  
    if (error) {
      console.error('Error fetching friends:', error);
      return;
    }
  
    setFriends(data);
  };
  
  const addFriend = async () => {
    console.log("Button Works");
    try{
    if (!friendEmail.trim()) {
      Alert.alert('Error', 'Please enter a valid email.');
      return;
    }

    // Look up the friend's user_id by email in the auth.users table
    // const { data: userData, error: userError } = await supabase
    //   .from('auth.users')
    //   .select('id')
    //   .eq('email', friendEmail);

    const { data: userData, error: userError } = await supabase.rpc('get_user_id', { email: friendEmail });
    console.log("User Data:", userData);
    console.log("User Error:", userError);

    if (userError) {
      Alert.alert('Error', 'Email not found.');
      console.error('Error fetching user by email:', userError);
      return;
    }

    
    const friendId = userData?.[0]?.id;

    if (!friendId) {
      console.error("Friend ID is undefined or null.");
      console.log(friendEmail);
      Alert.alert('Error', 'Failed to find user.');
      return;
    }

    console.log("User ID: ", user.id)
    console.log("Friend ID: ", friendId)
    // Check if the friendship already exists
    const { data: existingFriend, error: existingError } = await supabase
      .from('friends')
      .select('*')
      .eq('user_id', user.id)
      .eq('friend_id', friendId);

    if (existingFriend && existingFriend.length > 0) {
      Alert.alert('Error', 'This user is already your friend.');
      return;
    }
    
    if (existingError && existingError.code !== 'PGRST116') {
      console.error('Error checking existing friend:', existingError);
      return;
    }

    // Add the new friend
    const { error: insertError } = await supabase
      .from('friends')
      .insert([{ user_id: user.id, friend_id: friendId }]);

    if (insertError) {
      Alert.alert('Error', 'Failed to add friend.');
      console.error('Error adding friend:', insertError);
      return;
    }

    

    Alert.alert('Success', 'Friend added!');
    setFriendEmail('');
    fetchFriends();
  }
  catch (err){
    console.error("random ahh error occurred in addFriend: ", err);
  }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Friends</Text>
      <FlatList
        data={friends}
        keyExtractor={(item) => item.friend_id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.friendItem}>{item.auth_users.email}</Text>
        )}
      />
      <TextInput
        placeholder="Enter friend's email"
        value={friendEmail}
        onChangeText={setFriendEmail}
        style={styles.input}
      />
      <Button title="Add Friend" onPress={addFriend} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  friendItem: {
    fontSize: 16,
    paddingVertical: 5,
  },
});
