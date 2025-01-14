import notifee, { AndroidImportance, IntervalTrigger, TriggerType, TimeUnit, RepeatFrequency } from '@notifee/react-native';

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

export const displayScheduleMedicationReminder = async (medicationName, time) => {

    await notifee.requestPermission(); // Solicitar permisos (solo iOS, Android lo maneja automáticamente)

    // Crear el canal de notificación (Android)
    const setupNotificationChannel = await notifee.createChannel({
        id: 'medication-reminders',
        name: 'Recordatorios de Medicamentos',
        lights: true,
        vibration: true,
        importance: AndroidImportance.HIGH,
        sound: 'custom_sound',

    });

    const trigger_mine = {
        type: TriggerType.TIMESTAMP,
        timestamp: time.getTime(), // Hora en milisegundos
        repeatFrequency: RepeatFrequency.DAILY,
    };


    await notifee.createTriggerNotification(
        {
            // id: 'notifyremender', //No es necesario porque es aleatorio
            title: 'Hora de tomar tu medicamento',
            body: `Recuerda tomar ${medicationName}.`,
            android: {
                channelId: setupNotificationChannel,
            },
        },
        trigger_mine
    );

};

