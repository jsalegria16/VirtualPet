import firestore from '@react-native-firebase/firestore';

/**
 * Registra un cambio de rol en Firestore
 * @param {string} targetUserId - ID del usuario al que se le asigna el nuevo rol.
 * @param {string} targetUserName - Nombre del usuario al que se le asigna el rol.
 */
const logRoleChange = async (userId, targetUserId) => {
    const timestamp = new Date(); // Fecha y hora actuales
    // Formatear la fecha y hora locales
    const localTimestamp = timestamp.toLocaleString('es-ES', {
        timeZone: 'America/Bogota', // Cambia por tu zona horaria, si es diferente
        hour12: true,
    });

    try {
        // Referencia a la colección 'RolesLogs' en Firestore
        const referencia = firestore().collection('RolesLogs');

        // Crear un documento con los datos del log
        await referencia.add({
            previousRole: userId, // ID del usuario que realizó el cambio
            newRol: targetUserId, // ID del usuario al que se asigna el rol
            action: 'Cambio de rol',
            timestamp: localTimestamp, // Fecha y hora en formato ISO
        });

        console.log('Cambio de rol registrado:', {
            userId,
            targetUserId,
            timestamp: localTimestamp,
        });
    } catch (error) {
        console.error('Error al registrar el cambio de rol:', error);
    }
};

export default logRoleChange;
