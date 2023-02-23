<template>
  <div class="form">
    <form
      @submit.prevent="addItemAndClear(item)"
      class="flex flex-wrap flex-col lg:flex-row"
    >
      <div class="mb-4 lg:mb-0">
        <label for="category" class="mr-2 inline-block w-24 lg:w-24"
          >Category:</label
        >
        <select
          id="category"
          v-model="category"
          class="mr-4 py-2 px-4 w-40 bg-gray-200 appearance-none border-2 border-gray-200 rounded text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
          type="select"
        >
          <option
            v-for="(category, index) in store.categories"
            :key="index"
            :value="category"
          >
            {{ category }}
          </option>
        </select>
      </div>
      <div class="mb-4 lg:mb-0">
        <label for="product" class="mr-2 inline-block w-24 lg:w-20"
          >Product:</label
        >
        <input
          id="product"
          v-model="item"
          class="mr-4 py-2 px-4 w-48 bg-gray-200 appearance-none border-2 border-gray-200 rounded text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
          type="text"
        />
      </div>
      <div class="mb-4 lg:mb-0">
        <label for="quantity" class="mr-2 inline-block w-24 lg:w-10"
          >Qty:</label
        >
        <input
          id="quantity"
          v-model="qty"
          class="mr-4 py-2 px-4 w-16 bg-gray-200 appearance-none border-2 border-gray-200 rounded text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
          type="text"
        />
      </div>
      <button
        @click.prevent="addItemAndClear"
        class="cursor-pointer shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
      >
        Add
      </button>
    </form>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useGroceryListStore } from "../stores/useGroceryListStore";

const category = ref("");
const item = ref("");
const qty = ref("");

const store = useGroceryListStore();

const addItemAndClear = () => {
  if (
    category.value.length === 0 ||
    item.value.length === 0 ||
    qty.value.length === 0
  ) {
    console.log("FAIL");
    return;
  }
  store.addItem(item, category, qty);
};
</script>
<style scoped></style>
