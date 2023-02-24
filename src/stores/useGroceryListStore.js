import { defineStore } from "pinia";

export const useGroceryListStore = defineStore("groceryList", {
  // state
  state: () => ({
    groceryList: [],
    id: 0,
    categories: [
      "Produce",
      "Dairy",
      "Bakery",
      "Deli",
      "Grocery",
      "Meat",
      "Seafood",
      "Health and Beauty",
      "Pharmacy",
      "Candy",
      "Alcohol",
      "Frozen",
      "Clothing",
      "Electronic",
      "Other",
    ],
    units: ["lb", "oz", "pcs", "g", "gal", "l", "c", "mg", "pt", "qt", "bch"],
  }),
  actions: {
    addItem(item, category, qty, units) {
      this.groceryList.push({
        id: this.id++,
        category: category.value,
        item: item.value,
        quantity: qty.value,
        units: units.value,
        completed: false,
      });
    },
    deleteItem(itemId) {
      this.groceryList = this.groceryList.filter((object) => {
        return object.id !== itemId;
      });
    },
    toggleCompleted(idToFind) {
      const item = this.groceryList.find((obj) => obj.id === idToFind);
      if (item) {
        item.completed = !item.completed;
      }
    },
  },
});
