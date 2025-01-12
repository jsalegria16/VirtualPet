import firestore from '@react-native-firebase/firestore';

const useUpdateMedication = () => {


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

            console.log(`Estado actualizado correctamente para la confirmacion ${medicationId}.`);

            //una vez actualizo la conformacion, verifico para ver si crece la mascota
            await validateAndGrowPet();

        } catch (error) {
            console.error(`Error al actualizar el estado del medicamento: ${error.message}`);
        }
    };

    return { updateMedicationStatus };
};

export default useUpdateMedication;
