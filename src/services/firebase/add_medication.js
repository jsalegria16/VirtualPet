import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';; // Biblioteca para generar UUID

const addConfirmation = async (userId, time, confirmationStatus, medicationName) => {
    // Referencia al documento del usuario
    const referencia = firestore().collection('Usuarios').doc(userId);
    const id = uuid.v4();

    try {
        const docSnapshot = await referencia.get();

        if (!docSnapshot.exists) {
            // Crear el documento si no existe
            const confirmaciones = {
                [id]: { // Usar un identificador único
                    hora: time,
                    medicamento: medicationName,
                    status: confirmationStatus, // Asocia el medicamento con su estado
                },
            };
            await referencia.set({ confirmaciones });
        } else {
            // Verificar si ya existe una entrada para ese identificador
            const existingData = docSnapshot.data();
            const existingConfirmations = existingData?.confirmaciones || {};

            // Actualizar el objeto `confirmaciones`
            const updatedConfirmations = {
                ...existingConfirmations,
                [id]: { // Usar un identificador único
                    hora: time,
                    medicamento: medicationName,
                    status: confirmationStatus,
                },
            };

            // Actualizar el documento completo con las nuevas confirmaciones
            await referencia.update({ confirmaciones: updatedConfirmations });
        }

        console.log(`Medicación agregada: ${medicationName} a las ${time}`);
    } catch (error) {
        console.error('Error al agregar confirmación: ', error);
    }
};

export default addConfirmation;
