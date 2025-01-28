import { displayGrowthNotification, displayMedicationReminder, displayRoleRimderNotification } from './notificationsServices'

export const handleNotification = async (remoteMessage) => {

    try {
        const { medicationName, time, type } = remoteMessage;

        switch (type) {
            case 'PET_GROWTH':
                // Llamar a la función que muestra la notificación de crecimiento
                await displayGrowthNotification();
                break;

            case 'ROLE_REMINDER':
                await displayRoleRimderNotification();
                break;

            case 'MEDICATION_REMINDER':
                await displayMedicationReminder(medicationName, time);
                break
            default:
                console.log('Tipo de notificación desconocido:', type);
                break;
        }
    } catch (error) {
        console.error('Error manejando la notificación:', error);
    }
};
