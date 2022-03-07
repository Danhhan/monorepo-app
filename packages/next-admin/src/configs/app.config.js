import logo from 'assets/images/logo512.png';
import packageJson from '../../package.json';

const appConfig = {
  appName: 'Next Admin',
  appLogo: logo,
  apiUrl: process.env.REACT_APP_API_URL,
  appVersion: packageJson.version,
  // apiUrl: 'https://api-v2.prod.antoree.tech',
  clientId: 2,
  clientSecret: '2scEIzVQFUFMuBBAaiZOEbOdglZ9utwPIwNQy0GI',
  // Firebase
  firebaseProjectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  firebaseAppId: process.env.REACT_APP_FIREBASE_APP_ID,
  firebaseApiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  fcmSenderId: process.env.REACT_APP_FCM_SENDER_ID,
  fcmVapidId: process.env.REACT_APP_FCM_VAPID_KEY,
};

export default appConfig;
