import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import growPet_online from '../firebase/grow_pet';

// Hook para manejar el crecimiento de la mascota
const usePetGrowth = () => {
  // Los tres estados de la mascota
  const [petStage, setPetStage] = useState('small'); // Estados: small, medium, large

  // Función para cargar el estado de la mascota desde AsyncStorage
  const loadPetState = async () => {
    try {
      const savedPetStage = await AsyncStorage.getItem('petStage');
      if (savedPetStage) {
        setPetStage(savedPetStage); // Si hay un estado guardado, lo usamos
      }
    } catch (error) {
      console.error('Error cargando el estado de la mascota:', error);
    }
  };

  // Función para guardar el estado de la mascota en AsyncStorage
  const savePetState = async (newStage) => {
    try {
      await AsyncStorage.setItem('petStage', newStage); // Guardar el estado actual en AsyncStorage
    } catch (error) {
      console.error('Error guardando el estado de la mascota:', error);
    }
  };

  // Función para hacer que la mascota crezca
  const growPet = () => {
    let newStage = petStage;
    if (petStage === 'small') {
      newStage = 'medium'; // Crecer de pequeño a mediano
    } else if (petStage === 'medium') {
      newStage = 'large'; // Crecer de mediano a grande
    } else if (petStage === 'large') {
      newStage = 'small'; // Si está en grande, volver a pequeño
    }

    setPetStage(newStage); // Actualizar el estado local
    savePetState(newStage); // Guardar el nuevo estado en AsyncStorage
    // Guaarademos esto en firebase
    growPet_online(newStage);
    //
  };

  // Cargar el estado de la mascota cuando se inicia la app
  useEffect(() => {
    loadPetState(); // Cargar el estado al montar el componente
  }, []);

  return { petStage, growPet }; // Retornamos el estado actual de la mascota y la función para crecerla
};

export default usePetGrowth;
