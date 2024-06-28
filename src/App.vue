<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/login" v-if="!currentUser">Login</router-link>
      <router-link to="/register" v-if="!currentUser">Register</router-link>
      <button v-if="currentUser" @click="signOut">Sign Out</button>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import { auth } from './firebase/firebaseConfig';

export default {
  name: 'App',
  data() {
    return {
      currentUser: null
    };
  },
  created() {
    auth.onAuthStateChanged(user => {
      this.currentUser = user;
    });
  },
  methods: {
    signOut() {
      auth.signOut().then(() => {
        this.$router.push('/login');
      }).catch(error => {
        console.error("Sign Out Error", error);
      });
    }
  }
};
</script>

<style scoped>
nav {
  display: flex;
  justify-content: space-around; /* Adjust alignment */
  align-items: center; /* Center items vertically */
  background-color: #71b1d6;
  padding: 1rem;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Add subtle shadow */
  flex-wrap: wrap; /* Allow items to wrap on smaller screens */
}

nav a, nav button {
  flex: 1 0 auto; /* Allow items to grow and shrink */
  text-align: center; /* Center text */
  margin: 0.5rem; /* Add spacing between items */
  font-size: 0.9rem; /* Adjust font size */
  padding: 0.5rem; /* Add padding for clickable area */
  text-decoration: none; /* Remove underline */
  color: white; /* Ensure text color remains white */
}

nav button {
  background: none;
  border: none;
  cursor: pointer;
  border-radius: 4px; /* Add rounded corners */
  transition: background-color 0.3s ease; /* Smooth hover effect */
}

nav button:hover {
  background-color: rgba(255, 255, 255, 0.1); /* Lighten background on hover */
}
</style>
