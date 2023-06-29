import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import { getMessaging, isSupported, onMessage } from 'firebase/messaging';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { isLocalhost } from './helper';
import { Notification as Toast } from 'rsuite';

const config = {
  apiKey: 'AIzaSyBGfUVBRJ808kCzw4A0LLshK0kXXfpNmAA',
  authDomain: 'chat-app-f7851.firebaseapp.com',
  databaseURL:
    'https://chat-app-f7851-default-rtdb.asia-southeast1.firebasedatabase.app/',
  projectId: 'chat-app-f7851',
  storageBucket: 'gs://chat-app-f7851.appspot.com',
  messagingSenderId: '409445021925',
  appId: '1:409445021925:web:47052b3ff49b756ad3bc0c',
};

const app = initializeApp(config);

export const fcmVapidKey =
  'BAAGkJGbBGbnp7_zEgW5AwzW3bpn9D4Xf2bXdr9iiZeM-c_N9smBIY08Vk9q1SLDchIjwKubz-BiaWXJY7V5KQg';
export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);
export const functions = getFunctions(app, 'asia-southeast1');

export const messaging = isSupported() ? getMessaging(app) : null;

if (messaging) {
  onMessage(messaging, ({ notification }) => {
    const { title, body } = notification;
    Toast.info({ title, description: body, duration: 0 });
  });
}

if (isLocalhost) {
  connectFunctionsEmulator(functions, 'localhost', 5001);
}
