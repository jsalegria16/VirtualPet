import firestore from '@react-native-firebase/firestore';

/**
 * Registra una interacción NFC en el documento del usuario en Firestore.
 * @param {string} userId - ID del usuario que realizó la interacción.
 * @param {string} action - Descripción de la acción realizada.
 */

export const logNfcInteractionForUser = async (userId, action) => {

    const timestamp = new Date(); // Fecha y hora actuales en UTC

    // Formatear la fecha y hora locales
    const localTimestamp = timestamp.toLocaleString('es-ES', {
        timeZone: 'America/Bogota', // Cambia por tu zona horaria, si es diferente
        hour12: true,
    });

    try {
        // Referencia al documento del usuario
        const userDocRef = firestore().collection('Usuarios').doc(userId);

        // Verifica si el documento del usuario existe
        const userDoc = await userDocRef.get();
        if (!userDoc.exists) {
            console.warn(`El documento del usuario con ID ${userId} no existe.`);
            return;
        }

        // Agregar el log al array de interacciones en el documento del usuario
        const newLog = {
            action,
            timestamp: localTimestamp, // Fecha y hora en formato ISO
        };

        await userDocRef.update({
            nfcLogs: firestore.FieldValue.arrayUnion(newLog), // Agrega el log al array
        });

        console.log('Interacción NFC registrada exitosamente para el usuario:', userId, newLog);
    } catch (error) {
        console.error('Error al registrar la interacción NFC:', error);
    }
};


