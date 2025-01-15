import notifee, { AndroidImportance, IntervalTrigger, TriggerType, TimeUnit, RepeatFrequency } from '@notifee/react-native';

//Las diferentes notificaciones que crearé

// Notificacion para cuando la mascota crece
export const displayGrowthNotification = async () => {

    await notifee.requestPermission(); // Solicitar permisos (solo iOS, Android lo maneja automáticamente)

    // Crear el canal de notificación (Android)
    const channelId_pet_growth = await notifee.createChannel({
        id: 'pet_growth',
        name: 'Crecimiento de la Mascota',
        lights: true,
        vibration: true,
        importance: AndroidImportance.HIGH,
        sound: 'pethadgrowth',
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


// Notificacion delpor parte del rol recordador
export const displayRoleRimderNotification = async () => {

    await notifee.requestPermission(); // Solicitar permisos (solo iOS, Android lo maneja automáticamente)

    // Crear el canal de notificación (Android)
    const channelId_Role_Reminder = await notifee.createChannel({
        id: 'Role_Reminder',
        name: 'Recordatorio por parte del ROL',
        lights: true,
        vibration: true,
        importance: AndroidImportance.HIGH,
        sound: 'rolreminder',
    });

    // Mostrar la notificación
    await notifee.displayNotification({
        title: 'No olvides tomar tus medicamentos',
        body: 'Los demás usuarios están tomando y confirmando sus medicamentos',
        android: {
            channelId: channelId_Role_Reminder,
        },
    });
};


// Notificacion para cuando se conforma un medicamento
export const displayConfirmationNotification = async () => {

    await notifee.requestPermission(); // Solicitar permisos (solo iOS, Android lo maneja automáticamente)

    // Crear el canal de notificación (Android)
    const channelId_Confirmate_notification = await notifee.createChannel({
        id: 'Confirmate_notification',
        name: 'Confirmacion de la notificacion',
        lights: true,
        vibration: true,
        importance: AndroidImportance.HIGH,
        sound: 'confimatemedication',
    });

    // Mostrar la notificación
    await notifee.displayNotification({
        title: 'Has tomado y confirmado tu medicación',
        body: 'Los demás usuarios están tomando y confirmando sus medicamentos',
        android: {
            channelId: channelId_Confirmate_notification,
        },
    });
};



// Nofiticacion de recordatorio de toma de medicamento
export const displayScheduleMedicationReminder = async (medicationName, time) => {

    await notifee.requestPermission(); // Solicitar permisos (solo iOS, Android lo maneja automáticamente)

    // Crear el canal de notificación (Android)
    const setupNotificationChannel = await notifee.createChannel({
        id: 'medication-reminders',
        name: 'Recordatorios de Medicamentos',
        lights: true,
        vibration: true,
        importance: AndroidImportance.HIGH,
        sound: 'medicationtime',

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
            body: `Recuerda tomar ${medicationName} y confirmar para el crecimiento de la mascota`,
            android: {
                channelId: setupNotificationChannel,
            },
        },
        trigger_mine
    );

};