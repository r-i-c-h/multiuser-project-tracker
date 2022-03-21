import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCFk0Cl11yS8iriKlKGBuQmQ-dwNDFgz6E',
  authDomain: 'multiparty-project-tracker.firebaseapp.com',
  projectId: 'multiparty-project-tracker',
  storageBucket: 'multiparty-project-tracker.appspot.com',
  messagingSenderId: '478136179166',
  appId: '1:478136179166:web:66bb7b40323aa967fee54f',
  measurementId: 'G-6T49K4YNHG'
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

//timestamp
const timestamp = firebase.firestore.Timestamp;

export { firebase, projectFirestore, projectAuth, timestamp };
