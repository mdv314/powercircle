// components/Navbar.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, MD3Colors } from 'react-native-paper';

const Navbar = ({ navigation }) => {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => navigation.navigate('Workout Log')}>
        <Icon
          source="history"
          color={MD3Colors.error50}
          size={50}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Workout Log')}>
        <Icon
          source="circle-double"
          color={MD3Colors.error50}
          size={50}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Workout Log')}>
        <Icon
          source="account"
          color={MD3Colors.error50}
          size={50}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
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

