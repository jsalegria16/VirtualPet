// addConfirmation.js
// import { DB } from "./firebase";
// import { doc, updateDoc } from "firebase/firestore";

import firestore from '@react-native-firebase/firestore';

const addConfirmation = async (userId, date, confirmationStatus) => {

    const referencia = firestore().collection('Usuarios').doc(userId);

    try {
        const docSnapshot = await referencia.get();
        if (!docSnapshot.exists) {
            // Crear el documento si no existe
            await referencia.set({
                confirmaciones: {
                    [date]: confirmationStatus
                }
            });
        } else {
            // Actualizar el documento si ya existe
            await referencia.update({
                [`confirmaciones.${date}`]: confirmationStatus
            });
        }
        console.log("Confirmación agregada correctamente");
    } catch (error) {
        console.error("Error al agregar confirmación: ", error);
    }

    // try {
    //     await referencia.update(
    //         {
    //             [`confirmaciones.${date}`]: confirmationStatus
    //         }
    //     )
    // } catch (error) {
    //     console.error("Error al agregar confirmación: ", error);
    // }




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

