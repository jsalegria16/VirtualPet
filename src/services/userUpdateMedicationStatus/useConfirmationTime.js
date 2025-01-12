import { combineDateAndTime } from '../../utils/combineDateISoAndString/combineDateAndTime';
import getMedications from '../firebase/medication/get_medications';
import { Alert } from 'react-native';


const useConfirmationTime = (userId) => {

    // Combina fecha base ISO con hora recibida en string

    const isWithinWindow = (now, medicationTime, windowMinutes = 10) => {
        const windowStart = new Date(medicationTime.getTime() - windowMinutes * 60 * 1000);
        const windowEnd = new Date(medicationTime.getTime() + windowMinutes * 60 * 1000);
        return now >= windowStart && now <= windowEnd;
    };

    const checkAndSetConfirmationTime = async (validateAndGrowPet, updateMedicationStatus) => {
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


                        await updateMedicationStatus(validateAndGrowPet, userId, newMedicationId);

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
