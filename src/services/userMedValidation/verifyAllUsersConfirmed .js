// import firestore from '@react-native-firebase/firestore';
// import { useNfc } from '../../context/NfcContext';

// export const verifyAllUsersConfirmed = async (date) => {
//     if (!date) {
//         console.error('Fecha no proporcionada');
//         return;
//     }

//     // Obtén el contexto necesario
//     const { growPet } = useNfc();

//     const usersRef = firestore().collection('users');

//     try {
//         const snapshot = await usersRef.get();
//         let allConfirmed = true;

//         snapshot.forEach(doc => {
//             const confirmations = doc.data().confirmations;
//             if (!confirmations || !confirmations[date]) {
//                 allConfirmed = false;
//             }
//         });

//         if (allConfirmed) {
//             console.log('Todos los usuarios han confirmado. ¡Haz crecer la mascota!');
//             growPet();  // Llama a la función del contexto
//         } else {
//             console.log('No todos los usuarios han confirmado.');
//         }
//     } catch (error) {
//         console.error('Error al verificar confirmaciones:', error);
//     }
// };
