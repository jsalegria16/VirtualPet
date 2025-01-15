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


    const messagePayload = {
        // notification: { // si coloco esto, suna por defecto el celular
        //     title: '¡Tu mascota ha crecido!',
        //     body: `La mascota ha crecido.`,
        // },
        data: {
            type, // Clave identificadora para la notificación
        },
        tokens: tokens,
    };



    try {
        const response = await admin.messaging().sendEachForMulticast(messagePayload);
        return res.status(200).send({ success: true, response });
    } catch (error) {
        console.error('Error enviando mensaje:', error);
        return res.status(500).send({ success: false, error });
    }
});

//Para enviar mensajes de el crecimiento de la mascota
exports.sendMessagePetHasGrownth = functions.https.onRequest(async (req, res) => {
    const { tokens } = req.body;

    if (!tokens) {
        return res.status(400).send({ error: 'Faltan parámetros necesarios' });
    }


    const messagePayload = {
        // notification: { // si coloco esto, suna por defecto el celular
        //     title: '¡Tu mascota ha crecido!',
        //     body: `La mascota ha crecido.`,
        // },
        data: {
            type: 'PET_GROWTH', // Clave identificadora para la notificación
        },
        tokens: tokens,
    };



    try {
        const response = await admin.messaging().sendEachForMulticast(messagePayload);
        return res.status(200).send({ success: true, response });
    } catch (error) {
        console.error('Error enviando mensaje:', error);
        return res.status(500).send({ success: false, error });
    }
});