import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { useNfc } from '../../context/NfcContext'; // Importa el contexto
import firestore from '@react-native-firebase/firestore';

import { generateDateObject } from '../../utils/generateDateObject/generateDateObject';

const UsersProgressComponent = () => {
  const { medications, userId } = useNfc();
  const [allUsersProgress, setAllUsersProgress] = useState([]);

  // Función para cargar los medicamentos de todos los usuarios en tiempo real
  const subscribeToAllUsersMedications = () => {
    const referencia = firestore().collection('Usuarios');
    const unsubscribe = referencia.onSnapshot((querySnapshot) => {
      const allUsersData = [];

      querySnapshot.forEach((doc) => {
        const currentUserId = doc.id;
        // Filtrar para excluir el usuario actual?? SE podria hacer
        if (!(currentUserId === userId)) {
          const userData = doc.data();
          const confirmaciones = userData?.confirmaciones || {};

          // Convertir confirmaciones en un array y ordenarlas por hora
          const medicationsList = Object.keys(confirmaciones).map((id) => {
            const med = confirmaciones[id];
            const date = generateDateObject(med.hora);
            return { id, ...med, date };
          }).sort((a, b) => a.date - b.date);

          allUsersData.push({
            userId: currentUserId,
            name: userData.Nombre || `Usuario ${currentUserId}`,
            medications: medicationsList,
          });
        }

      });

      setAllUsersProgress(allUsersData);
    });

    return unsubscribe; // Devuelve la función para cancelar la suscripción

  }

  useEffect(() => {
    // Suscribirse a los cambios de todos los usuarios
    const unsubscribeAllUsers = subscribeToAllUsersMedications();
    return () => unsubscribeAllUsers(); // Cancelar la suscripción al desmontar
  }, [userId]);


  return (

    // <ScrollView style={styles.scrollViewHistory}>
    <View style={styles.progressContainer}>
      <Text style={styles.text}>Tu horario de medicamentos</Text>
      <View style={styles.medicationContainer}>
        <Text style={styles.medicationText}> {medications.length > 0 ? (medications[0].Nombre) : ('Usuario')} </Text>
        {medications.length > 0 ? (
          medications.map((med, index) => (
            <View key={index} style={styles.checkboxContainer}>
              <CheckBox
                value={med.status}
                disabled={true}
                tintColors={{ true: 'blue', false: 'black' }}
              />
              {/* <Text style={styles.medicationText}>{med.medicamento}</Text> */}
              <Text style={styles.timeText}>{med.hora}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noDataText}>No tienes medicamentos registrados.</Text>
        )}
      </View>

      <Text style={styles.text}>Horarios de los otros usuarios</Text>

      {allUsersProgress.length > 0 ? (
        allUsersProgress.map(
          (user, useIndex) => (
            <View View key={useIndex} style={styles.medicationContainer} >
              <Text style={styles.medicationText2}>{user.name ? (user.name) : (NoName)}</Text>
              {
                user.medications.map(
                  (med, medIndex) => (

                    <View key={medIndex} style={styles.checkboxContainer}>
                      <CheckBox
                        value={med.status}
                        disabled // Los usuarios no pueden cambiar el progreso de otros
                        tintColors={{ true: 'blue', false: 'black' }}

                      />
                      {/* <Text style={styles.medicationText}>{med.medicamento}</Text> */}
                      <Text style={styles.timeText2}>{med.hora}</Text>
                    </View>
                  )
                )
              }
            </View>

          )
        )
      ) : (
        <Text style={styles.noDataText}>No hay datos de otros usuarios.</Text>
      )}



    </View >
  );
};

const styles = StyleSheet.create({
  progressContainer: {
    flex: 60,
    justifyContent: 'space-between',
    marginRight: 2,
    backgroundColor: '#ffffff',
    borderRadius: 10,
  },
  scrollViewHistory: {
    maxHeight: 200, // Establece una altura máxima para el scroll
    width: '100%',
    alignSelf: 'center'
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 15,
  },
  medicationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkboxContainer: {
    flexDirection: 'column',
    alignItems: 'center',

  },
  medicationText: {
    marginLeft: 2,
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',

  },
  medicationText2: {
    marginLeft: 2,
    fontSize: 18,
    color: 'black',

  },
  timeText: {
    marginTop: -5,
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
  },
  timeText2: {
    marginTop: -5,
    fontSize: 18,
    color: 'black',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  noDataText: {
    fontSize: 16,
    color: 'gray',
  },
});

export default UsersProgressComponent;

