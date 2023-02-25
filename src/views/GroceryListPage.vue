<template>
  <div class="grocery-list">
    <DeleteModal v-if="store.showDeleteModal" />
    <DuplicateModal v-if="store.duplicateFound" />
    <div class="mb-8 flex justify-center">
      <ListForm />
    </div>
    <div
      class="container mx-auto flex flex-col items-center text-sm overflow-y-scroll"
    >
      <div v-for="(item, index) in store.groceryList" :key="index" class="item">
        <div
          class="my-2 px-4 h-12 rounded flex flex-row justify-between items-center"
          :class="[
            item.category.color,
            item.completed ? 'strike-through' : false,
          ]"
        >
          <div
            @click="store.toggleCompleted(item.id)"
            class="cursor-pointer w-2/12 flex justify-center items-center"
          >
            <font-awesome-icon
              :icon="
                item.completed
                  ? 'fa-regular fa-square-check'
                  : 'fa-regular fa-square'
              "
            />
          </div>
          <div class="w-2/12 flex justify-center items-center">
            <font-awesome-icon :icon="item.category.icon" />
          </div>
          <div
            class="w-5/12 flex items-center overflow-x-scroll whitespace-nowrap h-full"
          >
            {{ item.item }}
          </div>
          <div class="ml-2 flex items-center w-3/12 whitespace-nowrap">
            {{ `x ${item.quantity} ${item.units}` }}
          </div>
          <div
            @click="toggleDeleteModal(item.id, item.item)"
            class="ml-4 flex justify-center items-center cursor-pointer w-1/12"
          >
            <font-awesome-icon icon="fa-solid fa-xmark" />
          </div>
          <DeleteModal v-if="store.showDeleteModal" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import ListForm from "../components/ListForm.vue";
import { useGroceryListStore } from "../stores/useGroceryListStore";
import DeleteModal from "../components/DeleteModal.vue";
import DuplicateModal from "../components/DuplicateModal.vue";

const store = useGroceryListStore();

const toggleDeleteModal = (id, item) => {
  store.selectedItem = { id: id, item: item };
  store.showDeleteModal = true;
};
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
