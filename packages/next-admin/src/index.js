/* eslint-disable no-console */
import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/app';
import 'firebase/messaging';
import '@antoree/ant-ui/dist/ant_ui_compiled.css';
import '@elastic/charts/dist/theme_only_light.css';
import 'assets/styles/globalStyles.scss';
import appConfig from 'configs/app.config';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

Sentry.init({
  dsn:
    'https://edfe07cf32a141feb3a3503f76e4ca7c@o933565.ingest.sentry.io/5882668',
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root'),
);

serviceWorkerRegistration.register({
  onUpdate: registration => {
    const registrationWaiting = registration.waiting;

    if (registrationWaiting) {
      registrationWaiting.postMessage({ type: 'SKIP_WAITING' });

      registrationWaiting.addEventListener('statechange', e => {
        if (e.target.state === 'activated') {
          window.location.reload();
        }
      });
    }
  },
  onReady: registration => {
    // Initialize Firebase
    const firebaseConfig = {
      projectId: appConfig.firebaseProjectId,
      appId: appConfig.firebaseAppId,
      apiKey: appConfig.firebaseApiKey,
      messagingSenderId: appConfig.fcmSenderId,
    };

    firebase.initializeApp(firebaseConfig);

    if (!('Notification' in window)) {
      // eslint-disable-next-line no-alert
      alert('This browser does not support desktop notification');
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === 'granted') {
      // If it's okay let's create a notification
      const messaging = firebase.messaging();

      messaging
        .getToken({
          vapidKey: appConfig.fcmVapidId,
          serviceWorkerRegistration: registration,
        })
        .then(currentToken => {
          console.log(
            `%c ${currentToken}`,
            'color: yellow; font-weight: bold;',
          );
        })
        .catch(err => {
          console.error('An error occurred while retrieving token. ', err);
        });

      messaging.onMessage(payload => {
        console.log('Message received. ', payload);

        const notificationTitle = payload.notification.title;

        const notificationOptions = {
          body: payload.notification.body,
          icon: appConfig.appLogo,
        };

        const notification = new Notification(
          notificationTitle,
          notificationOptions,
        );

        notification.onclick = event => {
          event.preventDefault();
          notification.close();
        };
      });
    }
  },
});
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
