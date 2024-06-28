<template>
  <div class="register-container">
    <h2>Register</h2>
    <form @submit.prevent="register" class="register-form">
      <input type="email" v-model="email" placeholder="Email" required>
      <input type="password" v-model="password" placeholder="Password" required>
      <button type="submit">Register</button>
    </form>
    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>

<script>
import { auth } from '../firebase/firebaseConfig';

export default {
  data() {
    return {
      email: '',
      password: '',
      error: ''
    };
  },
  methods: {
    async register() {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@um6p\.ma$/;
      if (!emailRegex.test(this.email)) {
        this.error = 'Email must be a valid UM6P email address';
        return;
      }
      try {
        await auth.createUserWithEmailAndPassword(this.email, this.password);
        this.$router.push('/');
      } catch (error) {
        this.error = error.message;
      }
    }
  }
};
</script>

<style>
.register-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
  text-align: center;
}

.register-container h2 {
  margin-bottom: 1.5rem;
  font-size: 1.75rem;
  color: #333;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.register-form input {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.register-form button {
  padding: 0.75rem;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.register-form button:hover {
  background-color: #0056b3;
}

.error-message {
  margin-top: 1rem;
  color: red;
  font-size: 0.875rem;
}
</style>
