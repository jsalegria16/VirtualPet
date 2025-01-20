import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadState_online, growPet_online } from '../firebase/pet/grow_pet';
import firestore from '@react-native-firebase/firestore';
import { displayGrowthNotification } from '../notifications/notificationsServices';

// Hook para manejar el crecimiento de la mascota
const usePetGrowth = () => {
  const [petStage, setPetStage] = useState('small_happy'); // Estados: small, medium, large
  const [petHumor, setPetHumor] = useState('happy'); // Estados: happy, sad
  const [isInitialLoad, setIsInitialLoad] = useState(true); // Estado para evitar notificaciones en la carga inicial

  // Guardar el estado de la mascota en AsyncStorage
  const savePetState = async (newStage) => {
    try {
      await AsyncStorage.setItem('petStage', newStage); // Guardar localmente
    } catch (error) {
      console.error('Error guardando el estado de la mascota en AsyncStorage:', error);
    }
  };

  // Cambiar el estado de la mascota
  const growPet = async () => {

    let newStage = petStage;
    // Manejo de transición de cualquier estado a uno feliz
    if (petStage.includes('_sad')) {
      // Si estaba triste, pasar al siguiente nivel feliz
      if (petStage.startsWith('small')) {
        newStage = 'medium_happy';
      } else if (petStage.startsWith('medium')) {
        newStage = 'large_happy';
      } else if (petStage.startsWith('large')) {
        newStage = 'small_happy';
      }
    } else {
      // Si estaba feliz, avanzar al siguiente nivel feliz
      if (petStage === 'small_happy') {
        newStage = 'medium_happy';
      } else if (petStage === 'medium_happy') {
        newStage = 'large_happy';
      } else if (petStage === 'large_happy') {
        newStage = 'small_happy'; // Reinicia el ciclo a pequeño feliz
      }
    }

    setPetStage(newStage); // Actualizar el estado local
    savePetState(newStage); // Guardar el nuevo estado en AsyncStorage

    // Guardar el nuevo estado en Firebase
    growPet_online(newStage);
  };

  // Sincronización en tiempo real con Firestore
  useEffect(() => {
    const loadPetState = async () => {
      await loadState_online(); // Cargar desde Firestore
    };

    loadPetState(); // Cargar el estado al montar el componente

    const subscriber = firestore()
      .collection('PetState')
      .doc('mascota')
      .onSnapshot(
        async (documentSnapshot) => {
          if (documentSnapshot.exists) {
            const data = documentSnapshot.data();
            if (data && data.estado !== undefined) {
              if (data.estado !== petStage) {
                // Si el estado cambió, actualiza y dispara la notificación
                setPetStage(data.estado);
                savePetState(data.estado); // Solo como respaldo
                console.log(`Estado sincronizado desde Firebase: ${data.estado}`);

                if (!isInitialLoad) {
                  // Mostrar la notificación solo si no es la carga inicial
                  // Esto no es necesario
                }
              }
            }
          } else {
            console.warn('El documento "mascota" no existe en la colección "PetState".');
          }

          // Después de procesar el primer cambio, actualizamos `isInitialLoad`
          setIsInitialLoad(false);
        },
        (error) => {
          console.error('Error al obtener el documento desde Firestore:', error);
        }
      );

    return () => subscriber(); // Limpieza del listener al desmontar
  }, [petStage, isInitialLoad]); // Dependencias incluyen el estado y la bandera de inicialización

  return { petStage, petHumor, growPet }; // Retornamos el estado actual de la mascota y la función para crecerla
};

export default usePetGrowth;
