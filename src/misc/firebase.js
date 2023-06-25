import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/messaging';

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

const app = firebase.initializeApp(config);

export const auth = app.auth();
export const database = app.database();
export const storage = app.storage();

export const messaging = firebase.messaging.isSupported()
  ? app.messaging()
  : null;

if (messaging) {
  messaging.usePublicVapidKey(
    'BAAGkJGbBGbnp7_zEgW5AwzW3bpn9D4Xf2bXdr9iiZeM-c_N9smBIY08Vk9q1SLDchIjwKubz-BiaWXJY7V5KQg'
  );

  messaging.onMessage(data => {
    console.log(data);
  });
}
