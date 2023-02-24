<template>
  <div class="grocery-list">
    <div class="mb-8 flex justify-center">
      <ListForm />
    </div>
    <div
      class="container mx-auto flex flex-col items-center text-sm overflow-y-scroll"
    >
      <div v-for="(item, index) in store.groceryList" :key="index" class="item">
        <div
          class="my-2 pt-2 px-4 h-12 rounded flex flex-row justify-between items-center"
          :class="[
            item.category.color,
            item.completed ? 'strike-through' : false,
          ]"
        >
          <div
            @click="store.toggleCompleted(item.id)"
            class="pb-2 cursor-pointer w-2/12"
          >
            <font-awesome-icon
              :icon="
                item.completed
                  ? 'fa-regular fa-square-check'
                  : 'fa-regular fa-square'
              "
            />
          </div>
          <div class="pb-2 w-2/12">
            <font-awesome-icon :icon="item.category.icon" />
          </div>
          <div class="pb-2 w-5/12 overflow-x-scroll whitespace-nowrap">
            {{ item.item }}
          </div>
          <div class="ml-2 pb-2 w-3/12 whitespace-nowrap">
            {{ `x ${item.quantity} ${item.units}` }}
          </div>
          <div
            @click="store.deleteItem(item.id)"
            class="pb-2 ml-4 cursor-pointer w-1/12"
          >
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
.container {
  height: 54vh;
}

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
