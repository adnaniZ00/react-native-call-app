// index.js

import React, { useEffect } from 'react';
import {
  AppRegistry, // <-- Import AppRegistry
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Alert,
  Platform,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { name as appName } from './app.json'; // <-- Import the app name

// This function requests permission for notifications on Android.
async function requestUserPermission() {
  try {
    // Request standard permission
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }

    // For Android 13 (API level 33) or higher, we also need to request the POST_NOTIFICATIONS permission.
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      if (permission === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Android 13+ notification permission granted');
      } else {
        console.log('Android 13+ notification permission denied');
      }
    }
  } catch (error) {
    console.error('Error requesting permissions: ', error);
  }
}

// This is our main component
function CallApp() {
  // The useEffect hook runs code once when the component loads.
  useEffect(() => {
    requestUserPermission();

    messaging()
      .getToken()
      .then(token => {
        console.log('FCM Token:', token);
        Alert.alert(
          'FCM Token Found!',
          'Check the React Native DevTools console (press "j" in the terminal) to find your FCM Token.',
        );
      });

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Firebase is Ready!</Text>
        <Text style={styles.description}>
          Check the React Native DevTools console for your FCM Token.
        </Text>
        <Text style={styles.description}>
          (Press <Text style={styles.highlight}>j</Text> in the Metro terminal)
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    lineHeight: 24,
  },
  highlight: {
    fontWeight: 'bold',
    color: '#000',
  },
});

// This is the most important line!
// It tells React Native to register our "CallApp" component with the name "CallApp",
// which is what the native Android code is looking for.
AppRegistry.registerComponent(appName, () => CallApp);
