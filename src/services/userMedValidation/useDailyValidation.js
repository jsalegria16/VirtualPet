import firestore from '@react-native-firebase/firestore';
import { useEffect } from 'react';
import { useNfc } from '../../context/NfcContext'
import AsyncStorage from '@react-native-async-storage/async-storage';

//PAra validar que todos los usuarios hayan tomado sus medicamentos

const useDailyValidation = () => {


    const validateAndGrowPet = async (growPet) => {
        try {
            console.log('Estoy en validateAndGrowPet')

            const usersRef = firestore().collection('Usuarios');
            const usersSnapshot = await usersRef.get();

            const now = new Date();
            let allConfirmed = true;



            usersSnapshot.forEach((doc) => {
                const userConfirmations = doc.data()?.confirmaciones || {};

                Object.entries(userConfirmations).forEach(([time, medications]) => {
                    const medicationTime = new Date(time);
                    const windowStart = new Date(medicationTime.getTime() - 10 * 60 * 1000); // 10 min antes
                    const windowEnd = new Date(medicationTime.getTime() + 10 * 60 * 1000);  // 10 min después

                    if (!(now >= windowStart && now <= windowEnd)) {
                        return;
                    }

                    if (Object.values(medications).some(status => status === false)) {
                        allConfirmed = false;
                    }
                });
            });

            if (allConfirmed) {
                console.log("Todos los usuarios han confirmado su medicación. La mascota crece.");
                await growPet(); // Llamamos al hook de crecimiento de la mascota
                await resetConfirmations(); // Reinicia confirmaciones al final del día
            } else {
                console.log("Faltan confirmaciones. La mascota no crecerá.");
                await resetConfirmations(); // Reinicia confirmaciones aunque no crezca
            }
        } catch (error) {
            console.error('Error al validar las confirmaciones:', error);
        }
    };

    const resetConfirmations = async () => {
        try {
            const usersRef = firestore().collection('Usuarios');
            const usersSnapshot = await usersRef.get();

            usersSnapshot.forEach(async (doc) => {
                const userConfirmations = doc.data()?.confirmaciones || {};

                const resetConfirmations = Object.fromEntries(
                    Object.entries(userConfirmations).map(([time, medications]) => {
                        const resetMedications = Object.fromEntries(
                            Object.keys(medications).map(medication => [medication, false])
                        );
                        return [time, resetMedications];
                    })
                );

                await firestore().collection('Usuarios').doc(doc.id).update({
                    confirmaciones: resetConfirmations,
                });
            });

            console.log("Confirmaciones reiniciadas para el nuevo día.");
        } catch (error) {
            console.error('Error al reiniciar confirmaciones:', error);
        }
    };

    // Reiniciar confirmaciones al inicio de cada día
    useEffect(() => {
        const resetDaily = async () => {
            const lastReset = await AsyncStorage.getItem('lastResetDate');
            const today = new Date().toISOString().split('T')[0];

            if (lastReset !== today) {
                await resetConfirmations(); // Reinicia las confirmaciones
                await AsyncStorage.setItem('lastResetDate', today); // Guarda la fecha del último reinicio
            }
        };

        resetDaily();
    }, []);

    return { validateAndGrowPet };
};

export default useDailyValidation;
