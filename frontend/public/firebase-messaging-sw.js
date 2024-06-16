importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js");
//import firebase from 'firebase/compat/app';
//import 'firebase/compat/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyAoA621KhnpMgfdAyxBt5ixPNZAXbiMTZI",
  authDomain: "login-1ace4.firebaseapp.com",
  databaseURL: "https://login-1ace4.firebaseio.com",
  projectId: "login-1ace4",
  storageBucket: "login-1ace4.appspot.com",
  messagingSenderId: "12544342651",
  appId: "1:12544342651:web:0ea18daaeb3946142b80de",
  measurementId: "G-N6FQREZCJR"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log(payload);

  let options = {
    body: payload.data.body,
    //icon: payload.data.icon
  }

  return self.registration.showNotification(payload.data.title, options);
  //return self.registration.showNotification('test', options);
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  clients.openWindow('/dashboard');
  /*const url = event.notification.data.url || '/'; // Default to home if no URL in data
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(windowClients => {
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  ); */
});

