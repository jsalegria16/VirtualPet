import { useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useEffect } from 'react';
import addConfirmation from '../firebase/medication/add_medication';
import getMedications from '../firebase/medication/get_medications';
import { generateDateObject } from '../../utils/generateDateObject/generateDateObject';
import { displayScheduleMedicationReminder } from '../notifications/notificationsServices';


// Hook personalizado para manejar NFC y almacenar datos en AsyncStorage.
// NECesito crear las notificaciones y arreglar lo de la fecha y la letra en el form para los celulares :)
const useMedManagement = (userId) => {

  const [medName, setMedName] = useState('');
  const [times, setTimes] = useState(''); // Inicialmente vacío, puedes agregar múltiples horarios

  const [medications, setMedications] = useState([]);


  // Función para cargar medicamentos en tiempo real desde Firebase
  const subscribeToMedications = () => {
    const referencia = firestore().collection('Usuarios').doc(userId);

    const unsubscribe = referencia.onSnapshot((docSnapshot) => {
      if (docSnapshot.exists) {
        const confirmaciones = docSnapshot.data()?.confirmaciones || {};

        const medicationsList = Object.keys(confirmaciones).map((id) => {
          const med = confirmaciones[id];
          const date = generateDateObject(med.hora);
          return { id, Nombre: docSnapshot.data().Nombre, ...med, date };
        }).sort((a, b) => a.date - b.date);

        setMedications(medicationsList);
      } else {
        console.warn('No se encontró el documento del usuario en Firebase.');
      }
    });

    return unsubscribe; // Devuelve la función para cancelar la suscripción
  };

  // Suscribirse a cambios en Firebase al montar el componente
  useEffect(() => {
    const unsubscribe = subscribeToMedications();
    return () => unsubscribe(); // Cancelar la suscripción al desmontar
  }, [userId]);


  //Funcion para agregar los medicamentos
  const handleAddMedication = async () => {

    if (!medName.trim() || !times.length) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    try {

      // Verificar permisos antes de programar la notificación Por cosas del andrio12+
      // await checkExactAlarmPermission();

      //Vamos a enviar para firebase 
      await addConfirmation(userId, times, false, medName)
      //addConfirmation(userId, times.toString(), false, medName)

      // Convertir el string de hora a un objeto Date
      const notificationTime = generateDateObject(times);

      console.log(notificationTime);

      // Programar la notificación
      // await displayScheduleMedicationReminder(medName, notificationTime);

      setTimes('');
      setMedName('');
      alert('Medicamento agregado');
      // await loadMedRegiment()


    } catch (error) {
      console.log('Error al agregar medicamento:', error);
    }
  };

  // Función para cargar los medicamentos desde el AsyncStorage
  const loadMedRegiment = async () => {

    //Cargar desde firebase
    try {
      const medicationsFromFirebase = await getMedications(userId);
      console.log('Medicamentos:', medicationsFromFirebase);
      setMedications(medicationsFromFirebase);
    } catch (error) {
      console.warn('Error al cargar el regimen de medicamentos:', error);
    }

  };


  return { medName, setMedName, times, setTimes, handleAddMedication, loadMedRegiment, medications };
};

export default useMedManagement;
