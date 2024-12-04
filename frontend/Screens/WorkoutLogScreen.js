// components/WorkoutLogScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, FlatList, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { supabase } from '../supabase';

export default function WorkoutLogScreen({ navigation, user }) {
  const [exercises, setExercises] = useState([]);
  const [currentExercise, setCurrentExercise] = useState('');
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');

  const addExercise = () => {
    if (currentExercise.trim() === '') {
      Alert.alert('Error', 'Please enter an exercise name.');
      return;
    }
    const newExercise = { name: currentExercise, sets: [] };
    setExercises([...exercises, newExercise]);
    setCurrentExercise('');
  };

  const addSet = (index) => {
    if (!weight || !reps) {
      Alert.alert('Error', 'Please enter weight and reps.');
      return;
    }
    const newSet = { weight: parseFloat(weight), reps: parseInt(reps) };
    const updatedExercises = [...exercises];
    updatedExercises[index].sets.push(newSet);
    setExercises(updatedExercises);
    setWeight('');
    setReps('');
  };

  const finishWorkout = async () => {
    if (exercises.length === 0) {
      Alert.alert('Error', 'Add at least one exercise.');
      return;
    }
    const { error } = await supabase.from('workout_logs').insert({
      user_id: user.id,
      exercises,
      created_at: new Date(),
    });
    if (error){
        Alert.alert('Error', 'Failed to save workout.');
        console.log("Error: ", error)
    }
        
    else {
      Alert.alert('Success', 'Workout logged.');
      setExercises([]);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <TextInput
        placeholder="Enter exercise name"
        value={currentExercise}
        onChangeText={setCurrentExercise}
        style={styles.input}
      />
      <Button title="Add Exercise" onPress={addExercise} />
      <FlatList
        data={exercises}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View>
            <Text style={styles.exerciseName}>{item.name}</Text>
            <FlatList
              data={item.sets}
              keyExtractor={(set, i) => i.toString()}
              renderItem={({ item: set, i }) => (
                <Text style={styles.set}>
                  Set {i + 1}: {set.weight}kg x {set.reps} reps
                </Text>
              )}
            />
            <TextInput
              placeholder="Weight"
              value={weight}
              onChangeText={setWeight}
              style={styles.input}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="Reps"
              value={reps}
              onChangeText={setReps}
              style={styles.input}
              keyboardType="numeric"
            />
            <Button title="Add Set" onPress={() => addSet(index)} />
          </View>
        )}
      />
      <Button title="Finish Workout" onPress={finishWorkout} />
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
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  set: {
    fontSize: 16,
  },
});
