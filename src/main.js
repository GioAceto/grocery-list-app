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
  faSoap,
  faCandyCane,
  faWineBottle,
  faSocks,
  faTabletScreenButton,
  faShapes,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";

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
  faSoap,
  faCandyCane,
  faWineBottle,
  faSocks,
  faTabletScreenButton,
  faShapes,
  faCartShopping
);

createApp(App)
  .component("FontAwesomeIcon", FontAwesomeIcon)
  .use(createPinia())
  .use(router)
  .mount("#app");
