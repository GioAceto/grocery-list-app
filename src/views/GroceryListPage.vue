<template>
  <div class="grocery-list">
    <div class="mb-8 flex justify-center">
      <ListForm />
    </div>
    <div class="list flex justify-center">
      <ul>
        <li v-for="(item, index) in store.groceryList" :key="index">
          <span class="mr-4">{{ item.category }}</span
          ><span class="mr-4">{{ item.item }}</span
          ><span class="mr-1">Qty: {{ item.quantity }}</span
          ><span>{{ item.units }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import ListForm from "../components/ListForm.vue";
import { useGroceryListStore } from "../stores/useGroceryListStore";

const store = useGroceryListStore();
</script>
<style scoped></style>
