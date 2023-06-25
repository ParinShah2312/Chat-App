/* eslint-disable object-curly-spacing */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */

const { onRequest } = require('firebase-functions/v2/https');
const logger = require('firebase-functions/logger');

const admin = require('firebase-admin');

const serviceAccount = require('./service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    'https://chat-app-f7851-default-rtdb.asia-southeast1.firebasedatabase.app/',
});

const { sendFcm } = require('./src/fcm');

exports.sendFcm = sendFcm;
