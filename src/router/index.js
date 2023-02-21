// Composables
import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "/",
        name: "Users",
        component: () => import("@/views/UsersList.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/login",
        name: "Login",
        component: () => import("@/views/Login.vue"),
        meta: { onlyGuest: true },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, _from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const onlyGuest = to.matched.some((record) => record.meta.onlyGuest);
  const isLoggedIn = store.getters.isLoggedIn;

  if (requiresAuth && !isLoggedIn) {
    next("/login");
  } else if (onlyGuest && isLoggedIn) {
    next("/");
  } else {
    next();
  }
});

export default router;
