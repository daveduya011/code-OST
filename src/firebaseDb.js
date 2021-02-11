import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCKw3Ft9nfdP_epOjJLp4SFwCCg-lj6Xkw",
    authDomain: "code-ost.firebaseapp.com",
    projectId: "code-ost",
    storageBucket: "code-ost.appspot.com",
    messagingSenderId: "314430363102",
    appId: "1:314430363102:web:61b7728b98c191ae74f94f",
    measurementId: "G-W5F9G013KH"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();