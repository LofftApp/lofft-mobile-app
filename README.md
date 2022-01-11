# ReadMe

This is the readme for the Lofft Mobile Application. The development for the application is with `react-native`.
_This is the second repo and latest version, once this is released and updated we will have left Expo far behind us, this will allow us to have more flexability but does also create potential issues as you will have to interact with the ios and android files in the project_

- [React Native](https://reactnative.dev/docs/getting-started)

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

## Running the Mobile Application

Once the application the following tasks are required to get it up and running.

### Installing Packages

**Yarn**

```
  yarn install
```

### Starting the Local Server

To launch the project run through the terminal the following commands,

```
  npx react-native start | yarn start

  npx react-native run-ios | yarn ios

  npx react-native run-android | yarn android
```

### Possible issues

When ever a new package is installed it needs to be linked to the two apps, for iOS this is completed by runing the following commands:

```
  cd ios && pod install
  
  cd android && ./gradle clean
```

This installs files and updates the cocoa pods, check the readmes as if during initial set up sometimes extra parameters are required.

If using android, then load up android studio once the project has stopped loading sync the files with the project by doing the following: File -> Sync Project with Gradle files
