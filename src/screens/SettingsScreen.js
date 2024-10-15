import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';

import useNfcWithStorage from '../services/LocalStorage/useNfcWithStorage'; // Importa el nuevo hook

import { useNfc } from '../context/NfcContext'; // Importa el contexto
import AddMedicationForm from '../components/MedManagement/AddMedicationForm';
import ScanHistory from '../components/ScanHistory/ScanHistory';
import MedicationHistory from '../components/MedManagement/MedicationHistory';



const SettingsScreen = () => {

  return (
    <View style={styles.container}>
      {/* para el formularios */}
      <AddMedicationForm />

      <MedicationHistory />

      {/* <ScanHistory /> */}
    </View>







  );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#f0f0f0',
  },
});

export default SettingsScreen;


