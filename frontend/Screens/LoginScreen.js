import React, { useState } from 'react';
import { Icon } from 'react-native-paper';
import { View, TextInput, Button, Text, StyleSheet, SafeAreaView } from 'react-native';
import { supabase } from '../supabase';
import { Input, InputIcon, InputSlot } from "@/components/ui/input"

export default function LoginScreen({ setUser, navigate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in both fields.');
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    } else {
      setUser(data.user);
      navigation.navigate('Workout Log'); // Navigate to the Workout Log screen
    }
  };

  const togglePasswordVisibility = () => {
    if(isPasswordVisible) {
      setIsPasswordVisible(false)
    }
    else {
      setIsPasswordVisible(true)
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.login}>
          <Input
            value={email}
            onChangeText={setEmail}
            placeholder="Username"
            variabt="rounded"
          />
          <Input
            value={email}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry={!isPasswordVisible} 
          >
            <InputSlot>
              <InputIcon onPress={togglePasswordVisibility}>
                {isPasswordVisible ? <Icon source="eye-outline" size={24}/> : <Icon source="eye-off-outline" size={24}/>}
              </InputIcon>
            </InputSlot>
          </Input>
        </View>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Button title="Login" onPress={() => navigate('WorkoutLog')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  login: {
    flex: 1,
    columnGap: 25
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});
