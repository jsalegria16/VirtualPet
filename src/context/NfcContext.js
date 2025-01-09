import React, { createContext, useContext } from 'react';

import useNfcWithStorage from '../services/LocalStorage/useNfcWithStorage'; // El hook que manejamos anteriormente para enviar al storage los registros nfc
import usePetGrowth from '../services/usePetGrowth_LocalStor/usePetGrowth'; // Importa el hook para manejar el crecimiento de la mascota
import useMedManagement from '../services/MedManagement/useMedManagement';

import useUserId from '../services/createUserID/useUserId'
import useDailyValidation from '../services/userDailyValidation/useDailyValidation';
import useConfirmationTime from '../services/userUpdateMedicationStatus/useConfirmationTime';
import useUpdateMedication from '../services/userUpdateMedicationStatus/useUpdateMedicationStatus';
import useDailyReset from '../services/DailyReset/useDailyReset';

const NfcContext = createContext();

export const useNfc = () => {
  return useContext(NfcContext);
};

export const NfcProvider = ({ children }) => {

  //Logica para hacer un ID unico de usuario.
  const { userId } = useUserId();

  //Logica para mostrar las etiquetas nfc registradas
  const { tagInfo, nfcError, scanHistory } = useNfcWithStorage(); // Hook que obtiene los datos

  // Lógica para hacer crecer la mascota cuando se detecta una etiqueta NFC
  // Conexion entre crecimeinto y lectura nfc
  const { petStage, growPet } = usePetGrowth(); // Hook que maneja el crecimiento de la mascota

  // Logica para agregar un medicamento desde la ventana de confs
  const { medName, setMedName, times, setTimes, handleAddMedication, loadMedRegiment, medications } = useMedManagement(userId);

  // Logica de confirmacion individual de la toma de medicamentos
  //Hook para realizar la actualizaciond e confoirmacion de la toma de medicamento individual
  const { updateMedicationStatus } = useUpdateMedication(); // Inicializa el hook para actualizar medicamentos de un solo usuario
  //Hook para manejar hora exacta de confirmacion de la toma de medicamentos,e s llamado dentro de updateMedicationStatus >>
  // const checkAndSetConfirmationTime = async (updateMedicationStatus) ...

  const { checkAndSetConfirmationTime } = useConfirmationTime(userId);

  // Logica relacionada con las validaciones grupales de la toma del medicamento y crecimiento de la mascota
  const { validateAndGrowPet, resetConfirmations } = useDailyValidation(); // Hook que maneja la validación de la toma de medicamentos

  //Logica para manejar reset diario desde Firestore
  const { resetHour, resetMinute } = useDailyReset(resetConfirmations);

  //Entrada a la aplicaicion y funcionamiento.
  React.useEffect(() => {
    // if (tagInfo) {

    //   checkAndSetConfirmationTime().then(() => {

    //     if (confirmationTime) {

    //       // Actualiza el estado del medicamento para el usuario
    //       updateMedicationStatus();

    //       // growPet(); // Hacemos crecer la mascota cuando se detecta una etiqueta NFC
    //       //validateAndGrowPet(growPet); // Validamos la toma de medicamentos de todos al detectar una etiqueta NFC
    //     }

    //   })

    // }
    if (tagInfo) {
      (async () => {
        await checkAndSetConfirmationTime(updateMedicationStatus); // Actualiza el estado del medicamento para el usuario
        await validateAndGrowPet(growPet); // Valida si todos los usuarios completaron sus medicamentos
      })();
    }

  }, [tagInfo]); // Se dispara cada vez que cambia la etiqueta NFC y la fecha de confirmación

  // Temporizador PAra validacion al final del dia(O una hora en especial)
  React.useEffect(() => {
    const timer = setInterval(async () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinutes = now.getMinutes();

      // Verifica si el horario desde Firestore está configurado
      if (resetHour !== null && resetMinute !== null) {
        // Ejecutar la validación al final del día (ajusta según tus necesidades)
        console.log(`Ejecutando reinicio diario al final del día...(Algo cambio en la DB)
          ${resetHour}: ${resetMinute}} 
          ${currentHour}: ${currentMinutes}`)
        if (currentHour === resetHour && currentMinutes === resetMinute) {
          console.log('Ejecutando reinicio diario al final del día...');
          // Llama a resetConfirmations para reiniciar los estados
          await resetConfirmations();
        }
      }
    }, 60000); // Verifica cada minuto

    return () => clearInterval(timer); // Limpia el intervalo al desmontar el contexto
  }, [resetHour, resetMinute]);

  return (
    <NfcContext.Provider value={{
      //Para la generacion de ID unico de usuario
      userId,

      //Historial de registros nfc
      tagInfo,
      nfcError,
      scanHistory,

      //PAra el crecimento de la mascota
      petStage,      // Proporcionamos el estado actual de la mascota
      growPet,        // Proporcionamos la función para hacer crecer la mascota (si quieres usarla de forma independiente en otro lugar)

      //Para la agregacion de medicamentos 
      medName,
      setMedName,
      times,
      setTimes,
      handleAddMedication,
      loadMedRegiment,
      medications,

      //Hora e Idmedication de confirmacion de la toma de medicamentos 
      checkAndSetConfirmationTime,

      // Para pasar a true la confirmacion de la toma de medicamentos de cada usuaario
      updateMedicationStatus,

      // para la validacion de la toma de medicamentos de todos
      validateAndGrowPet,

    }}>
      {children}
    </NfcContext.Provider>
  );
};
