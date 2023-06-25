/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js'
);

firebase.initializeApp({
  apiKey: 'AIzaSyBGfUVBRJ808kCzw4A0LLshK0kXXfpNmAA',
  authDomain: 'chat-app-f7851.firebaseapp.com',
  databaseURL:
    'https://chat-app-f7851-default-rtdb.asia-southeast1.firebasedatabase.app/',
  projectId: 'chat-app-f7851',
  storageBucket: 'gs://chat-app-f7851.appspot.com',
  messagingSenderId: '409445021925',
  appId: '1:409445021925:web:47052b3ff49b756ad3bc0c',
});

firebase.messaging();
