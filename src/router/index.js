import { createRouter, createWebHistory } from "vue-router";
import GroceryListPage from "@/views/GroceryListPage.vue";
import AboutPage from "@/views/AboutPage.vue";
import NotFoundPage from "@/views/NotFoundPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "grocery-list-page",
      component: GroceryListPage,
      props: (route) => ({ page: parseInt(route.query.page) || 1 }),
    },
    {
      path: "/about",
      name: "about-page",
      component: AboutPage,
    },
    {
      path: "/:pathMatch(.*)",
      component: NotFoundPage,
    },
  ],
});

export default router;
