import React, { createContext, useContext } from 'react';

import useNfcWithStorage from '../services/LocalStorage/useNfcWithStorage'; // El hook que manejamos anteriormente para enviar al storage los registros nfc
import usePetGrowth from '../services/usePetGrowth/usePetGrowth'; // Importa el hook para manejar el crecimiento de la mascota
import useMedManagement from '../services/MedManagement/useMedManagement';

import useUserId from '../services/createUserID/useUserId'
import useDailyValidation from '../services/userDailyValidation/useDailyValidation';
import useConfirmationTime from '../services/userUpdateMedicationStatus/useConfirmationTime';
import useUpdateMedication from '../services/userUpdateMedicationStatus/useUpdateMedicationStatus';
import useRoleManagement from '../services/RoleManagement/useRoleManagement';

const NfcContext = createContext();

export const useNfc = () => {
  return useContext(NfcContext);
};

export const NfcProvider = ({ children }) => {

  //Logica para hacer un ID unico de usuario.
  const { userId } = useUserId();

  //Logica para mostrar las etiquetas nfc registradas
  const { tagInfo } = useNfcWithStorage(); // Hook que obtiene los datos

  // Lógica para hacer crecer la mascota cuando se detecta una etiqueta NFC
  // Conexion entre crecimeinto y lectura nfc
  const { petStage, petHumor, growPet } = usePetGrowth(); // Hook que maneja el crecimiento de la mascota

  // Logica para agregar un medicamento desde la ventana de confs
  const { medName, setMedName, times, setTimes, handleAddMedication, loadMedRegiment, medications } = useMedManagement(userId);

  // Logica de confirmacion individual de la toma de medicamentos
  //Hook para realizar la actualizaciond e confoirmacion de la toma de medicamento individual
  const { updateMedicationStatus } = useUpdateMedication(); // Inicializa el hook para actualizar medicamentos de un solo usuario
  //Hook para manejar hora exacta de confirmacion de la toma de medicamentos,e s llamado dentro de updateMedicationStatus >>
  // const checkAndSetConfirmationTime = async (updateMedicationStatus) ...

  const { checkAndSetConfirmationTime } = useConfirmationTime(userId);

  // Logica relacionada con las validaciones grupales de la toma del medicamento y crecimiento de la mascota
  const { validateAndGrowPet } = useDailyValidation(growPet); // Hook que maneja la validación de la toma de medicamentos

  //Logica para el intercambio de roles
  const { currentRoleUserId, currentRoleName, } = useRoleManagement(userId);


  // Entrada a la aplicacion y funcionamiento.
  React.useEffect(() => {
    // Verifica si hay una etiqueta NFC y si la fecha de confirmación es válida
    if (tagInfo) {
      (async () => {
        await checkAndSetConfirmationTime(validateAndGrowPet, updateMedicationStatus); // Actualiza el estado del medicamento para el usuario
        // await validateAndGrowPet(growPet); // Valida si todos los usuarios completaron sus medicamentos
      })();
    }

  }, [tagInfo]); // Se dispara cada vez que cambia la etiqueta NFC y la fecha de confirmación


  return (
    <NfcContext.Provider value={{
      //Para la generacion de ID unico de usuario
      userId,

      //Historial de registros nfc
      tagInfo,
      // nfcError,

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

      //Para rotar el rol
      currentRoleUserId,
      currentRoleName,

    }}>
      {children}
    </NfcContext.Provider>
  );
};
