import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faFish,
  faDrumstickBite,
  faCheese,
  faPrescriptionBottleMedical,
  faBreadSlice,
  faCarrot,
  faAppleWhole,
  faIceCream,
  faGlassWater,
  faPumpSoap,
  faCandyCane,
  faWineBottle,
  faSocks,
  faTabletScreenButton,
  faShapes,
  faCartShopping,
  faJugDetergent,
  faXmark,
  faBottleWater,
  faPaw,
  faStapler,
  faCar,
  faBasketShopping,
  faList,
} from "@fortawesome/free-solid-svg-icons";

import { faSquare, faSquareCheck } from "@fortawesome/free-regular-svg-icons";

library.add(
  faFish,
  faDrumstickBite,
  faCheese,
  faPrescriptionBottleMedical,
  faBreadSlice,
  faCarrot,
  faAppleWhole,
  faIceCream,
  faGlassWater,
  faPumpSoap,
  faCandyCane,
  faWineBottle,
  faSocks,
  faTabletScreenButton,
  faJugDetergent,
  faShapes,
  faCartShopping,
  faBottleWater,
  faPaw,
  faStapler,
  faCar,
  faBasketShopping,
  faSquare,
  faSquareCheck,
  faXmark,
  faList
);

const pinia = createPinia();

pinia.use(({ store }) => {
  store.router = markRaw(router);
});

createApp(App)
  .use(pinia)
  .component("FontAwesomeIcon", FontAwesomeIcon)
  .use(router)
  .mount("#app");
