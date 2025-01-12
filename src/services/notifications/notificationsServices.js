import notifee, { AndroidImportance } from '@notifee/react-native';

export const displayGrowthNotification = async () => {

    await notifee.requestPermission(); // Solicitar permisos (solo iOS, Android lo maneja automáticamente)

    // Crear el canal de notificación (Android)
    const channelId_pet_growth = await notifee.createChannel({
        id: 'pet_growth',
        name: 'Crecimiento de la Mascota',
        lights: true,
        vibration: true,
        importance: AndroidImportance.HIGH,
        sound: 'custom_sound',
    });

    // Mostrar la notificación
    await notifee.displayNotification({
        title: '¡Felicidades La mascota Creció!',
        body: 'Todos tomaron sus medicamentos y tu mascota ha crecido.',
        android: {
            channelId: channelId_pet_growth,
        },
    });
};
