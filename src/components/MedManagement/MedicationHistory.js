import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

import { useNfc } from '../../context/NfcContext'; // Importa el contexto

const MedicationHistory = () => {

  const { loadMedRegiment, medications, userId } = useNfc(); // Cotexto // Utiliza el hook personalizado para manejar NFC y almacenamiento

  useEffect(() => {
    loadMedRegiment();
  }, []);

  // Función para eliminar un medicamento
  const handleDeleteMedication = async (medicationId) => {
    try {
      const confirm = await new Promise((resolve) => {
        Alert.alert(
          'Eliminar medicamento',
          '¿Estás seguro de que deseas eliminar este medicamento?',
          [
            { text: 'Cancelar', onPress: () => resolve(false), style: 'cancel' },
            { text: 'Eliminar', onPress: () => resolve(true), style: 'destructive' },
          ]
        );
      });

      if (!confirm) return;

      // Referencia a Firestore
      const referencia = firestore().collection('Usuarios').doc(userId);

      // Obtener el documento actual y actualizarlo
      const docSnapshot = await referencia.get();
      if (!docSnapshot.exists) {
        throw new Error('El usuario no existe en la base de datos.');
      }

      const userData = docSnapshot.data();
      const confirmaciones = userData?.confirmaciones || {};

      // Eliminar el medicamento del objeto confirmaciones
      delete confirmaciones[medicationId];

      // Actualizar Firestore
      await referencia.update({ confirmaciones });

      // Volver a cargar el listado
      loadMedRegiment();
      Alert.alert('Medicamento eliminado con éxito');
    } catch (error) {
      console.error('Error al eliminar el medicamento:', error);
      Alert.alert('Error', 'No se pudo eliminar el medicamento.');
    }
  };

  return (
    <View style={styles.petContainer}>
      <Text style={styles.historyTitle}>Lista de medicamentos</Text>
      <ScrollView style={styles.scrollViewHistory}>
        <View style={styles.historyContainer}>
          {medications.length > 0 ? (
            medications.map((item, index) => (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
                key={index}
              >
                <View key={index} style={styles.historyItem}>
                  <Text style={styles.historyText}>Nombre: {item.medicamento}</Text>
                  <Text style={styles.historyText}>
                    {/* Hora: {new Date(item.hora).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })} */}
                    Hora: {item.hora}
                  </Text>
                  <Text style={styles.historyText}>
                    Estado: {item.status ? 'Confirmado' : 'No confirmado'}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteMedication(item.id)}
                >
                  <Text style={styles.deleteButtonText}>Eliminar</Text>
                </TouchableOpacity>


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
  deleteButton: {
    backgroundColor: '#ff4d4d',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  deleteButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MedicationHistory;
