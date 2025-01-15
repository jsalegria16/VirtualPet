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

// // export default useUserId;
// import { useState, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import firestore from '@react-native-firebase/firestore';
// import uuid from 'react-native-uuid';

// const useUserId = () => {
//     const [userId, setUserId] = useState(null);

//     useEffect(() => {
//         const initializeUserId = async () => {
//             try {
//                 const storedUserId = await AsyncStorage.getItem('userId');
//                 if (storedUserId) {
//                     setUserId(storedUserId);
//                 } else {
//                     const newUserId = uuid.v4();
//                     setUserId(newUserId);
//                     await AsyncStorage.setItem('userId', newUserId);

//                     await firestore()
//                         .collection('Usuarios')
//                         .doc(newUserId)
//                         .set({
//                             confirmaciones: {},
//                             Nombre: `Usuario_${newUserId.slice(0, 5)}`,
//                         });

//                     console.log(`Nuevo usuario creado con ID: ${newUserId}`);
//                 }
//             } catch (error) {
//                 console.error('Error al inicializar userId:', error);
//             }
//         };

//         initializeUserId();
//     }, []);

//     return { userId };
// };

// export default useUserId;

import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import uuid from 'react-native-uuid';

const useUserId = () => {
    const [userId, setUserId] = useState(null);

    useEffect(() => {

        // PAra enviar el userID a la DB
        const initializeUserId = async () => {
            try {
                // Obtener el token FCM
                // Register the device with FCM
                await messaging().registerDeviceForRemoteMessages();
                const token = await messaging().getToken();
                console.log('Token FCM obtenido:', token);

                // Revisar si ya existe un userId en el almacenamiento local
                // Revisar si ya existe un userId en el almacenamiento local
                const storedUserId = await AsyncStorage.getItem('userId');
                let newUserId = storedUserId;

                if (!storedUserId) {
                    // Crear un nuevo userId si no existe
                    newUserId = uuid.v4();
                    setUserId(newUserId);

                    // Guardar el userId en el almacenamiento local
                    await AsyncStorage.setItem('userId', newUserId);

                    // Registrar el nuevo usuario en Firestore
                    await firestore()
                        .collection('Usuarios')
                        .doc(newUserId)
                        .set({
                            confirmaciones: {},
                            Nombre: `Usuario_${newUserId.slice(0, 5)}`,
                            fcmToken: token,
                        });

                    console.log(`Nuevo usuario creado con ID: ${newUserId}`);
                } else {
                    setUserId(storedUserId);
                }

                // Verificar y actualizar roles_config
                await updateRolesConfig(newUserId);

            } catch (error) {
                console.error('Error al inicializar userId:', error);
            }
        };

        const updateRolesConfig = async (newUserId) => {
            try {
                const rolesRef = firestore().collection('config').doc('roles_config');
                const docSnapshot = await rolesRef.get();

                if (!docSnapshot.exists) {
                    console.warn('El documento roles_config no existe. Creándolo...');
                    await rolesRef.set({
                        currentIndex: "0",
                        currentRoleUser: newUserId,
                        resetHour: 0,
                        resetMinute: 0,
                        rotationOrder: [newUserId],
                    });
                    return;
                }

                const data = docSnapshot.data();
                const rotationOrder = data.rotationOrder || [];

                // Verificar si el userId ya está en rotationOrder
                if (!rotationOrder.includes(newUserId)) {
                    rotationOrder.push(newUserId);
                }

                // Actualizar solo si los valores difieren
                const updatedData = {
                    ...data,
                    rotationOrder, // Actualizar el array
                };

                if (!data.currentRoleUser) {
                    updatedData.currentRoleUser = newUserId;
                }

                if (!data.resetHour) {
                    updatedData.resetHour = 0; // Valor por defecto
                }

                if (!data.resetMinute) {
                    updatedData.resetMinute = 0; // Valor por defecto
                }

                // Guardar los cambios en Firestore
                await rolesRef.set(updatedData, { merge: true });
                console.log('roles_config actualizado:', updatedData);
            } catch (error) {
                console.error('Error al actualizar roles_config:', error);
            }
        };

        initializeUserId();
    }, []);

    return { userId };
};

export default useUserId;
