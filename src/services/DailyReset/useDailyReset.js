import React from 'react';
import firestore from '@react-native-firebase/firestore';

const useDailyReset = (resetConfirmations) => {
    const [resetHour, setResetHour] = React.useState(null); // Almacena la hora desde la DB
    const [resetMinute, setResetMinute] = React.useState(null); // Almacena los minutos desde la DB

    // Escucha los cambios en Firestore
    React.useEffect(() => {
        const unsubscribe = firestore()
            .collection('config')
            .doc('dailyReset')
            .onSnapshot((doc) => {
                if (doc.exists) {
                    const data = doc.data();
                    setResetHour(data.hour); // Actualiza la hora
                    setResetMinute(data.minute); // Actualiza los minutos
                    console.log('Configuración de reinicio actualizada:', data);
                }
            });

        return () => unsubscribe(); // Limpia la suscripción al desmontar
    }, []);

    return { resetHour, resetMinute };
};

export default useDailyReset;
