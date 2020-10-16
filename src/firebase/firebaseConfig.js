import firebase from "firebase";

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyBFzD6IU5rXdCsmMvxykpCHeS24VQw3WMM",
  authDomain: "sendo-shopping-app.firebaseapp.com",
  databaseURL: "https://sendo-shopping-app.firebaseio.com",
  projectId: "sendo-shopping-app",
  storageBucket: "sendo-shopping-app.appspot.com",
  messagingSenderId: "416201603760",
  appId: "1:416201603760:web:f9adffc561c63acb3d1975",
  measurementId: "G-L90DF6BMYQ",
};
// Initialize Firebase

const firebaseApp = firebase.initializeApp(firebaseConfig);
const storage = firebaseApp.storage();
const getFireBaseToken = () => {
  const currentUser = firebaseApp.auth().currentUser;
  if (currentUser) {
    currentUser.getIdToken();
  }

  //Not Login
  const hasRememberAccount = localStorage.getItem(
    "firebaseui::rememberedAccounts"
  );

  if (hasRememberAccount) return null;

  //Login but current User is no fetch -> wait 10s
};

export { getFireBaseToken, storage, firebaseApp as default };
