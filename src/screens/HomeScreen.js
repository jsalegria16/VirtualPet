import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PetComponent from '../components/pet/PetComponent';
import UsersProgressComponent from '../components/users/UsersProgressComponent';
import { useNfc } from '../context/NfcContext';

const HomeScreen = ({ navigation }) => {
  const { currentRoleUserId, currentRoleName, userId } = useNfc();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {currentRoleUserId === userId
          ? `¡Hoy eres el recordador ${currentRoleName}!`
          : `El rol de recordador pertenece a: ${currentRoleName}`}
      </Text>
      <PetComponent />
      <UsersProgressComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff'
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginTop: 0,
    padding: 0
  },
});

export default HomeScreen;