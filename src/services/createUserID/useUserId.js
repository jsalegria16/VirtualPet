import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';; // Biblioteca para generar UUID

const useUserId = () => {
    const [userId, setUserId] = useState(null); // Estado para almacenar el ID del usuario

    // Función para inicializar el ID del usuario
    const initializeUserId = async () => {
        try {
            // Verificar si el ID del usuario ya está guardado en AsyncStorage
            let storedUserId = await AsyncStorage.getItem('userId');
            if (!storedUserId) {
                // Si no existe, generar uno nuevo
                storedUserId = uuid.v4();
                await AsyncStorage.setItem('userId', storedUserId); // Guardar en AsyncStorage
            }
            setUserId(storedUserId); // Establecer el ID en el estado
        } catch (error) {
            console.error('Error al inicializar el ID del usuario:', error);
        }
    };

    // Ejecutar la inicialización al montar el hook
    useEffect(() => {
        initializeUserId();
    }, []);

    return { userId }; // Retornar el ID del usuario
};

export default useUserId;
