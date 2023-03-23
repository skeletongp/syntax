import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.atriontechsd.syntax',
  appName: 'syntax',
  webDir: 'dist',
  bundledWebRuntime: false,

  plugins:{
   
    "CapacitorSQLite": {
      "iosDatabaseLocation": "Library/CapacitorDatabase",
      "iosIsEncryption": false,
      "iosKeychainPrefix": "cap",
      "iosBiometric": {
        "biometricAuth": false,
        "biometricTitle" : "Biometric login for capacitor sqlite"
      },
      "androidIsEncryption": false,
      "androidBiometric": {
        "biometricAuth" : false,
        "biometricTitle" : "Biometric login for capacitor sqlite",
        "biometricSubTitle" : "Log in using your biometric"
      },
      "electronWindowsLocation": "C:\\ProgramData\\CapacitorDatabases",
      "electronMacLocation": "YOUR_VOLUME/CapacitorDatabases",
      "electronLinuxLocation": "Databases"
    },
    "NativeBiometric": {},
    "SplashScreen": {
      "launchShowDuration": 3000,
      "launchAutoHide": true,
      "launchFadeOutDuration": 3000,
      "backgroundColor": "#ffffffff",
      "androidSplashResourceName": "splash",
      "androidScaleType": "CENTER_CROP",
      "showSpinner": true,
      "androidSpinnerStyle": "large",
      "iosSpinnerStyle": "small",
      "spinnerColor": "#999999",
      "splashFullScreen": true,
      "splashImmersive": true,
      "layoutName": "launch_screen",
      "useDialog": true
    }
  }
};

export default config;
