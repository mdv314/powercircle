import React, { useState } from "react";
import { Icon } from "react-native-paper";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { supabase } from "../supabase";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Heading } from "@/components/ui/heading";
import { Button, ButtonText } from "@/components/ui/button";

export default function LoginScreen({ setUser, navigate }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    } else {
      setUser(data.user);
      navigate("WorkoutLog"); // Navigate to the Workout Log screen
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        {/* Heading */}
        <Heading style={styles.heading}>Login</Heading>

        {/* Email Input */}
        <Input variant="rounded" size="xl" style={styles.input}>
          <InputField
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
          />
        </Input>

        {/* Password Input */}
        <Input variant="rounded" size="xl" style={styles.input}>
          <InputField
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry={!isPasswordVisible} // Toggle visibility
          />
          <InputSlot>
            <InputIcon onPress={togglePasswordVisibility}>
              {isPasswordVisible ? (
                <Icon source="eye-outline" size={24} />
              ) : (
                <Icon source="eye-off-outline" size={24} />
              )}
            </InputIcon>
          </InputSlot>
        </Input>

        {/* Error Message */}
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>
      {/* Login Button */}
      <View>
        <Button size="md" variant="solid" action="primary" onPress={handleLogin}>
          <ButtonText>Login</ButtonText>
        </Button>
        <Button size="md" variant="solid" action="primary" onPress={() => navigate('Signup')}>
          <ButtonText>Don't have an account? Signup here!</ButtonText>
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Centers content vertically
    alignItems: "center", // Centers content horizontally
    padding: 24,
    backgroundColor: "#f5f5f5", // Light background for better visibility
  },
  innerContainer: {
    width: "100%", // Ensures full-width for inputs
    maxWidth: 400, // Constrains width for larger screens
    alignItems: "center", // Aligns content horizontally
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center", // Centers the heading
    color: "#333",
  },
  input: {
    width: "100%", // Ensures the input takes full available width
    marginBottom: 16,
  },
  error: {
    color: "red",
    marginBottom: 16,
    textAlign: "center", // Centers error messages
  },
});
