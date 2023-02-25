import { defineStore } from "pinia";

export const useGroceryListStore = defineStore("groceryList", {
  // state
  state: () => ({
    groceryList: [],
    id: 0,
    categories: [
      {
        name: "Vegetable",
        icon: "fa-solid fa-carrot",
        color: "bg-green-300",
      },
      {
        name: "Fruit",
        icon: "fa-solid fa-apple-whole",
        color: "bg-lime-300",
      },
      {
        name: "Dairy",
        icon: "fa-solid fa-glass-water",
        color: "bg-slate-200",
      },
      {
        name: "Bakery",
        icon: "fa-solid fa-bread-slice",
        color: "bg-amber-200",
      },
      {
        name: "Deli",
        icon: "fa-solid fa-cheese",
        color: "bg-orange-300",
      },
      {
        name: "Pantry",
        icon: "fa-solid fa-basket-shopping",
        color: "bg-zinc-200",
      },
      {
        name: "Meat",
        icon: "fa-solid fa-drumstick-bite",
        color: "bg-red-300",
      },
      {
        name: "Seafood",
        icon: "fa-solid fa-fish",
        color: "bg-sky-100",
      },
      {
        name: "Health and Beauty",
        icon: "fa-solid fa-pump-soap",
        color: "bg-purple-300",
      },
      {
        name: "Laundry and Cleaning",
        icon: "fa-solid fa-jug-detergent",
        color: "bg-violet-200",
      },
      {
        name: "Pharmacy",
        icon: "fa-solid fa-prescription-bottle-medical",
        color: "bg-rose-200",
      },
      {
        name: "Candy",
        icon: "fa-solid fa-candy-cane",
        color: "bg-pink-300",
      },
      {
        name: "Alcohol",
        icon: "fa-solid fa-wine-bottle",
        color: "bg-indigo-300",
      },
      {
        name: "Frozen",
        icon: "fa-solid fa-ice-cream",
        color: "bg-sky-300",
      },
      {
        name: "Beverage",
        icon: "fa-solid fa-bottle-water",
        color: "bg-cyan-100",
      },
      {
        name: "Clothing",
        icon: "fa-solid fa-socks",
        color: "bg-lime-100",
      },
      {
        name: "Electronic",
        icon: "fa-solid fa-tablet-screen-button",
        color: "bg-yellow-300",
      },
      {
        name: "Pet",
        icon: "fa-solid fa-paw",
        color: "bg-yellow-200",
      },
      {
        name: "Automotive",
        icon: "fa-solid fa-car",
        color: "bg-gray-200",
      },
      {
        name: "Supply",
        icon: "fa-solid fa-stapler",
        color: "bg-indigo-100",
      },
      {
        name: "Other",
        icon: "fa-solid fa-shapes",
        color: "bg-stone-300",
      },
    ],
    units: [
      "lb",
      "oz",
      "pk",
      "g",
      "gal",
      "l",
      "btl",
      "mg",
      "pt",
      "qt",
      "pcs",
      "bch",
      "cs",
      "box",
      "unit",
    ],
  }),
  actions: {
    addItem(item, category, qty, units) {
      this.groceryList.push({
        id: this.id++,
        category: this.categories.find((obj) => obj.name === category.value),
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
