<template>
  <div>
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
    <header class="flex items-center mb-6">
      <nav class="h-24 w-full flex justify-center pt-16 bg-gray-600 text-white">
        <RouterLink
          @click="infoTab = false"
          v-if="storeAuth.user.id"
          class="mr-8 text-base"
          :class="!infoTab ? 'underline' : false"
          :to="{ name: 'view-grocery-list' }"
          >My list</RouterLink
        >
        <RouterLink
          @click="infoTab = false"
          v-if="!storeAuth.user.id"
          class="mr-8 text-base"
          :class="!infoTab ? 'underline' : false"
          :to="{ name: 'view-auth' }"
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

<style scoped></style>
