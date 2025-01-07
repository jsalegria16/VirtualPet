import firestore from '@react-native-firebase/firestore';

const useDailyValidation = () => {

    const validateAndGrowPet = async (growPet) => {
        try {
            console.log('Validando confirmaciones conjuntas...');

            const usersRef = firestore().collection('Usuarios');
            const usersSnapshot = await usersRef.get();

            let allConfirmed = true; // Bandera para determinar si todos los medicamentos están confirmados

            usersSnapshot.forEach((doc) => {
                const userConfirmations = doc.data()?.confirmaciones || {};

                // Si alguna confirmación no está en `true`, marca allConfirmed como false
                Object.values(userConfirmations).forEach((medicationData) => {
                    if (!medicationData.status) {
                        allConfirmed = false;
                    }
                });
            });

            if (allConfirmed) {
                console.log("Todos los usuarios han confirmado sus medicamentos. Haciendo crecer la mascota...");
                await growPet(); // Llama a la función para hacer crecer la mascota
                // await resetConfirmations(); // Reinicia confirmaciones después de hacer crecer la mascota

                // >> Faltaría registrar el exito de esto en un log
                // Registrar el éxito del día
                const today = new Date().toISOString().split('T')[0]; // Fecha en formato YYYY-MM-DD
                await firestore().collection('MascotaLogs').add({
                    fecha: today,
                    estado: 'Creció',
                    motivo: 'Todos los medicamentos confirmados a tiempo',
                });

                //Notificacion

            }
        } catch (error) {
            console.error('Error al validar confirmaciones conjuntas:', error);
        }
    };

    const resetConfirmations = async () => {
        try {
            console.log('Reiniciando confirmaciones para todos los usuarios...');
            const usersRef = firestore().collection('Usuarios');
            const usersSnapshot = await usersRef.get();

            usersSnapshot.forEach(async (doc) => {
                const userConfirmations = doc.data()?.confirmaciones || {};

                const resetConfirmations = Object.fromEntries(
                    Object.entries(userConfirmations).map(([medicationId, medicationData]) => [
                        medicationId,
                        { ...medicationData, status: false },
                    ])
                );

                await firestore().collection('Usuarios').doc(doc.id).update({
                    confirmaciones: resetConfirmations,
                });
            });

            console.log("Confirmaciones reiniciadas.");
        } catch (error) {
            console.error('Error al reiniciar confirmaciones:', error);
        }
    };

    return { validateAndGrowPet, resetConfirmations };
};

export default useDailyValidation;
