<template>
  <div class="grocery-list">
    <ListForm />
    <div class="list">
      <ul>
        <li v-for="(item, index) in store.groceryList" :key="index">
          <span class="mr-4">{{ item.category }}</span
          ><span class="mr-4">{{ item.item }}</span
          ><span>Qty: {{ item.quantity }}</span>
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
