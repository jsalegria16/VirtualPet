import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import { sendMessageToDevices } from '../notifications/sendMessages';
import { displayConfirmationNotification } from '../notifications/notificationsServices';

const useUpdateMedication = () => {

    function esperar(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const updateMedicationStatus = async (validateAndGrowPet, userId, medicationId) => {

        // Obtener los valores del contexto NFC,

        console.log(`Actualizando estado del medicamento ${medicationId} para el usuario ${userId}.`);
        try {

            const referencia = firestore().collection('Usuarios').doc(userId);

            // Obtener el documento actual
            const docSnapshot = await referencia.get();
            if (!docSnapshot.exists) {
                throw new Error('El usuario no existe en la base de datos.');
            }

            const userData = docSnapshot.data();
            const confirmaciones = userData?.confirmaciones || {};

            if (!confirmaciones[medicationId]) {
                throw new Error(`El id  ${medicationId} no existe en las confirmaciones del usuario.`);
            }

            // Validar que la estructura no se altere
            const updatedTimeEntry = {
                ...confirmaciones[medicationId],
                status: true, // Actualizar solo el estado
            };

            // Actualizar el documento
            await referencia.update({
                [`confirmaciones.${medicationId}`]: updatedTimeEntry,
            });

            //Notificacion local para confirmacion de toma de medicamentos
            await displayConfirmationNotification();
            console.log(`Estado actualizado correctamente para la confirmacion ${medicationId}.`);
            // Introducir una pausa de 10 segundos
            await esperar(10000);

            // Notificaciones si soy el recordador Verificar si este dispositivo tiene el rol actual
            //Falta Validad la prioridad de las notificaciones
            const rolesRef = firestore().collection('config').doc('roles_config');
            const rolesDoc = await rolesRef.get();

            if (rolesDoc.exists && rolesDoc.data().currentRoleUser === userId) {
                console.log('Este dispositivo tiene el rol actual. Enviando notificaciones a los demás dispositivos.');

                // Obtener tokens de otros usuarios
                const usuariosSnapshot = await firestore().collection('Usuarios').get();
                const tokens = [];

                usuariosSnapshot.forEach((doc) => {
                    const currentUserId = doc.id;
                    if (currentUserId !== userId) {
                        const userToken = doc.data().fcmToken;
                        if (userToken) tokens.push(userToken);
                    }
                });

                // Enviar notificaciones
                console.log('Tockens a recordar por el rol: ' + tokens);


                if (tokens.length > 0) {
                    try {
                        await sendMessageToDevices(tokens, 'ROLE_REMINDER')
                        console.log('Notificaciones enviadas a los dispositivos restantes.');
                    } catch (error) {
                        console.error('Error enviando notificaciones:', error);
                    }
                }
            }

            await esperar(10000);

            //una vez actualizo la conformacion, verifico para ver si crece la mascota
            await validateAndGrowPet(); // Dentro de esto hay una notificacion


        } catch (error) {
            console.error(`Error al actualizar el estado del medicamento: ${error.message}`);
        }
    };

    return { updateMedicationStatus };
};

export default useUpdateMedication;
