import { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';

const useDailyValidation = () => {

    const [resetHour, setResetHour] = useState(null); // Almacena la hora desde la DB
    const [resetMinute, setResetMinute] = useState(null); // Almacena los minutos desde la DB

    const validateAndGrowPet = async (growPet) => {
        try {
            console.log('Validando confirmaciones conjuntas...');

            const usersRef = firestore().collection('Usuarios');
            const usersSnapshot = await usersRef.get();

            let allConfirmed = true; // Bandera para determinar si todos los medicamentos están confirmados

            usersSnapshot.forEach((doc) => {
                const userConfirmations = doc.data()?.confirmaciones || {};

                // Si alguna confirmación no está en `true`, marca allConfirmed como false
                Object.values(userConfirmations).forEach((medicationData) => {
                    if (!medicationData.status) {
                        allConfirmed = false;
                    }
                });
            });

            if (allConfirmed) {
                console.log("Todos los usuarios han confirmado sus medicamentos. Haciendo crecer la mascota...");
                await growPet(); // Llama a la función para hacer crecer la mascota
                // await resetConfirmations(); // Reinicia confirmaciones después de hacer crecer la mascota

                // >> Faltaría registrar el exito de esto en un log
                // Registrar el éxito del día
                const today = new Date().toISOString().split('T')[0]; // Fecha en formato YYYY-MM-DD
                await firestore().collection('MascotaLogs').add({
                    fecha: today,
                    estado: 'Creció',
                    motivo: 'Todos los medicamentos confirmados a tiempo',
                });

                //Notificacion

            }
        } catch (error) {
            console.error('Error al validar confirmaciones conjuntas:', error);
        }
    };

    const resetConfirmations = async () => {
        try {
            console.log('Reiniciando confirmaciones para todos los usuarios...');
            const usersRef = firestore().collection('Usuarios');
            const usersSnapshot = await usersRef.get();

            usersSnapshot.forEach(async (doc) => {
                const userConfirmations = doc.data()?.confirmaciones || {};

                const resetConfirmations = Object.fromEntries(
                    Object.entries(userConfirmations).map(([medicationId, medicationData]) => [
                        medicationId,
                        { ...medicationData, status: false },
                    ])
                );

                await firestore().collection('Usuarios').doc(doc.id).update({
                    confirmaciones: resetConfirmations,
                });
            });

            console.log("Confirmaciones reiniciadas.");
        } catch (error) {
            console.error('Error al reiniciar confirmaciones:', error);
        }
    };

    // Escucha los cambios en Firestore Para las horas de reinicio de estados
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
