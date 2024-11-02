// addConfirmation.js
// import { DB } from "./firebase";
// import { doc, updateDoc } from "firebase/firestore";

import firestore from '@react-native-firebase/firestore';

const growPet_online = async (petState) => {

    const referencia = firestore().collection('PetState').doc('mascota');

    try {
        referencia.update(
            {
                estado: petState
            }
        )
    } catch (error) {
        console.error("Error al criar la mascota: ", error);
    }



};

export default growPet_online;

