
---
# Tabla de contenido
- [Tabla de contenido](#tabla-de-contenido)
- [Virtual Pet](#virtual-pet)
  - [📋 Características Principales](#-características-principales)
  - [🖼️ Capturas de Pantalla](#️-capturas-de-pantalla)
    - [**HomeScreen**](#homescreen)
    - [**SettingsScreen**](#settingsscreen)
  - [🛠️ Tecnologías Utilizadas](#️-tecnologías-utilizadas)
- [Getting Started](#getting-started)
  - [Clona este repositorio:](#clona-este-repositorio)
  - [Instala las dependecias:](#instala-las-dependecias)
  - [Configura tu proyecto de Firebase:](#configura-tu-proyecto-de-firebase)
  - [Step 1: Start the Metro Server](#step-1-start-the-metro-server)
  - [Step 2: Start your Application](#step-2-start-your-application)
    - [For Android](#for-android)
    - [For iOS](#for-ios)
  - [Step 3: Modifying your App](#step-3-modifying-your-app)
- [📚 Documentación Técnica](#-documentación-técnica)
- [🗂️ Estructura del Proyecto](#️-estructura-del-proyecto)
- [📝 Licencia](#-licencia)

---

# Virtual Pet

This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).


**Mascota Saludable** es una aplicación móvil diseñada para mejorar y apoyar la adherencia a la medicación en adultos mayores mediante un enfoque colaborativo y gamificado. La aplicación utiliza **React Native**, **Firebase** y etiquetas **NFC** para ofrecer una experiencia accesible, interactiva y motivadora, donde los usuarios cuidan de una mascota virtual que crece con el progreso colectivo de la confiramcion y toma de sus medicamentos

## 📋 Características Principales

1. **Registro de Medicamentos**: 
   - Agrega medicamentos con horarios específicos desde la pantalla de configuración.
   - Sincronización automática en tiempo real con Firebase.

2. **Confirmación de Medicamentos mediante NFC**:
   - Los usuarios confirman la toma de medicamentos acercando una etiqueta NFC asignada.

3. **Crecimiento de la Mascota Virtual**:
   - La mascota refleja el progreso colectivo en tiempo real, mostrando cambios de estado y crecimiento.

4. **Reinicio Diario Automático**:
   - Se reinician las confirmaciones diarias a una hora definida, manteniendo los ciclos diarios organizados.

5. **Intercambio de Roles**:
   - Los usuarios rotan roles, como el de recordador, para fomentar la colaboración grupal.

6. **Notificaciones Personalizadas**:
   - Recordatorios locales y grupales, integrados con Firebase Cloud Messaging y Notefee.

---

## 🖼️ Capturas de Pantalla

### **HomeScreen**

![alt text](./readme_imgs/home1.png)
### **SettingsScreen**
![alt text](./readme_imgs/settings1.png)

---

## 🛠️ Tecnologías Utilizadas

- **React Native**: Desarrollo de la interfaz de usuario.
- **Firebase**:
  - Firestore Database: Almacenamiento en tiempo real.
  - Firebase Cloud Functions: Automatización de procesos backend.
  - Firebase Cloud Messaging: Gestión de notificaciones.
- **React Navigation**: Navegación entre pantallas.
- **react-native-nfc-manager**: Gestión de etiquetas NFC.
- **Notifee**: Manejo avanzado de notificaciones.

---

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Clona este repositorio:

```bash
# clona el repositorio
git clone https://github.com/tu-nombre-de-usuario/mascota-saludable.git
```

## Instala las dependecias:

```bash
# Instalar dependencias
npm install
```
- Navega al directorio del proyecto:
```bash
cd VIRTUALPET
```

## Configura tu proyecto de Firebase:
- Visitar la documentacion oficial de [React Native Firebas](https://rnfirebase.io) 


## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

# 📚 Documentación Técnica
El repositorio incluye:

- Lógica del Crecimiento de la Mascota: Implementación en PetGrowthService.
- Gestión de Medicamentos: Servicios personalizados para registro y confirmación.
- Notificaciones: Configuración en NotificationService y Firebase Cloud Functions.
- Integración NFC: Configuración en NfcContext utilizando react-native-nfc-manager.

# 🗂️ Estructura del Proyecto

```paintext
src/
├── components/      # Componentes visuales reutilizables
├── context/         # Contextos de React para manejo global de estados
├── services/        # Hooks y servicios personalizados (e.g., DailyValidation, RoleManagement)
├── screens/         # Pantallas principales (HomeScreen, SettingsScreen)
├── firebase/        # serviciosp ara manejar la lógica de firebase
└── App.tsx          # Entrada principal de la aplicación

```

# 📝 Licencia
Este proyecto está bajo la Licencia MIT.


