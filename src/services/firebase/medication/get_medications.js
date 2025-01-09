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
        // const medications = Object.keys(confirmaciones).map(id => ({
        //     id,
        //     Nombre: userData.Nombre,
        //     ...confirmaciones[id]
        // }));

        const medications = Object.keys(confirmaciones).map((id) => {
            const med = confirmaciones[id];

            const normalizedTimeString = med.hora.replace(/\s+/g, ' '); // Normaliza cualquier tipo de espacio
            const cleanedTimeString = normalizedTimeString.trim();
            const [time, modifier] = cleanedTimeString.split(' ');
            let [hours, minutes] = time.split(':').map(Number);

            if (modifier === 'PM' && hours < 12) hours += 12;
            if (modifier === 'AM' && hours === 12) hours = 0;

            const date = new Date();
            date.setHours(hours, minutes, 0, 0);

            return { id, Nombre: docSnapshot.data().Nombre, ...med, date };
        }).sort((a, b) => a.date - b.date);

        return medications;
    } catch (error) {
        console.error('Error al obtener los medicamentos:', error);
        return [];
    }
};

export default getMedications;