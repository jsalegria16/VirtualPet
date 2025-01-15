export const sendMessageToDevices = async (tokens, type) => {
    try {
        const response = await fetch('https://us-central1-virtualpet-2024.cloudfunctions.net/sendMessagesToUsers', {
            // const response = await fetch('http://127.0.0.1:5001/virtualpet-2024/us-central1/sendMessagePetHasGrownth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tokens,
                type,
            }),
        });

        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }

        const responseData = await response.json();
        console.log('Respuesta del servidor:', responseData);
    } catch (error) {
        console.error('Error enviando mensaje a dispositivos:', error.message);
    }
};

