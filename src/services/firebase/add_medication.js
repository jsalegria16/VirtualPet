import firestore from '@react-native-firebase/firestore';

const addConfirmation = async (userId, time, confirmationStatus, medicationName) => {
    const referencia = firestore().collection('Usuarios').doc(userId);

    try {
        const docSnapshot = await referencia.get();

        if (!docSnapshot.exists) {
            // Crear el documento si no existe
            await referencia.set({
                confirmaciones: {
                    [time]: {
                        [medicationName]: confirmationStatus, // Asocia el medicamento con su estado
                    },
                },
            });
        } else {
            // Actualizar el documento si ya existe
            await referencia.update({
                [`confirmaciones.${time}.${medicationName}`]: confirmationStatus, // Actualiza solo el medicamento y su estado
            });
        }

        console.log(`Confirmación agregada: ${medicationName} a las ${time}`);
    } catch (error) {
        console.error('Error al agregar confirmación: ', error);
    }
};

export default addConfirmation;



// // addConfirmation.js
// // import { DB } from "./firebase";
// // import { doc, updateDoc } from "firebase/firestore";

// import firestore from '@react-native-firebase/firestore';

// const addConfirmation = async (userId, date, confirmationStatus, medicationName) => {

//     const referencia = firestore().collection('Usuarios').doc(userId);

//     try {
//         const docSnapshot = await referencia.get();
//         if (!docSnapshot.exists) {
//             // Crear el documento si no existe
//             await referencia.set({
//                 confirmaciones: {
//                     [date]: confirmationStatus
//                 }
//             });
//         } else {
//             // Actualizar el documento si ya existe
//             await referencia.update({
//                 [`confirmaciones.${date}`]: confirmationStatus
//             });
//         }
//         console.log("Confirmación agregada correctamente");
//     } catch (error) {
//         console.error("Error al agregar confirmación: ", error);
//     }

//     // try {
//     //     await referencia.update(
//     //         {
//     //             [`confirmaciones.${date}`]: confirmationStatus
//     //         }
//     //     )
//     // } catch (error) {
//     //     console.error("Error al agregar confirmación: ", error);
//     // }

// };

// export default addConfirmation;

