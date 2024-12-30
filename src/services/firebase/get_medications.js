import firestore from '@react-native-firebase/firestore';

const getMedications = async (userId) => {
    try {
        const referencia = firestore().collection('Usuarios').doc(userId);
        const docSnapshot = await referencia.get();

        if (!docSnapshot.exists) {
            console.warn('El usuario no existe en la base de datos.');
            return [];
        }

        const userData = docSnapshot.data();
        const confirmaciones = userData?.confirmaciones || {};

        // Convertir las confirmaciones en un array de medicamentos
        const medications = Object.keys(confirmaciones).map(id => ({
            id,
            ...confirmaciones[id]
        }));

        return medications;
    } catch (error) {
        console.error('Error al obtener los medicamentos:', error);
        return [];
    }
};

export default getMedications;