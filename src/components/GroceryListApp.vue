<template>
  <div>
    <Transition name="slide-in">
      <div v-if="storeAuth.user.id" class="absolute bg-slate-200 h-12 w-full">
        <div class="mx-auto max-w-screen-md h-full">
          <p class="float-left text-xs mt-4 ml-4 md:ml-12">
            Hello,
            <strong
              >{{
                storeAuth.user.email.length > 26
                  ? `${storeAuth.user.email.slice(0, 26)}...`
                  : storeAuth.user.email
              }}
              👋</strong
            >
          </p>
          <button
            @click="storeAuth.logoutUser"
            class="float-right mr-4 mt-2 text-xs cursor-pointer shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-1.5 px-3 rounded md:mr-12"
            :to="{ name: 'view-about' }"
          >
            Log out
          </button>
        </div>
      </div>
    </Transition>
    <header class="flex items-center mb-6">
      <nav class="h-24 w-full flex justify-center pt-16 bg-gray-600 text-white">
        <RouterLink
          @click="infoTab = false"
          class="mr-8 text-base"
          :class="!infoTab ? 'underline' : false"
          :to="{ name: 'view-grocery-list' }"
          >Home</RouterLink
        >
        <RouterLink
          @click="infoTab = true"
          class="text-base"
          :class="infoTab ? 'underline' : false"
          :to="{ name: 'view-about' }"
          >App info</RouterLink
        >
      </nav>
    </header>
    <RouterView />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { useStoreAuth } from "@/stores/storeAuth";
const storeAuth = useStoreAuth();

const infoTab = ref(false);
</script>

<style scoped>
.slide-in-move, /* apply transition to moving elements */
.slide-in-enter-active,
.slide-in-active {
  transition: all 0.5s ease;
}

.slide-in-enter-from,
.slidein-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.slide-in-leave-active {
  position: absolute;
}
</style>
