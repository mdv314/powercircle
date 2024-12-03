import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, MD3Colors } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const Navbar = ({ navigation }) => {
  return (
    <SafeAreaView edges={['bottom']} style={styles.navbar}>
      <TouchableOpacity onPress={() => navigation.navigate('Workout Log')}>
        <Icon source="history" color={MD3Colors.error50} size={50} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Circle')}>
        <Icon source="circle-double" color={MD3Colors.error50} size={50} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Workout Log')}>
        <Icon source="account" color={MD3Colors.error50} size={50} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  navItem: {
    fontSize: 16,
    color: '#007BFF',
  },

});

export default Navbar;
