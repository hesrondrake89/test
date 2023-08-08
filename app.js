import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Function to fetch series information by seriesId
async function fetchSeriesData(seriesId) {
  const options = {
    method: 'GET',
    url: `https://moviesdatabase.p.rapidapi.com/titles/series/${seriesId}`,
    headers: {
      'X-RapidAPI-Key': '95110a8efdmsh4743eff3020f603p18aac5jsne04b1aa89d5e',
      'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    // Process the response data or update the DOM with the series information
  } catch (error) {
    console.error(error);
  }
}

// Example usage - Call the fetchSeriesData function with the seriesId you want to fetch
const seriesIdToFetch = 'kay'; // Replace with the actual series ID
fetchSeriesData(seriesIdToFetch);

// Replace this config with your actual Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoCeaYcCcc1r0g4Rh6lOEQ9fqFId61dtM",
  authDomain: "reviewfreak-72d8c.firebaseapp.com",
  projectId: "reviewfreak-72d8c",
  storageBucket: "reviewfreak-72d8c.appspot.com",
  messagingSenderId: "602119515745",
  appId: "1:602119515745:web:d64bb860d56a14377d0420",
  measurementId: "G-SLEF6JDHQQ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get references to Firebase services (Auth and Firestore)
const auth = firebase.auth();
const firestore = firebase.firestore();

// Function to handle user login
async function login(email, password) {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    // User successfully logged in
  } catch (error) {
    console.error(error);
  }
}

// Function to handle user logout
async function logout() {
  try {
    await auth.signOut();
    // User successfully logged out
  } catch (error) {
    console.error(error);
  }
}

// Function to handle user signup
async function signup(email, password) {
  try {
    await auth.createUserWithEmailAndPassword(email, password);
    // User successfully signed up
  } catch (error) {
    console.error(error);
  }
}

// Function to save user review to Firestore
async function saveReview(userId, reviewTitle, rating, reviewText) {
  try {
    await firestore.collection("reviews").add({
      userId,
      reviewTitle,
      rating,
      reviewText,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    // Review successfully saved to Firestore
  } catch (error) {
    console.error(error);
  }
}

// Add event listeners for login and logout buttons
document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.querySelector(".btn.login");
  const logoutButton = document.querySelector(".btn.logout");

  // Add event listener for login button
  if (loginButton) {
    loginButton.addEventListener("click", () => {
      const email = "hesronatee@gmail.com"; // Replace with actual user email
      const password = "sandra14";   // Replace with actual user password
      login(email, password);
    });
  }

  // Add event listener for logout button
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      logout();
    });
  }
});