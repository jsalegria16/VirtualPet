import { displayGrowthNotification, displayRoleRimderNotification } from './notificationsServices'

export const handleNotification = async (remoteMessage) => {

    try {
        const { type } = remoteMessage.data;


        switch (type) {
            case 'PET_GROWTH':
                // Llamar a la función que muestra la notificación de crecimiento
                await displayGrowthNotification();
                break;

            case 'ROLE_REMINDER':
                await displayRoleRimderNotification();
                break;

            default:
                console.log('Tipo de notificación desconocido:', type);
                break;
        }
    } catch (error) {
        console.error('Error manejando la notificación:', error);
    }
};
