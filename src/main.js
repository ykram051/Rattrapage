import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { auth } from './firebase/firebaseConfig';

let app;

auth.onAuthStateChanged(user => {
  if (!app) {
    app = createApp(App).use(router).mount('#app');
  }

  if (user) {
    if (router.currentRoute.value.path === '/login' || router.currentRoute.value.path === '/register') {
      router.push('/');
    }
  } else {
    if (router.currentRoute.value.meta.requiresAuth) {
      router.push('/login');
    }
  }
});
