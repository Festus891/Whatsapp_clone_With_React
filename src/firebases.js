import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyAVchjl-tK9cM-6ikk8XalVhT9rMcWkpfQ",
    authDomain: "whatsapp-clone-18f3f.firebaseapp.com",
    projectId: "whatsapp-clone-18f3f",
    storageBucket: "whatsapp-clone-18f3f.appspot.com",
    messagingSenderId: "591141126050",
    appId: "1:591141126050:web:3c317bb65087d0cdcd3cfb",
    measurementId: "G-04G4S19HKY"
};
  
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
  
export {auth, provider};
export default db;
  