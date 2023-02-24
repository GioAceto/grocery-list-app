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
          class="mr-4 py-2 px-4 w-56 bg-gray-200 appearance-none border-2 border-gray-200 rounded text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 select"
        >
          <option v-for="(category, index) in store.categories" :key="index">
            {{ category.name }}
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
          maxLength="4"
        />
        <select
          id="units"
          v-model="units"
          class="mr-4 py-2 px-4 w-20 bg-gray-200 appearance-none border-2 border-gray-200 rounded text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 select"
        >
          <option v-for="(unit, index) in store.units" :key="index">
            {{ unit }}
          </option>
        </select>
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

const category = ref("Produce");
const item = ref("");
const qty = ref("");
const units = ref("lb");

const store = useGroceryListStore();

const addItemAndClear = () => {
  if (
    category.value.length === 0 ||
    item.value.length === 0 ||
    qty.value.length === 0
  ) {
    return;
  }
  store.addItem(item, category, qty, units);
};
</script>
<style scoped>
.select {
  /* Arrow */
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 0.7rem top 50%;
  background-size: 0.65rem auto;
}
</style>
