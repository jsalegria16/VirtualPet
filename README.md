# Virtual Pet

**Mascota Saludable** is a mobile application designed to improve medication adherence in older adults through a collaborative and gamified approach. The app uses **React Native**, **Firebase**, and **NFC tags** to provide an accessible, interactive, and motivating experience, where users take care of a virtual pet that grows based on collective progress in medication confirmation and intake.

---
# Tabla de contenido
- [Virtual Pet](#virtual-pet)
- [Tabla de contenido](#tabla-de-contenido)
- [Virtual Pet](#virtual-pet-1)
  - [📋 Key Features](#-key-features)
  - [🖼️ Capturas de Pantalla](#️-capturas-de-pantalla)
    - [**HomeScreen**](#homescreen)
    - [**SettingsScreen**](#settingsscreen)
  - [🛠️ Technologies Used](#️-technologies-used)
- [Getting Started](#getting-started)
    - [Clone the Repository:](#clone-the-repository)
  - [Install Dependencies:](#install-dependencies)
  - [Set Up Firebase:](#set-up-firebase)
  - [Step 1: Start the Metro Server](#step-1-start-the-metro-server)
  - [Step 2: Start your Application](#step-2-start-your-application)
    - [For Android](#for-android)
    - [For iOS](#for-ios)
  - [Step 3: Modifying your App](#step-3-modifying-your-app)
- [📚 Technical Documentation](#-technical-documentation)
- [🗂️ Estructura del Proyecto](#️-estructura-del-proyecto)
- [📝 Licencia](#-licencia)

---

# Virtual Pet

This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

**Mascota Saludable** is a mobile application designed to improve medication adherence in older adults through a collaborative and gamified approach. The app uses **React Native**, **Firebase**, and **NFC tags** to provide an accessible, interactive, and motivating experience, where users take care of a virtual pet that grows based on collective progress in medication confirmation and intake.


## 📋 Key Features

1. **Medication Registration**: 
   - Add medications with specific schedules from the settings screen.
   - Real-time synchronization with Firebase.

2. **Medication Confirmation via NFC**:
   - Users confirm medication intake by tapping an assigned NFC tag.

3. **Virtual Pet Growth**:
   - The pet reflects collective progress in real-time, showing changes in state and growth.

4. **Automatic Daily Reset**:
   - Daily confirmations are reset at a defined time, keeping the daily cycles organized.

5. **Role Rotation**:
   - Users rotate roles, such as "reminder" roles, to promote group collaboration.

6. **Personalized Notifications**:
   - Local and group reminders integrated with Firebase Cloud Messaging and Notifee.

---

## 🖼️ Capturas de Pantalla

### **HomeScreen**
![HomeScreen](./readme_imgs/home1.png)

### **SettingsScreen**
![SettingsScreen](./readme_imgs/settings1.png)

---

## 🛠️ Technologies Used

- **React Native**: User interface development.
- **Firebase**:
  - Firestore Database: Real-time storage.
  - Firebase Cloud Functions: Backend automation.
  - Firebase Cloud Messaging: Notification management.
- **React Navigation**: Screen navigation.
- **react-native-nfc-manager**: NFC tag management.
- **Notifee**: Advanced notification handling.

---

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

### Clone the Repository:

```bash
# Clone the Repository:
git clone https://github.com/tu-nombre-de-usuario/mascota-saludable.git
```

## Install Dependencies:

```bash
# Install Dependencies
npm install
```
- Navigate to the Project Directory:
```bash
cd VIRTUALPET
```

## Set Up Firebase:

To integrate Firebase services into your project, you need to configure some Firebase services. These settings can be found on the official Firebase site for react-native.

- Visit the React Native Firebase Documentation [React Native Firebase](https://rnfirebase.io) to configure Firebase services for your project.


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

# 📚 Technical Documentation
This repository includes:
- Pet Growth Logic: Implemented in `PetGrowthService`.
- Medication Management: Custom hooks for registration and confirmation.
- Notifications: Configured in `NotificationService` and Firebase Cloud Functions.
- NFC Integration: Managed in `NfcContext` using react-native-nfc-manager.

# 🗂️ Estructura del Proyecto

```paintext
src/
├── components/      # Reusable visual components
├── context/         # React contexts for global state management
├── services/        # Custom hooks and services (e.g., DailyValidation, RoleManagement)
├── screens/         # Main screens (HomeScreen, SettingsScreen)
├── firebase/        # Firebase logic handlers
└── App.tsx          # Application entry point

```

# 📝 Licencia
This project is licensed under the MIT License.


