# ReadMe

This is the readme for the Lofft Mobile Application. The development for the application is with `react-native` and `expo`.

- [React Native](https://reactnative.dev/docs/getting-started)
- [Expo](https://docs.expo.dev/)

Expo has a mobile application that can be installed on device or an emulator can be used. To use the emulators you must download `xCode` and `Android Studio`. If development is on a windows machine `Android Studio` can be downloaded but for iOS development the online emulator provided by Expo must be used and `xCode` is not available on windows.

## Required Software
- Android Studio
- xCode (Mac only) 

## Required APIs

The Mobile application interacts with the [Lofft-Web-Api](https://github.com/LofftApp/lofft-web-api) for testing and development a local version is required and migration completed. Follow the Readme for the API to get a local server running on your machine.

## Set up

### Instaling React Native

```
  yarn add react-native
```

### Installing Expo Tools

```
  yarn add expo-cli
```

## Running the Mobile Application

Once the application the following tasks are required to get it up and running.

### Installing Packages

**Yarn**

```
  yarn install
```

### Starting the Local Server

**Expo**

```
  expo start
```

** Running through Expo**
Running through Expo is easy and suitable for checking design thought recent changes mean it is now better to run through xCode and Android Studio

Once it has started a menu will appear and a web tab will load in your browser. This will give you short cuts and a QR code. If you have the Expo App on your phone scan the QR code with your camera app and this will load in Expo. If running on machine follow the instructions provided to load the emulator or web emulator from the command line.

** Running thought xCode and Android Studio**

Both are easily installded and set up. The limitation here is with apple running on device requires a developer account, so it is best to run it on the emulators on device. 

Once expo start has been run in the terminal load the requidred software, Android studio will suggest upgrading `gradle update` **do not do this** as the latest version is installed through expo, though still triggers an issue in the software. 

<img width="391" alt="Screenshot 2021-12-08 at 14 59 01" src="https://user-images.githubusercontent.com/5392107/145220868-7d039b77-585e-448c-965b-b7ff1112c97a.png">

