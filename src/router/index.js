import { createRouter, createWebHistory } from "vue-router";
import { LoginCallback, navigationGuard } from "@okta/okta-vue";
import Dashboard from "@/views/Dashboard";

import LoginComponent from "@/components/Login";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Dashboard,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "/home",
          component: () =>
            import(/* webpackChunkName: "Overview" */ "@/views/Home.vue"),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "/mystocks",
          component: () =>
            import(/* webpackChunkName: "Profile" */ "@/views/MyStocks.vue"),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "/orderscompra",
          component: () =>
            import(
              /* webpackChunkName: "Profile" */ "@/views/OrdersCompra.vue"
            ),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "/ordersvenda",
          component: () =>
            import(/* webpackChunkName: "Profile" */ "@/views/OrdersVenda.vue"),
          meta: {
            requiresAuth: true,
          },
        },
      ],
    },
    {
      path: "/login",
      component: LoginComponent,
    },
    {
      path: "/login/callback",
      component: LoginCallback,
    },
  ],
});

router.beforeEach(navigationGuard);

export default router;
