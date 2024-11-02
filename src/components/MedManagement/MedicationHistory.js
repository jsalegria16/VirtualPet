import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';


import { useNfc } from '../../context/NfcContext'; // Importa el contexto

const MedicationHistory = () => {

  const { loadMedRegiment, medications } = useNfc(); // Cotexto // Utiliza el hook personalizado para manejar NFC y almacenamiento

  useEffect(() => {
    loadMedRegiment();
  }, []);

  return (
    <View style={styles.petContainer}>
      <Text style={styles.historyTitle}>Lista de medicamentos</Text>
      <ScrollView style={styles.scrollViewHistory}>
        <View style={styles.historyContainer}>
          {medications.length > 0 ? (
            medications.map((item, index) => (
              <View key={index} style={styles.historyItem}>
                <Text style={styles.historyText}>ID: {item.name}</Text>
                <Text style={styles.historyText}>Fecha: {item.times}</Text>
              </View>
            ))
          ) : (
            <>
              <Text style={styles.historyText}>No medicamentos registrados.</Text>
            </>

          )}
        </View>
      </ScrollView>
    </View>
  );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  petContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    margi: 5,
    borderRadius: 10,
    padding: 0,
    paddingLeft: 10

  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  scrollViewHistory: {
    maxHeight: 200, // Establece una altura máxima para el scroll
    width: '100%',
    alignSelf: 'center'
  },
  historyContainer: {
    width: '90%',
    alignSelf: 'center'
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black'
  },
  historyItem: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  historyText: {
    fontSize: 14,
    color: 'black'
  },
});

export default MedicationHistory;
