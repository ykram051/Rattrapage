import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import EventDetail from '../views/EventDetail.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import { auth } from '../firebase/firebaseConfig';

const routes = [
  { path: '/', name: 'Home', component: Home, meta: { requiresAuth: true } },
  { path: '/event/:id', name: 'EventDetail', component: EventDetail, meta: { requiresAuth: true } },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// Navigation guard
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const currentUser = auth.currentUser;

  if (requiresAuth && !currentUser) {
    next('/login');
  } else if ((to.path === '/login' || to.path === '/register') && currentUser) {
    next('/');
  } else {
    next();
  }
});
export default router;
