<template>
  <div class="grocery-list">
    <div class="mb-8 flex justify-center">
      <ListForm />
    </div>
    <div class="flex flex-col items-center">
      <div v-for="(item, index) in store.groceryList" :key="index" class="item">
        <div
          class="my-2 py-1 px-4 rounded flex flex-row justify-between"
          :class="[
            item.category.color,
            item.completed ? 'strike-through' : false,
          ]"
        >
          <div @click="store.toggleCompleted(index)" class="cursor-pointer">
            <font-awesome-icon
              :icon="
                item.completed
                  ? 'fa-regular fa-square-check'
                  : 'fa-regular fa-square'
              "
            />
          </div>
          <div class="">
            <font-awesome-icon :icon="item.category.icon" />
          </div>
          <div class="">{{ item.item }}</div>
          <div class="">x {{ item.quantity }}</div>
          <div>{{ item.units }}</div>
          <div class="cursor-pointer">
            <font-awesome-icon icon="fa-solid fa-xmark" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import ListForm from "../components/ListForm.vue";
import { useGroceryListStore } from "../stores/useGroceryListStore";

const store = useGroceryListStore();
</script>
<style scoped>
.item {
  width: 345px;
}

.strike-through {
  position: relative;
}
.strike-through::before {
  content: "";
  border-bottom: 2px solid black;
  width: 70%;
  position: absolute;
  right: 15%;
  top: 50%;
}
</style>
