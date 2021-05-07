// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.16.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.16.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.

firebase.initializeApp({
    apiKey: "AIzaSyDk81Wvs0aKLr1r-hOmdRPmkLE7Cg1m5Gk",
    authDomain: "kennethmichaelcaple21.firebaseapp.com",
    databaseURL: "https://kennethmichaelcaple21-default-rtdb.firebaseio.com",
    projectId: "kennethmichaelcaple21",
    storageBucket: "kennethmichaelcaple21.appspot.com",
    messagingSenderId: "633016251323",
    appId: "1:633016251323:web:125f2aa3fae5b3c4f98a9e",
    measurementId: "G-ZY6P6EE527"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();