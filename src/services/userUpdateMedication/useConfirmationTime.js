import { useState, useEffect } from 'react';
import getMedications from '../firebase/get_medications';

const useConfirmationTime = (userId) => {

    const [confirmationTime, setConfirmationTime] = useState(null);
    // necesito un medicationId para poder hacer el update de la confirmacion de la toma de medicamentos
    const [medicationId, setMedicationId] = useState(null);


    const checkAndSetConfirmationTime = async () => {

        console.log('Estoy en checkAndSetConfirmationTime')
        try {
            const now = new Date(); // Hora actual en formato ISO
            const medications = await getMedications(userId);
            console.log(' Estos son los meds: ', medications);
            if (!medications) return;

            // Verificar cada medicamento
            // medications.forEach((med) => {
            for (const med of medications) {
                console.log('- - - - - - - - -- - -  -- -  -- - - - - -  - - - - -- ');
                console.log('Estoy en el forEach  :')
                console.log(med.hora, '>>', med.medicamento, '>>', new Date(med.hora).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }), '>>', med.status);

                // Si ya está confirmado, no hacer nada
                if (med.status) {
                    console.log('Medicamento ya confirmado:', med.medicamento);
                    // return;
                    setConfirmationTime(null);
                    setMedicationId(null);
                    continue;
                }


                const medicationTime = new Date(med.hora); // Si times es ISO, se convierte directamente
                const windowStart = new Date(medicationTime.getTime() - 10 * 60 * 1000); // 10 min antes
                const windowEnd = new Date(medicationTime.getTime() + 10 * 60 * 1000);  // 10 min después

                console.log('now:', now, '>>', new Date(now).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })); // Hora actual
                console.log('medicationTime:', medicationTime, '>>', new Date(medicationTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }));
                console.log('windowStart:', windowStart, '>>', new Date(windowStart).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }));
                console.log('windowEnd:', windowEnd, '>>', new Date(windowEnd).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }));
                console.log('- - - - - - - - -- - -  -- -  -- - - - - -  - - - - -- ');

                if (now >= windowStart && now <= windowEnd) {
                    setConfirmationTime(medicationTime); // Usa el formato ISO para mayor precisión
                    console.log(`Hora de confirmación exacta almacenada: ${confirmationTime}`);
                    setMedicationId(med.id);
                    console.log('MedicationId:', medicationId);
                } else {
                    console.log(med.medicamento, "No está en la ventana de confirmación");
                }
            }
            // });
        } catch (error) {
            console.error('Error al verificar la hora de confirmación:', error);
        }
    };

    return { confirmationTime, checkAndSetConfirmationTime, medicationId };
};

export default useConfirmationTime;
