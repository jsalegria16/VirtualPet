import { useState, useEffect } from 'react';
import getMedications from '../firebase/medication/get_medications';
import { Alert } from 'react-native';


const useConfirmationTime = (userId) => {

    // Combina fecha base ISO con hora recibida
    const combineDateAndTime = (dateISO, timeString) => {
        // Alert.alert('debug message:', `Esta es la fecha en string que entra a la func: ${timeString} y es de tipo ${typeof timeString}`);
        const normalizedTimeString = timeString.replace(/\s+/g, ' '); // Normaliza cualquier tipo de espacio
        const cleanedTimeString = normalizedTimeString.trim();
        const [time, modifier] = cleanedTimeString.split(' ');
        let [hours, minutes] = time.split(':').map(Number);

        // Alert.alert('Debug Message dentro de combineDateAndTime', ` time: ${time} modifier: ${modifier} hours: ${hours} minutes: ${minutes}`);

        if (modifier === 'PM' && hours < 12) hours += 12;
        if (modifier === 'AM' && hours === 12) hours = 0;

        const baseDate = new Date(dateISO);
        // Alert.alert('Debug Message dentro de combineDateAndTime', ` baseDate: ${baseDate}`);
        baseDate.setHours(hours, minutes, 0, 0);
        // Alert.alert('Debug Message dentro de combineDateAndTime', ` baseDate.setHours: ${baseDate}`);


        return baseDate;
    };

    const isWithinWindow = (now, medicationTime, windowMinutes = 10) => {
        const windowStart = new Date(medicationTime.getTime() - windowMinutes * 60 * 1000);
        const windowEnd = new Date(medicationTime.getTime() + windowMinutes * 60 * 1000);
        return now >= windowStart && now <= windowEnd;
    };

    const checkAndSetConfirmationTime = async (updateMedicationStatus) => {
        // console.log('Estoy en checkAndSetConfirmationTime');

        try {
            const now = new Date();
            const medications = await getMedications(userId);
            Alert.alert('Debug Message', ` nowTime: ${now}`);
            if (!medications) return;

            for (const med of medications) {

                const medicationTime = combineDateAndTime(now.toISOString(), med.hora);

                if (isWithinWindow(now, medicationTime)) {

                    if (!med.status) {

                        const newConfirmationTime = medicationTime;
                        const newMedicationId = med.id;

                        console.log(`Hora para confirmar(local): ${newConfirmationTime} `);
                        console.log(`MedicationId(local): ${newMedicationId} `);


                        await updateMedicationStatus(userId, newMedicationId);

                        return; // Salimos al encontrar el primer medicamento que cumple
                    } else {
                        console.log('No es un medicamento para confirmar en este momento.');
                    }

                } else {
                    console.log('No hay medicamentos en ventana de timepo para confirmar en este momento.');
                }

            }
        } catch (error) {
            console.error('Error al verificar la hora de confirmación:', error);
        }
    };

    return { checkAndSetConfirmationTime };
};

export default useConfirmationTime;
