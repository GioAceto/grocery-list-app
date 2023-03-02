<template>
  <div class="grocery-list">
    <DeleteModal v-if="store.showDeleteModal" />
    <DuplicateModal v-if="store.duplicateFound" />
    <div class="mb-4 flex justify-center">
      <ListForm />
    </div>
    <div class="mb-4 flex justify-left px-4">
      <label class="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          class="sr-only peer"
          checked
          v-model="store.groupedOrder"
          @change="store.toggleOrder"
        />
        <div
          class="mr-1 w-8 h-4 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-gray after:content-[''] after:absolute after:left-[1px] after:bottom-[3px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-500"
        ></div>
        <span class="ml-3 text-sm text-black">Group by category</span>
      </label>
    </div>
    <div v-if="!store.productsLoaded" role="status">
      <svg
        aria-hidden="true"
        class="spinner w-12 h-12 text-gray-200 animate-spin fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span class="sr-only">Loading...</span>
    </div>

    <template v-else>
      <div v-if="!store.groceryList.length">
        <p class="py-2 text-lg text-slate-500 flex items-center justify-center">
          <span class="mr-2"
            ><font-awesome-icon icon="fa-solid fa-list"
          /></span>
          No list items here yet...
        </p>
      </div>
      <ul
        class="container mx-auto flex flex-col items-center text-sm overflow-y-scroll"
      >
        <TransitionGroup name="list" tag="ul">
          <li v-for="item in store.groceryList" :key="item.id" class="item">
            <div
              class="my-2 px-4 h-12 rounded flex flex-row justify-between items-center"
              :class="[
                item.category.color,
                item.completed ? 'strike-through' : false,
              ]"
            >
              <button
                @click="store.toggleCompleted(item.id, item.completed)"
                class="cursor-pointer w-2/12 flex justify-center items-center"
              >
                <font-awesome-icon
                  :icon="
                    item.completed
                      ? 'fa-regular fa-square-check'
                      : 'fa-regular fa-square'
                  "
                />
              </button>
              <div class="w-2/12 flex justify-center items-center">
                <font-awesome-icon :icon="item.category.icon" />
              </div>
              <div
                class="w-5/12 flex items-center overflow-x-auto whitespace-nowrap h-full"
              >
                {{ item.item }}
              </div>
              <div class="ml-2 flex items-center w-3/12 whitespace-nowrap">
                {{ `x ${item.quantity} ${item.units}` }}
              </div>
              <button
                @click="store.toggleDeleteModal(item.id, item.item)"
                class="ml-4 flex justify-center items-center cursor-pointer w-1/12"
              >
                <font-awesome-icon icon="fa-solid fa-xmark" />
              </button>
            </div>
          </li>
        </TransitionGroup>
      </ul>
    </template>
  </div>
</template>
<script setup>
import ListForm from "../components/ListForm.vue";
import { useGroceryListStore } from "../stores/useGroceryListStore";
import DeleteModal from "../components/DeleteModal.vue";
import DuplicateModal from "../components/DuplicateModal.vue";

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

.spinner {
  margin: 0 auto;
}

.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
