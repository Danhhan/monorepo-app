importScripts('https://www.gstatic.com/firebasejs/8.2.5/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.5/firebase-messaging.js');

firebase.initializeApp({
    apiKey: 'AIzaSyCYYvCxli5ony9uNEttEaW9SD0R4atzOXI',
    projectId: 'antoree-dev-eb506',
    messagingSenderId: '133117513655',
    appId: '1:133117513655:web:75f8eb134f3dccef0d6232',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);

    const notificationTitle = payload.notification.title;

    const notificationOptions = {
      body: payload.notification.body,
      icon: `${process.env.PUBLIC_URL}/logo512.png`,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});