<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div>
    <header>
      <nav>
        <RouterLink
          class="mr-12 text-base md:text-xl"
          :to="{ name: 'grocery-list-page' }"
          >Grocery List</RouterLink
        >
        <RouterLink class="text-base md:text-xl" :to="{ name: 'about-page' }"
          >About This App</RouterLink
        >
      </nav>
    </header>
    <RouterView />
  </div>
</template>

<style scoped>
header {
  height: 8rem;
  display: flex;
  align-items: center;
}
nav {
  margin: 0 auto;
  padding: 0 2rem;
  height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
