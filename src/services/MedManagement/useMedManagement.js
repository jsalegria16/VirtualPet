import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import addConfirmation from '../firebase/add_medication';


// Hook personalizado para manejar NFC y almacenar datos en AsyncStorage.
// NECesito crear las notificaciones y arreglar lo de la fecha y la letra en el form para los celulares :)
const useMedManagement = () => {

  const [medName, setMedName] = useState('');
  const [times, setTimes] = useState(''); // Inicialmente vacío, puedes agregar múltiples horarios

  const [medications, setMedications] = useState([]);

  //Funcion para agregar los medicamentos
  const handleAddMedication = async (userId) => {
    try {
      const existingMeds = await AsyncStorage.getItem('medications');
      let medications = existingMeds ? JSON.parse(existingMeds) : [];

      const newMed = { name: medName, times: times };
      medications.push(newMed);

      await AsyncStorage.setItem('medications', JSON.stringify(medications));

      //Vaamos aa enviar para firebase too
      addConfirmation(userId, times, false, medName)
      ///

      setMedName('');
      setTimes('');
      alert('Medicamento agregado');
      loadMedRegiment()
    } catch (error) {
      console.log('Error al agregar medicamento:', error);
    }
  };

  // Función para cargar los medicamentos desde el AsyncStorage
  const loadMedRegiment = async () => {
    try {
      const existingMeds = await AsyncStorage.getItem('medications');
      if (existingMeds) {
        setMedications(JSON.parse(existingMeds));
      }
    } catch (error) {
      console.warn('Error al cargar el regimen de medicamentos:', error);
    }

  };

  //funcion para eleminar  medicamentos

  return { medName, setMedName, times, setTimes, handleAddMedication, loadMedRegiment, medications };
};

export default useMedManagement;
