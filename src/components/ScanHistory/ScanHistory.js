import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions,ScrollView } from 'react-native';


import { useNfc } from '../../context/NfcContext'; // Importa el contexto



const ScanHistory = () => {

  const {scanHistory } = useNfc();  // Utiliza el hook personalizado para manejar NFC y almacenamiento

  return (
    <View style={styles.petContainer}>
      <Text style={styles.text}>Settings!</Text>
      {/* Scroll solo para historial de escaneos */}
      <ScrollView style={styles.scrollViewHistory}>
        <View style={styles.historyContainer}>
          <Text style={styles.historyTitle}>Historial de Escaneos</Text>
          {scanHistory.length > 0 ? (
            scanHistory.map((item, index) => (
              <View key={index} style={styles.historyItem}>
                <Text style={styles.historyText}>ID: {item.id}</Text>
                <Text style={styles.historyText}>Fecha: {item.date}</Text>
              </View>
            ))
          ) : (
            <>
            <Text style={styles.historyText}>No hay escaneos registrados.</Text>
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
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginBottom: 20,
    borderRadius: 10,
    padding: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color:'black',
  },
  scrollViewHistory: {
    maxHeight: 100, // Establece una altura máxima para el scroll
    width: '100%',
  },
  historyContainer: {
    width: '90%',
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
    color:'black'
  },
});

export default ScanHistory;
