import firestore from '@react-native-firebase/firestore';

// Cargar el estado de la mascota desde Firestore
export const loadState_online = async () => {

    const { setPetStage } = useNfc();

    const referencia = firestore().collection('PetState').doc('mascota');

    try {
        const doc = await referencia.get();
        const savedPetStage = doc.data().estado;
        if (savedPetStage) {
            setPetStage(savedPetStage); // Si hay un estado guardado, lo usamos
        }
    } catch (error) {
        console.error('Error cargando el estado de la mascota:', error);
    }

};

// Cambiar el estado de la mascota en Firestore
export const growPet_online = async (newStage) => {


    const referencia = firestore().collection('PetState').doc('mascota');

    try {
        await referencia.update({ estado: newStage });

    } catch (error) {
        alert('Error al actualizar el estado de la mascota:', error);
    }
};
export default { loadState_online, growPet_online };


