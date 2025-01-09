import { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';

const useRoleManagement = (userId) => {
    const [currentRoleUserId, setCurrentRoleUserId] = useState(null);
    const [currentRoleName, setCurrentRoleName] = useState(null);
    const [resetHour, setResetHour] = useState(null); // Hora configurada desde Firestore
    const [resetMinute, setResetMinute] = useState(null); // Minutos configurados desde Firestore

    // Obtiene el rol actual desde Firestore
    const fetchCurrentRole = async () => {
        const rolesRef = firestore().collection('config').doc('roles_config');
        try {
            const doc = await rolesRef.get();
            if (doc.exists) {
                const data = doc.data();
                setCurrentRoleUserId(data.currentRoleUser);

                // Obtener el nombre del usuario desde la colección `Usuarios`
                const userDoc = await firestore().collection('Usuarios').doc(data.currentRoleUser).get();
                if (userDoc.exists) {
                    const userData = userDoc.data();
                    setCurrentRoleName(userData.Nombre || 'Desconocido');
                } else {
                    console.warn('El usuario asociado al rol actual no existe en la colección Usuarios.');
                }

            } else {
                console.error('El documento de configuración de roles no existe.');
            }
        } catch (error) {
            console.error('Error al obtener el rol actual:', error);
        }
    };

    // Escucha los cambios en la hora configurada desde Firestore
    const listenToResetTime = () => {
        const rolesRef = firestore().collection('config').doc('roles_config');
        const unsubscribe = rolesRef.onSnapshot((doc) => {
            if (doc.exists) {
                const data = doc.data();
                setResetHour(data.resetHour); // Actualiza la hora
                setResetMinute(data.resetMinute); // Actualiza los minutos
                console.log('Configuración de intercambio de roles actualizada:', data);
            }
        });
        return unsubscribe; // Limpia la suscripción al desmontar
    };

    // Escucha los cambios en el documento `roles_config` de Firestore en tiempo real
    const listenToRoleChanges = () => {
        const rolesRef = firestore().collection('config').doc('roles_config');
        const unsubscribe = rolesRef.onSnapshot(async (doc) => {
            if (doc.exists) {
                const data = doc.data();
                setCurrentRoleUserId(data.currentRoleUser);

                // Obtener el nombre del usuario actual del rol
                const userDoc = await firestore().collection('Usuarios').doc(data.currentRoleUser).get();
                if (userDoc.exists) {
                    const userData = userDoc.data();
                    setCurrentRoleName(userData.Nombre || 'Desconocido');
                } else {
                    console.warn('El usuario asociado al rol actual no existe en la colección Usuarios.');
                }
            } else {
                console.error('El documento de configuración de roles no existe.');
            }
        });

        return unsubscribe; // Limpia la suscripción al desmontar el hook
    };

    // Inicializamos la escucha al montar el hook
    useEffect(() => {
        const unsubscribe = listenToRoleChanges();
        return () => unsubscribe();
    }, []);

    // Rota el rol si el usuario actual tiene el rol de recordador
    const rotateRole = async () => {
        const rolesRef = firestore().collection('config').doc('roles_config');
        try {
            const docSnapshot = await rolesRef.get();
            if (!docSnapshot.exists) {
                console.error('El documento de configuración de roles no existe.');
                return;
            }

            const data = docSnapshot.data();
            console.log('Datos de roles:', data.currentRoleUser);
            console.log('Datos de userID', userId);
            if (data.currentRoleUser !== userId) {
                console.log('Este dispositivo no tiene el rol de recordador.');
                return;
            }

            const rotationOrder = data.rotationOrder;
            let currentIndex = parseInt(data.currentIndex, 10); // Convertir a entero
            currentIndex = (currentIndex + 1) % rotationOrder.length;

            await rolesRef.update({
                currentRoleUser: rotationOrder[currentIndex],
                currentIndex: currentIndex.toString()
            });

            console.log(`Nuevo rol asignado a: ${rotationOrder[currentIndex]}`);
            // Actualiza los estados locales
            await fetchCurrentRole(); // Llama a esta función para obtener el nuevo currentRoleUser y currentRoleName

        } catch (error) {
            console.error('Error al rotar el rol:', error);
        }
    };

    // Inicializa los roles con una lista predefinida de usuarios
    const initializeRoles = async (rotationOrder) => {
        const rolesRef = firestore().collection('config').doc('roles_config');
        try {
            await rolesRef.set({
                currentRoleUserId: rotationOrder[0],
                rotationOrder: rotationOrder,
                currentIndex: "0",
                resetHour: 0, // Hora por defecto
                resetMinute: 0 // Minuto por defecto
            });
            console.log('Roles inicializados.');
        } catch (error) {
            console.error('Error al inicializar roles:', error);
        }
    };

    // Verifica si es hora de rotar el rol
    useEffect(() => {
        const timer = setInterval(async () => {
            const now = new Date();
            const currentHour = now.getHours();
            const currentMinute = now.getMinutes();

            if (resetHour !== null && resetMinute !== null) {
                console.log(`Ejecutando checkeo de intercambio de toles...(O Algo cambio en la DB)`)
                if (currentHour === resetHour && currentMinute === resetMinute) {
                    console.log('Ejecutando rotación de roles según la hora configurada...');
                    await rotateRole();
                }
            }
        }, 60000); // Verifica cada minuto

        return () => clearInterval(timer); // Limpia el temporizador al desmontar
    }, [resetHour, resetMinute]);

    // Inicializar escuchas
    useEffect(() => {
        fetchCurrentRole(); // Obtiene el rol actual
        const unsubscribe = listenToResetTime(); // Escucha los cambios de tiempo
        return () => unsubscribe();
    }, []);

    return { currentRoleUserId, currentRoleName, fetchCurrentRole, rotateRole, initializeRoles };

};

export default useRoleManagement;
