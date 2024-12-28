import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadState_online, growPet_online } from '../firebase/grow_pet';
import firestore from '@react-native-firebase/firestore';

// Hook para manejar el crecimiento de la mascota
const usePetGrowth = () => {
  const [petStage, setPetStage] = useState('small'); // Estados: small, medium, large

  // Cargar el estado de la mascota desde Firestore o Local Storage


  // Guardar el estado de la mascota en AsyncStorage
  const savePetState = async (newStage) => {
    try {
      await AsyncStorage.setItem('petStage', newStage); // Guardar localmente
    } catch (error) {
      console.error('Error guardando el estado de la mascota en AsyncStorage:', error);
    }
  };

  // Cambiar el estado de la mascota
  const growPet = async () => {
    let newStage = petStage;
    if (petStage === 'small') {
      newStage = 'medium'; // Crecer de pequeño a mediano
    } else if (petStage === 'medium') {
      newStage = 'large'; // Crecer de mediano a grande
    } else if (petStage === 'large') {
      newStage = 'small'; // Si está en grande, volver a pequeño
    }

    setPetStage(newStage); // Actualizar el estado local
    savePetState(newStage); // Guardar el nuevo estado en AsyncStorage

    // Guardar el nuevo estado en Firebase
    growPet_online(newStage);

  };

  // Sincronización en tiempo real con Firestore
  useEffect(() => {
    const loadPetState = async () => {
      await loadState_online; // Cargar desde Firestore
      // Intenta retornar esto si no funciona
    };
    loadPetState(); // Cargar el estado al montar el componente
    const subscriber = firestore()
      .collection('PetState')
      .doc('mascota')
      .onSnapshot(
        (documentSnapshot) => {
          if (documentSnapshot.exists) {
            const data = documentSnapshot.data();
            if (data && data.estado !== undefined) {
              setPetStage(data.estado);
              savePetState(data.estado); // Solo como respaldo
              console.log(`Estado sincronizado desde Firebase: ${data.estado}`);
            }
          } else {
            console.warn('El documento "mascota" no existe en la colección "PetState".');
          }
        },
        (error) => {
          console.error('Error al obtener el documento desde Firestore:', error);
        }
      );

    return () => subscriber(); // Limpieza del listener al desmontar
  }, []); // 
  return { petStage, growPet }; // Retornamos el estado actual de la mascota y la función para crecerla
};

export default usePetGrowth;

// import { useState, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { loadState_online, growPet_online } from '../firebase/grow_pet';

// import firestore from '@react-native-firebase/firestore';

// // Hook para manejar el crecimiento de la mascota
// const usePetGrowth = () => {

//   // Los tres estados de la mascota
//   const [petStage, setPetStage] = useState('small'); // Estados: small, medium, large

//   // Función para cargar el estado de la mascota desde AsyncStorage
//   const loadPetState = async () => {

//     // Aqui ya desde firestore
//     loadState_online();
//     // const referencia = firestore().collection('PetState').doc('mascota');
//     // try {
//     //   const savedPetStage = (await referencia.get()).data.estado;
//     //   if (savedPetStage) {
//     //     setPetStage(savedPetStage); // Si hay un estado guardado, lo usamos
//     //   }
//     // } catch (error) {
//     //   console.error('Error cargando el estado de la mascota:', error);
//     // }
//     ///
//     ///

//     // Aqui desde el local storage
//     // try {
//     //   const savedPetStage = await AsyncStorage.getItem('petStage');
//     //   if (savedPetStage) {
//     //     setPetStage(savedPetStage); // Si hay un estado guardado, lo usamos
//     //   }
//     // } catch (error) {
//     //   console.error('Error cargando el estado de la mascota:', error);
//     // }



//   };

//   // Función para guardar el estado de la mascota en AsyncStorage
//   const savePetState = async (newStage) => {
//     try {
//       await AsyncStorage.setItem('petStage', newStage); // Guardar el estado actual en AsyncStorage
//     } catch (error) {
//       console.error('Error guardando el estado de la mascota:', error);
//     }
//   };

//   // Función para hacer que la mascota crezca
//   const growPet = async () => {
//     let newStage = petStage;
//     if (petStage === 'small') {
//       newStage = 'medium'; // Crecer de pequeño a mediano
//     } else if (petStage === 'medium') {
//       newStage = 'large'; // Crecer de mediano a grande
//     } else if (petStage === 'large') {
//       newStage = 'small'; // Si está en grande, volver a pequeño
//     }

//     setPetStage(newStage); // Actualizar el estado local
//     savePetState(newStage); // Guardar el nuevo estado en AsyncStorage

//     // Guaarademos esto en firebase
//     growPet_online(newStage);
//     // try {
//     //   await firestore()
//     //     .collection('PetState')
//     //     .doc('mascota')
//     //     .update({ estado: newStage });
//     // } catch (error) {
//     //   console.error('Error al actualizar el estado en Firestore:', error);
//     // }


//   };

//   // Cargar el estado de la mascota cuando se inicia la app
//   useEffect(() => {
//     loadPetState(); // Cargar el estado al montar el componente

//     /// NUevo codigo para estado sincrinizado en varios telefonos
//     // useMonitorPetState;
//     const subscriber = firestore()
//       .collection('PetState')
//       .doc('mascota')
//       .onSnapshot(
//         (documentSnapshot) => {
//           if (documentSnapshot.exists) {
//             const data = documentSnapshot.data();
//             if (data && data.estado !== undefined) {
//               setPetStage(data.estado);
//               savePetState(data.estado);
//             }
//           } else {
//             console.warn('El documento "mascota" no existe en la colección "PetState".');
//           }
//         },
//         (error) => {
//           console.error('Error al obtener el documento:', error);
//         }
//       );

//     return () => subscriber();

//   }, []);

//   return { petStage, growPet }; // Retornamos el estado actual de la mascota y la función para crecerla
// };

// export default usePetGrowth;
