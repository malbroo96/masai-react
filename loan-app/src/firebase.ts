// // // Import the functions you need from the SDKs you need
// // import { initializeApp } from "firebase/app";
// // import { getAnalytics } from "firebase/analytics";
// // // TODO: Add SDKs for Firebase products that you want to use
// // // https://firebase.google.com/docs/web/setup#available-libraries

// // // Your web app's Firebase configuration
// // // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// // const firebaseConfig = {
// //   apiKey: "AIzaSyBdQCWQRJCWkyHBcDhiSSJIKxTBtTQigkc",
// //   authDomain: "loan-app-2df03.firebaseapp.com",
// //   projectId: "loan-app-2df03",
// //   storageBucket: "loan-app-2df03.firebasestorage.app",
// //   messagingSenderId: "690648345523",
// //   appId: "1:690648345523:web:34b2ecc81f7e68c0a779c6",
// //   measurementId: "G-LR5E6E5926"
// // };

// // // Initialize Firebase
// // const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);

// // export default app;

// import React, { useState, useEffect } from "react";
// import { initializeApp } from "firebase/app";
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   onAuthStateChanged,
// } from "firebase/auth";

// /*
//   ⚠️ IMPORTANT: Replace the values below with your Firebase config from the Firebase console.

//   Recommended (secure) approach:
//    - For Vite: create a .env file and set VITE_FIREBASE_API_KEY=...
//    - For Create React App: use REACT_APP_FIREBASE_API_KEY=...
//   This component will try to read Vite (import.meta.env) first, then CRA (process.env) as a fallback.
// */

// const firebaseConfig = {
//   apiKey:
//     (typeof import.meta !== "undefined" &&
//       import.meta.env &&
//       import.meta.env.VITE_FIREBASE_API_KEY) ||
//     process.env.REACT_APP_FIREBASE_API_KEY ||
//     "YOUR_API_KEY",
//   authDomain:
//     (typeof import.meta !== "undefined" &&
//       import.meta.env &&
//       import.meta.env.VITE_FIREBASE_AUTH_DOMAIN) ||
//     process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ||
//     "YOUR_AUTH_DOMAIN",
//   projectId:
//     (typeof import.meta !== "undefined" &&
//       import.meta.env &&
//       import.meta.env.VITE_FIREBASE_PROJECT_ID) ||
//     process.env.REACT_APP_FIREBASE_PROJECT_ID ||
//     "YOUR_PROJECT_ID",
//   storageBucket:
//     (typeof import.meta !== "undefined" &&
//       import.meta.env &&
//       import.meta.env.VITE_FIREBASE_STORAGE_BUCKET) ||
//     process.env.REACT_APP_FIREBASE_STORAGE_BUCKET ||
//     "YOUR_STORAGE_BUCKET",
//   messagingSenderId:
//     (typeof import.meta !== "undefined" &&
//       import.meta.env &&
//       import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID) ||
//     process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID ||
//     "YOUR_MSG_SENDER_ID",
//   appId:
//     (typeof import.meta !== "undefined" &&
//       import.meta.env &&
//       import.meta.env.VITE_FIREBASE_APP_ID) ||
//     process.env.REACT_APP_FIREBASE_APP_ID ||
//     "YOUR_APP_ID",
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
