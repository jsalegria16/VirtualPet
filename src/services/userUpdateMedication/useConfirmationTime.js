import { useState, useEffect } from 'react';
import getMedications from '../firebase/get_medications';

const useConfirmationTime = (userId) => {

    const [confirmationTime, setConfirmationTime] = useState(null);
    // necesito un medicationId para poder hacer el update de la confirmacion de la toma de medicamentos
    const [medicationId, setMedicationId] = useState(null);

    const combineDateAndTime = (dateISO, timeString) => {
        // Toma una fecha base en ISO y reemplaza la hora con el timeString recibido
        const [time, modifier] = timeString.split(' '); // Divide "12:00 AM" en ["12:00", "AM"]
        let [hours, minutes] = time.split(':').map(Number);

        if (modifier === 'PM' && hours < 12) hours += 12; // Ajusta horas PM
        if (modifier === 'AM' && hours === 12) hours = 0; // Ajusta 12 AM a 0 horas

        // Crea una nueva fecha con la misma fecha base y la hora ajustada
        const baseDate = new Date(dateISO);
        baseDate.setHours(hours, minutes, 0, 0); // Actualiza la hora

        return baseDate;
    };


    const checkAndSetConfirmationTime = async () => {

        console.log('Estoy en checkAndSetConfirmationTime')
        try {
            const now = new Date(); // Hora actual en formato ISO
            const medications = await getMedications(userId);
            console.log(' Estos son los meds: ', medications);
            if (!medications) return;

            // Verificar cada medicamento
            medications.forEach((med) => {
                // Si ya está confirmado, no hacer nada
                if (!med.status) {

                    // Combina la fecha actual con la hora recibida
                    const medicationTime = combineDateAndTime(now.toISOString(), med.hora);
                    const windowStart = new Date(medicationTime.getTime() - 10 * 60 * 1000); // 10 minutos antes
                    const windowEnd = new Date(medicationTime.getTime() + 10 * 60 * 1000);  // 10 minutos después

                    console.log('- - - - - - - - -- - -  -- -  -- - - - - -  - - - - -- ');
                    console.log('Estoy en el forEach  :')
                    console.log(med.hora, '>>', med.medicamento, '>>', med.status);
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
            });
        } catch (error) {
            console.error('Error al verificar la hora de confirmación:', error);
        }
    };

    return { confirmationTime, checkAndSetConfirmationTime, medicationId };
};

export default useConfirmationTime;
