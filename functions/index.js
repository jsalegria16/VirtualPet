/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
const { onDocumentCreated } = require("firebase-functions/v2/firestore");

// The Firebase Admin SDK to access Firestore.
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
initializeApp();
const firestore = admin.firestore();

// Schedule
const { onSchedule } = require("firebase-functions/v2/scheduler");


// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// Take the text parameter passed to this HTTP endpoint and insert it into
// Firestore under the path /messages/:documentId/original

// Función HTTP para enviar mensajes, de prueba
exports.sendMessage = functions.https.onRequest(async (req, res) => {
    const { receiverToken, message } = req.body;

    if (!receiverToken || !message) {
        return res.status(400).send({ error: 'Faltan parámetros necesarios' });
    }

    const messagePayload = {
        notification: {
            title: 'Nuevo mensaje',
            body: message,
        },
        token: receiverToken,
    };

    try {
        const response = await admin.messaging().send(messagePayload);
        return res.status(200).send({ success: true, response });
    } catch (error) {
        console.error('Error enviando mensaje:', error);
        return res.status(500).send({ success: false, error });
    }
});

//Para enviar mensajes de el crecimiento de la mascota y recordatorio del rol  (variable type)
exports.sendMessagesToUsers = functions.https.onRequest(async (req, res) => {
    const { tokens, type } = req.body;

    if (!tokens) {
        return res.status(400).send({ error: 'Faltan parámetros necesarios' });
    }

    // Configuración según el tipo de notificación
    let notificationTitle, notificationBody, channelId, sound;

    switch (type) {
        case 'PET_GROWTH':
            notificationTitle = '¡Tu mascota ha crecido!';
            notificationBody = 'Todos tomaron sus medicamentos y la mascota ha crecido.';
            channelId = 'pet_growth';
            sound = 'pethadgrowth';
            break;

        case 'ROLE_REMINDER':
            notificationTitle = 'Recordatorio de los otros usuarios ';
            notificationBody = 'Los demás usuarios están tomando y confirmando sus medicamentos';
            channelId = 'role_reminder';
            sound = 'rolreminder';
            break;


        default:
            return res.status(400).send({ error: 'Tipo de notificación desconocido' });
    }

    const messagePayload = {
        data: {
            type, // Identificador de la notificación para manejarla en la app
        },
        notification: {
            title: notificationTitle,
            body: notificationBody,
        },
        android: {
            priority: 'high', // Prioridad alta para asegurar la entrega en segundo plano
            notification: {
                channelId: channelId,
                sound: sound,
            },
        },
        tokens: tokens, // Lista de tokens FCM
    };

    try {
        const response = await admin.messaging().sendEachForMulticast(messagePayload);
        return res.status(200).send({ success: true, response });
    } catch (error) {
        console.error('Error enviando mensaje:', error);
        return res.status(500).send({ success: false, error });
    }
});

// exports.scheduledTasks = onSchedule('* * * * *', async (event) => {
//     console.log('Ejecutando tarea programada cada minuto');
// });

// Función programada para reiniciar confirmaciones y rotar roles
// exports.scheduledTasks = onSchedule('0 0 * * *', async (event) => { //ignifica que la función se ejecutará todos los días a las 00:0
// exports.scheduledTasks = onSchedule('0 23 * * *', async (event) => { //ignifica que la función se ejecutará todos los días a las 23:0
exports.scheduledTasks = onSchedule('* * * * *', async (event) => { //ignifica que la función se ejecutará cada minuto
    console.log('Ejecutando tareas programadas: reinicio de confirmaciones y cambio de rol');

    try {
        // 1. Reiniciar confirmaciones
        await resetConfirmations();

        // 2. Cambiar rol
        await rotateRole();

        console.log('Tareas completadas exitosamente');
    } catch (error) {
        console.error('Error al ejecutar tareas programadas:', error);
    }
});

// Función para reiniciar confirmaciones
const resetConfirmations = async () => {
    console.log('Iniciando reinicio de confirmaciones...');
    let allConfirmed = true; // Bandera para verificar si todos los medicamentos fueron confirmados

    try {
        const usersRef = firestore.collection('Usuarios');
        const usersSnapshot = await usersRef.get();

        for (const userDoc of usersSnapshot.docs) {
            const userConfirmations = userDoc.data()?.confirmaciones || {};

            const resetData = Object.fromEntries(
                Object.entries(userConfirmations).map(([medicationId, medicationData]) => [
                    medicationId,
                    { ...medicationData, status: false },
                ])
            );

            await usersRef.doc(userDoc.id).update({
                confirmaciones: resetData,
            });

            console.log(`Confirmaciones reiniciadas para el usuario ${userDoc.id}`);
            console.log('Reinicio de confirmaciones completado');
            // Verificar si hay al menos un medicamento con status: false
            Object.values(userConfirmations).forEach((conf) => {
                if (conf.status === false) {
                    allConfirmed = false;
                }
            });
        }

        // Logica para actualizar el estado de la mascota
        const referenciaMascota = firestore.collection('PetState').doc('mascota');
        const petStateSnapshot = await referenciaMascota.get();
        const petState = petStateSnapshot.data()?.estado;

        if (!allConfirmed) {
            // Cambiar al estado triste si no todos los medicamentos fueron confirmados
            if (!petState.includes('_sad')) {
                const sadState = petState.replace('_happy', '_sad');
                await referenciaMascota.update({ estado: sadState });
                console.log('La mascota ahora está triste:', sadState);
            } else {
                console.log('La mascota ya estaba en estado triste. No se realizaron cambios.');
            }
        } else {
            console.log('Todos los medicamentos fueron confirmados. El estado de la mascota no cambia.');
        }

    } catch (error) {
        console.error('Error al reiniciar confirmaciones:', error);
    }
};

// Función para cambiar rol
const rotateRole = async () => {
    console.log('Iniciando rotación de roles...');
    try {
        const rolesRef = firestore.collection('config').doc('roles_config');
        const rolesDoc = await rolesRef.get();

        if (!rolesDoc.exists) {
            throw new Error('El documento roles_config no existe.');
        }

        const data = rolesDoc.data();
        const rotationOrder = data.rotationOrder || [];
        let currentIndex = parseInt(data.currentIndex, 10) || 0;

        // Rotar al siguiente usuario
        currentIndex = (currentIndex + 1) % rotationOrder.length;

        await rolesRef.update({
            currentRoleUser: rotationOrder[currentIndex],
            currentIndex: currentIndex.toString(),
        });

        console.log(`Rol cambiado al usuario con ID: ${rotationOrder[currentIndex]}`);
    } catch (error) {
        console.error('Error al rotar rol:', error);
    }
};