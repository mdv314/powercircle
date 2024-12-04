import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, MD3Colors } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BRAND_COLORS } from '../constants';

const Navbar = ({ navigate }) => {
  const iconSize = 38;
  return (
    <SafeAreaView edges={['bottom']} style={styles.navbar}>
      <TouchableOpacity onPress={() => navigate('WorkoutLog')}>
        <Icon source="history" color={BRAND_COLORS.blue} size={iconSize} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate('PowerCircle')}>
        <Icon source="circle-double" color={BRAND_COLORS.blue} size={iconSize} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate('Account')}>
        <Icon source="account" color={BRAND_COLORS.blue} size={iconSize} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});

export default Navbar;
