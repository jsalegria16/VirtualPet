import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PetComponent from '../components/pet/PetComponent';
import UsersProgressComponent from '../components/users/UsersProgressComponent';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <PetComponent />
      <UsersProgressComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
  },
});

export default HomeScreen;