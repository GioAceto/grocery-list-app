import { createRouter, createWebHistory } from "vue-router";
import { useStoreAuth } from "@/stores/storeAuth";
import ViewGroceryList from "@/views/View-GroceryList.vue";
import ViewAbout from "@/views/View-About.vue";
import ViewAuth from "@/views/View-Auth.vue";
import View404 from "@/views/View-404.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "view-grocery-list",
      component: ViewGroceryList,
      props: (route) => ({ page: parseInt(route.query.page) || 1 }),
    },
    {
      path: "/login",
      name: "view-auth",
      component: ViewAuth,
    },
    {
      path: "/about",
      name: "view-about",
      component: ViewAbout,
    },
    {
      path: "/:pathMatch(.*)",
      component: View404,
    },
  ],
});

router.beforeEach((to, from) => {
  const storeAuth = useStoreAuth();
  if (
    !storeAuth.user.id &&
    to.name !== "view-auth" &&
    to.name !== "view-about"
  ) {
    return {
      name: "view-auth",
    };
  }
  if (storeAuth.user.id && to.name === "view-auth") {
    return false;
  }
});

export default router;
