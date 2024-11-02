// addConfirmation.js
// import { DB } from "./firebase";
// import { doc, updateDoc } from "firebase/firestore";

import firestore from '@react-native-firebase/firestore';

const addConfirmation = async (userId = 'usuario1', date, confirmationStatus) => {

    const referencia = firestore().collection('Usuarios').doc('usuario2');

    try {
        referencia.update(
            {
                [`confirmaciones.${date}`]: confirmationStatus
            }
        )
    } catch (error) {
        console.error("Error al agregar confirmación: ", error);
    }




    // Add a second document with a generated ID.

    // try {

    //     const userRef = doc(DB, "Usuarios", userId);
    //     // Actualiza el campo 'confirmaciones' con la nueva fecha y estado
    //     await updateDoc(userRef, {
    //         [`confirmaciones.${date}`]: confirmationStatus
    //     });

    //     console.log("Confirmación agregada correctamente");

    // } catch (e) {
    //     console.error("Error al agregar confirmación: ", e);
    // }

};

export default addConfirmation;

