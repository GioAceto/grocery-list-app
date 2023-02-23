<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div>
    <header class="py-12 h-12 flex items-center">
      <nav class="w-full flex justify-center mx-auto">
        <RouterLink
          class="mr-24 text-base md:text-xl"
          :to="{ name: 'grocery-list-page' }"
          >Grocery List</RouterLink
        >
        <RouterLink class="text-base md:text-xl" :to="{ name: 'about-page' }"
          >App Info</RouterLink
        >
      </nav>
    </header>
    <RouterView />
  </div>
</template>

<style scoped></style>
