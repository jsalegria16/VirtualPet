// import { useState, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import uuid from 'react-native-uuid';; // Biblioteca para generar UUID
// import firestore from '@react-native-firebase/firestore';

// const useUserId = () => {

//     const [userId, setUserId] = useState(null); // Estado para almacenar el ID del usuario

//     // Función para inicializar el ID del usuario
//     const initializeUserId = async () => {
//         try {
//             // Verificar si el ID del usuario ya está guardado en AsyncStorage
//             let storedUserId = await AsyncStorage.getItem('userId');
//             if (!storedUserId) {

//                 // Si no existe, generar uno nuevo
//                 storedUserId = uuid.v4();
//                 await AsyncStorage.setItem('userId', storedUserId); // Guardar en AsyncStorage

//                 // Crear documento en Firebase
//                 await firestore()
//                     .collection('Usuarios')
//                     .doc(storedUserId)
//                     .set({
//                         confirmaciones: {},
//                     });
//             }
//             setUserId(storedUserId); // Establecer el ID en el estado
//         } catch (error) {
//             console.error('Error al inicializar el ID del usuario:', error);
//         }
//     };

//     // Ejecutar la inicialización al montar el hook
//     useEffect(() => {
//         initializeUserId();
//     }, []);

//     return { userId }; // Retornar el ID del usuario
// };

// export default useUserId;
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';

const useUserId = () => {
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const initializeUserId = async () => {
            try {
                const storedUserId = await AsyncStorage.getItem('userId');
                if (storedUserId) {
                    setUserId(storedUserId);
                } else {
                    const newUserId = uuid.v4();
                    setUserId(newUserId);
                    await AsyncStorage.setItem('userId', newUserId);

                    await firestore()
                        .collection('Usuarios')
                        .doc(newUserId)
                        .set({
                            confirmaciones: {},
                            Nombre: `Usuario_${newUserId.slice(0, 5)}`,
                        });

                    console.log(`Nuevo usuario creado con ID: ${newUserId}`);
                }
            } catch (error) {
                console.error('Error al inicializar userId:', error);
            }
        };

        initializeUserId();
    }, []);

    return { userId };
};

export default useUserId;
