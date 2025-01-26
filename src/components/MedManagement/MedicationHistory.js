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
                <Text style={styles.historyText}>ID: {item.medicamento}</Text>
                <Text style={styles.historyText}>
                  {/* Hora: {new Date(item.hora).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })} */}
                  Hora: {item.hora}
                </Text>
                <Text style={styles.historyText}>
                  Estado: {item.status ? 'Confirmado' : 'No confirmado'}
                </Text>
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
    flex: 55,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 0,
    paddingLeft: 10

  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  scrollViewHistory: {
    maxHeight: 270, // Establece una altura máxima para el scroll
    width: '100%',
    alignSelf: 'center'
  },
  historyContainer: {
    width: '90%',
    alignSelf: 'center'
  },
  historyTitle: {
    fontSize: 24,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default MedicationHistory;
