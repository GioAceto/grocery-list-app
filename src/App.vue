<template>
  <GroceryListApp />
</template>
<script setup>
import { onMounted } from "vue";
import GroceryListApp from "./components/GroceryListApp.vue";
import "@/assets/styles.css";
import { useStoreAuth } from "@/stores/storeAuth";

const storeAuth = useStoreAuth();

onMounted(() => {
  storeAuth.init();
});
</script>

<style scoped></style>
