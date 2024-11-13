import firestore from '@react-native-firebase/firestore';
import { useEffect } from 'react';
import { useNfc } from '../../context/NfcContext';

const loadState_online = async () => {

    const { setPetStage } = useNfc();
    const referencia = firestore().collection('PetState').doc('mascota');
    try {
        const savedPetStage = (await referencia.get()).data.estado;
        if (savedPetStage) {
            setPetStage(savedPetStage); // Si hay un estado guardado, lo usamos
        }
    } catch (error) {
        console.error('Error cargando el estado de la mascota:', error);
    }

}


// PAra cambiar el estado de la mascota
const growPet_online = async (petState) => {

    const referencia = firestore().collection('PetState').doc('mascota');

    try {
        await referencia.update(
            {
                estado: petState
            }
        )
    } catch (error) {
        console.error("Error al criar la mascota: ", error);
    }

};

// Hook personalizado para suscribirse a los cambios en el estado de la mascota
// no lo tengo en esta logica

export default { loadState_online, growPet_online };

