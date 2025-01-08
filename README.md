# To do 

This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

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

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.



```mermaid
graph TD
    subgraph "NFC Detection"
        nfcScan["NFC Tag Scan"]
        tagStorage["Local Storage - Tag History"]
        nfcContext["NFC Context"]
    end

    subgraph "Medication Management"
        medStatus["Medication Status"]
        medValidation["Medication Time Validation"]
        medConfirm["Medication Confirmation"]
        medHistory["Medication History"]
    end

    subgraph "Pet Growth System"
        groupValid["Group Validation"]
        petGrowth["Pet Growth"]
        growthSync["Growth State Sync"]
        dailyReset["Daily Reset"]
    end

    subgraph "Storage Layer"
        localStorage["AsyncStorage"]
        firestore["Firestore DB"]
    end

    %% NFC Flow
    nfcScan -->|Detect| nfcContext
    nfcScan -->|Store| tagStorage
    
    %% Medication Flow
    nfcContext -->|Trigger| medValidation
    medValidation -->|Check Time Window| medConfirm
    medConfirm -->|Update| medStatus
    medStatus -->|Record| medHistory
    
    %% Growth Flow
    medStatus -->|Check All Users| groupValid
    groupValid -->|If All Confirmed| petGrowth
    petGrowth -->|Sync State| growthSync
    dailyReset -->|Reset Status| medStatus
    
    %% Storage Interactions
    tagStorage -->|Persist| localStorage
    medStatus -->|Store| firestore
    petGrowth -->|Save State| firestore
    growthSync -->|Sync Across Devices| firestore
```


```mermaid
graph TB
    User((User))

    subgraph "Mobile Application"
        MobileApp["Mobile App<br>React Native"]
        
        subgraph "Navigation Layer"
            AppNavigator["App Navigator<br>React Navigation"]
            TabNavigator["Tab Navigator<br>Bottom Tab Navigation"]
        end

        subgraph "Core Components"
            HomeScreen["Home Screen<br>React Component"]
            SettingsScreen["Settings Screen<br>React Component"]
            
            subgraph "Feature Components"
                PetComponent["Pet Component<br>React Component"]
                MedHistory["Medication History<br>React Component"]
                AddMedForm["Add Medication Form<br>React Component"]
                ScanHistory["Scan History<br>React Component"]
                UsersProgress["Users Progress<br>React Component"]
            end
        end

        subgraph "Context Layer"
            NfcContext["NFC Context<br>React Context"]
        end

        subgraph "Services Layer"
            NfcService["NFC Service<br>react-native-nfc-manager"]
            LocalStorage["Local Storage<br>AsyncStorage"]
            MedManagement["Med Management<br>Custom Hook"]
            PetGrowth["Pet Growth Service<br>Custom Hook"]
            DailyValidation["Daily Validation<br>Custom Hook"]
            UserIdService["User ID Service<br>Custom Hook"]
        end
    end

    subgraph "Backend Services"
        FirebaseApp["Firebase App<br>Firebase"]
        
        subgraph "Firebase Services"
            Firestore["Cloud Firestore<br>NoSQL Database"]
            Authentication["Authentication<br>Firebase Auth"]
        end
    end

    %% User Interactions
    User -->|Interacts with| MobileApp
    
    %% Mobile App Structure
    MobileApp -->|Uses| AppNavigator
    AppNavigator -->|Contains| TabNavigator
    TabNavigator -->|Routes to| HomeScreen
    TabNavigator -->|Routes to| SettingsScreen

    %% Component Relationships
    HomeScreen -->|Displays| PetComponent
    HomeScreen -->|Shows| MedHistory
    SettingsScreen -->|Contains| AddMedForm
    HomeScreen -->|Shows| ScanHistory
    HomeScreen -->|Shows| UsersProgress

    %% Context and Services
    NfcContext -->|Manages State| MobileApp
    NfcContext -->|Uses| NfcService
    NfcContext -->|Uses| LocalStorage
    NfcContext -->|Uses| MedManagement
    NfcContext -->|Uses| PetGrowth
    NfcContext -->|Uses| DailyValidation
    NfcContext -->|Uses| UserIdService

    %% Backend Integration
    MedManagement -->|Reads/Writes| Firestore
    PetGrowth -->|Updates| Firestore
    DailyValidation -->|Validates| Firestore
    FirebaseApp -->|Manages| Firestore
    FirebaseApp -->|Manages| Authentication

    %% Local Storage Integration
    NfcService -->|Stores Data| LocalStorage
    MedManagement -->|Caches Data| LocalStorage
```