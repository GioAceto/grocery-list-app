import { createApp } from "vue";
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
  faSquare,
  faSquareCheck,
  faXmark
);

createApp(App)
  .component("FontAwesomeIcon", FontAwesomeIcon)
  .use(createPinia())
  .use(router)
  .mount("#app");
