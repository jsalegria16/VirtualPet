import { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import { displayGrowthNotification } from '../notifications/notificationsServices';
import { sendMessageToDevices } from '../notifications/sendMessages';

const useDailyValidation = (growPet) => {

    const [resetHour, setResetHour] = useState(null); // Almacena la hora desde la DB
    const [resetMinute, setResetMinute] = useState(null); // Almacena los minutos desde la DB

    const validateAndGrowPet = async () => {
        try {
            console.log('Validando confirmaciones conjuntas...');

            const usersRef = firestore().collection('Usuarios');
            const usersSnapshot = await usersRef.get();

            let allConfirmed = true; // Bandera para determinar si todos los medicamentos están confirmados
            let tokens = []; // Almacenar tokens de dispositivos


            usersSnapshot.forEach((doc) => {
                const userConfirmations = doc.data()?.confirmaciones || {};

                // Si alguna confirmación no está en `true`, marca allConfirmed como false
                Object.values(userConfirmations).forEach((medicationData) => {
                    if (!medicationData.status) {
                        allConfirmed = false;
                    }
                });

                if (doc.data()?.fcmToken) {
                    tokens.push(doc.data().fcmToken);
                }

            });

            if (allConfirmed) {
                console.log("Todos los usuarios han confirmado sus medicamentos. Haciendo crecer la mascota...");
                await growPet(); // Llama a la función para hacer crecer la mascota
                // await resetConfirmations(); // Reinicia confirmaciones después de hacer crecer la mascota

                //Notificacion
                console.log('Tockens a la solicitud de mascto crece: ' + tokens);

                await sendMessageToDevices(tokens, 'PET_GROWTH');
                // await displayGrowthNotification();

                // >> Faltaría registrar el exito de esto en un log
                // Registrar el éxito del día
                const timestamp = new Date(); // Fecha y hora actuales en UTC
                // Formatear la fecha y hora locales
                const today = timestamp.toLocaleString('es-ES', {
                    timeZone: 'America/Bogota', // Cambia por tu zona horaria, si es diferente
                    hour12: true,
                });
                await firestore().collection('MascotaLogs').add({
                    fecha: today,
                    estado: 'Creció',
                    motivo: 'Todos los medicamentos confirmados a tiempo',
                });

            }
        } catch (error) {
            console.error('Error al validar confirmaciones conjuntas:', error);
        }
    };

    // const resetConfirmations = async () => {
    //     try {
    //         console.log('Reiniciando confirmaciones para todos los usuarios...');
    //         const usersRef = firestore().collection('Usuarios');
    //         const usersSnapshot = await usersRef.get();
    //         //Logica adicional por si la mascota no crece
    //         let allConfirmed = true;//Logica adicional por si la mascota no crece

    //         usersSnapshot.forEach(async (doc) => {
    //             const userConfirmations = doc.data()?.confirmaciones || {};

    //             const resetConfirmations = Object.fromEntries(
    //                 Object.entries(userConfirmations).map(([medicationId, medicationData]) => [
    //                     medicationId,
    //                     { ...medicationData, status: false },
    //                 ])
    //             );

    //             await firestore().collection('Usuarios').doc(doc.id).update({
    //                 confirmaciones: resetConfirmations,
    //             });

    //             //Logica adicional por si la mascota no crece
    //             // Verificar si hay al menos un status "false"
    //             Object.values(userConfirmations).forEach((conf) => {
    //                 console.log(conf);
    //                 if (conf.status === false) {
    //                     allConfirmed = false;
    //                 }
    //             });


    //         });
    //         console.log("Confirmaciones reiniciadas.");

    //         //Logica adicional por si la mascota no crece
    //         const referenciaMascota = firestore().collection('PetState').doc('mascota');
    //         const petStateSnapshot = await referenciaMascota.get();
    //         const petState = petStateSnapshot.data()?.estado;

    //         if (!allConfirmed) {
    //             // Cambiar el estado a "triste" si no se confirmaron todos
    //             const sadState = petState.includes('_happy') ? petState.replace('_happy', '_sad') : petState;
    //             await referenciaMascota.update({ estado: sadState });
    //             console.log('La mascota ahora está triste:', sadState);
    //         } else {
    //             console.log('Todos los medicamentos fueron confirmados. El estado no cambia.');
    //         }

    //     } catch (error) {
    //         console.error('Error al reiniciar confirmaciones:', error);
    //     }
    // };

    // Escucha los cambios en Firestore Para las horas de reinicio de estados

    const resetConfirmations = async () => {
        try {
            console.log('Iniciando reinicio de confirmaciones para todos los usuarios...');
            const usersRef = firestore().collection('Usuarios');
            const usersSnapshot = await usersRef.get();

            let allConfirmed = true; // Bandera para verificar si todos los medicamentos fueron confirmados

            for (const doc of usersSnapshot.docs) {
                try {
                    const userConfirmations = doc.data()?.confirmaciones || {};

                    // Reiniciar todas las confirmaciones a status: false
                    const resetConfirmations = Object.fromEntries(
                        Object.entries(userConfirmations).map(([medicationId, medicationData]) => [
                            medicationId,
                            { ...medicationData, status: false },
                        ])
                    );

                    // Actualizar las confirmaciones del usuario en la base de datos
                    await firestore().collection('Usuarios').doc(doc.id).update({
                        confirmaciones: resetConfirmations,
                    });

                    console.log(`Confirmaciones reiniciadas para el usuario ${doc.id}`);

                    // Verificar si hay al menos un medicamento con status: false
                    Object.values(userConfirmations).forEach((conf) => {
                        if (conf.status === false) {
                            allConfirmed = false;
                        }
                    });
                } catch (error) {
                    console.error(`Error al actualizar confirmaciones para el usuario ${doc.id}:`, error);
                }
            }

            console.log("Confirmaciones reiniciadas para todos los usuarios.");

            // Logica para actualizar el estado de la mascota
            const referenciaMascota = firestore().collection('PetState').doc('mascota');
            const petStateSnapshot = await referenciaMascota.get();
            const petState = petStateSnapshot.data()?.estado;

            if (!allConfirmed) {
                // Cambiar al estado triste si no todos los medicamentos fueron confirmados
                if (!petState.includes('_sad')) {
                    const sadState = petState.replace('_happy', '_sad');
                    await referenciaMascota.update({ estado: sadState });
                    console.log('La mascota ahora está triste:', sadState);
                } else {
                    console.log('La mascota ya estaba en estado triste. No se realizaron cambios.');
                }
            } else {
                console.log('Todos los medicamentos fueron confirmados. El estado de la mascota no cambia.');
            }
        } catch (error) {
            console.error('Error al reiniciar confirmaciones:', error);
        }
    };

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('config')
            .doc('dailyReset')
            .onSnapshot((doc) => {
                if (doc.exists) {
                    const data = doc.data();
                    setResetHour(data.hour); // Actualiza la hora
                    setResetMinute(data.minute); // Actualiza los minutos
                    console.log('Configuración de reinicio actualizada:', data);
                }
            });

        return () => unsubscribe(); // Limpia la suscripción al desmontar
    }, []);

    // Temporizador PAra validacion al final del dia(o una hora en especial)
    useEffect(() => {
        const timer = setInterval(async () => {
            const now = new Date();
            const currentHour = now.getHours();
            const currentMinutes = now.getMinutes();

            // Verifica si el horario desde Firestore está configurado
            if (resetHour !== null && resetMinute !== null) {
                // Ejecutar la validación al final del día (ajusta según tus necesidades)
                console.log(`Ejecutando reinicio diario al final del día...(Algo cambio en la DB)
                ${resetHour}: ${resetMinute}} 
                ${currentHour}: ${currentMinutes}`)
                if (currentHour === resetHour && currentMinutes === resetMinute) {
                    console.log('Ejecutando reinicio diario al final del día...');
                    // Llama a resetConfirmations para reiniciar los estados
                    await resetConfirmations();
                }
            }
        }, 60000); // Verifica cada minuto

        return () => clearInterval(timer); // Limpia el intervalo al desmontar el contexto
    }, [resetHour, resetMinute]);

    return { validateAndGrowPet };
};

export default useDailyValidation;
