// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCPWLVaRv1JkAAYH0-27_OPTb7JZDw2uc",
  authDomain: "netflixgpt-6e08d.firebaseapp.com",
  projectId: "netflixgpt-6e08d",
  storageBucket: "netflixgpt-6e08d.appspot.com",
  messagingSenderId: "798844024481",
  appId: "1:798844024481:web:2e990abcf5d2948b5ee2e0",
  measurementId: "G-LB5MPHFHS7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);