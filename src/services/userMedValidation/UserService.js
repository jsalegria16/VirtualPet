import firestore from '@react-native-firebase/firestore';
import { verifyAllUsersConfirmed } from './verifyAllUsersConfirmed';

export const confirmMedication = async (userId, date) => {
    if (!userId || !date) {
        console.error('Usuario o fecha no válidos');
        return;
    }

    const confirmationPath = firestore().collection('users').doc(userId).collection('confirmations').doc(date);

    try {
        await confirmationPath.set({ confirmed: true });
        console.log(`Confirmación guardada para el usuario ${userId}`);
        await verifyAllUsersConfirmed(date); // Verifica si todos han confirmado después de guardar
    } catch (error) {
        console.error('Error al confirmar la medicación:', error);
    }
};
