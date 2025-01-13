import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const RegisterNameModal = ({ userId, onNameRegistered }) => {
    const [name, setName] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const checkFirstLaunch = async () => {
            try {
                const isNameRegistered = await AsyncStorage.getItem('isNameRegistered');
                if (!isNameRegistered) {
                    setIsVisible(true); // Mostrar el modal si el nombre no está registrado
                }
            } catch (error) {
                console.error('Error al verificar el estado de registro:', error);
            }
        };

        checkFirstLaunch();
    }, []);

    const handleRegisterName = async () => {
        if (!name.trim()) {
            alert('Por favor, ingresa un nombre.');
            return;
        }

        try {
            // Guardar el nombre en Firebase
            await firestore().collection('Usuarios').doc(userId).update({
                Nombre: name,
            });

            // Actualizar AsyncStorage para que el modal no vuelva a mostrarse
            await AsyncStorage.setItem('isNameRegistered', 'true');

            setIsVisible(false);
            onNameRegistered(); // Notificar que se completó el registro del nombre
        } catch (error) {
            console.error('Error al registrar el nombre:', error);
        }
    };

    return (
        <Modal
            transparent
            visible={isVisible}
            animationType="slide"
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>Registra tu Nombre</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ingresa tu nombre"
                        value={name}
                        onChangeText={setName}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleRegisterName}>
                        <Text style={styles.buttonText}>Registrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#1E90FF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default RegisterNameModal;
