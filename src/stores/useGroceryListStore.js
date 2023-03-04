import { defineStore } from "pinia";
import {
  collection,
  onSnapshot,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  addDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../js/firebase";
import { useStoreAuth } from "@/stores/storeAuth";

let productsCollectionRef = null;
let productsCollectionQuery = null;

let getListSnapshot = null;
let getOrderSnapshot = null;

export const useGroceryListStore = defineStore("groceryList", {
  // state
  state: () => ({
    invalidEntry: {
      item: false,
      qty: false,
    },
    groceryList: [],
    productsLoaded: false,
    showDeleteModal: false,
    selectedItem: {
      id: null,
      item: null,
      category: null,
    },
    groupedOrder: null,
    duplicateFound: false,
    categories: [
      {
        name: "Vegetable",
        icon: "fa-solid fa-carrot",
        color: "bg-green-300",
        priority: "A",
      },
      {
        name: "Fruit",
        icon: "fa-solid fa-apple-whole",
        color: "bg-lime-300",
        priority: "B",
      },
      {
        name: "Dairy",
        icon: "fa-solid fa-glass-water",
        color: "bg-slate-200",
        priority: "C",
      },
      {
        name: "Bakery",
        icon: "fa-solid fa-bread-slice",
        color: "bg-amber-200",
        priority: "D",
      },
      {
        name: "Deli",
        icon: "fa-solid fa-cheese",
        color: "bg-orange-300",
        priority: "E",
      },
      {
        name: "Pantry",
        icon: "fa-solid fa-basket-shopping",
        color: "bg-zinc-200",
        priority: "F",
      },
      {
        name: "Meat",
        icon: "fa-solid fa-drumstick-bite",
        color: "bg-red-300",
        priority: "G",
      },
      {
        name: "Seafood",
        icon: "fa-solid fa-fish",
        color: "bg-sky-100",
        priority: "H",
      },
      {
        name: "Frozen",
        icon: "fa-solid fa-ice-cream",
        color: "bg-sky-300",
        priority: "I",
      },
      {
        name: "Beverage",
        icon: "fa-solid fa-bottle-water",
        color: "bg-cyan-100",
        priority: "J",
      },
      {
        name: "Health and Beauty",
        icon: "fa-solid fa-pump-soap",
        color: "bg-purple-300",
        priority: "K",
      },
      {
        name: "Laundry and Cleaning",
        icon: "fa-solid fa-jug-detergent",
        color: "bg-violet-200",
        priority: "L",
      },
      {
        name: "Pharmacy",
        icon: "fa-solid fa-prescription-bottle-medical",
        color: "bg-rose-200",
        priority: "M",
      },
      {
        name: "Candy",
        icon: "fa-solid fa-candy-cane",
        color: "bg-pink-300",
        priority: "N",
      },
      {
        name: "Alcohol",
        icon: "fa-solid fa-wine-bottle",
        color: "bg-indigo-300",
        priority: "O",
      },
      {
        name: "Pet",
        icon: "fa-solid fa-paw",
        color: "bg-yellow-200",
        priority: "P",
      },
      {
        name: "Clothing",
        icon: "fa-solid fa-socks",
        color: "bg-lime-100",
        priority: "Q",
      },
      {
        name: "Electronic",
        icon: "fa-solid fa-tablet-screen-button",
        color: "bg-yellow-300",
        priority: "R",
      },
      {
        name: "Automotive",
        icon: "fa-solid fa-car",
        color: "bg-gray-200",
        priority: "S",
      },
      {
        name: "Supply",
        icon: "fa-solid fa-stapler",
        color: "bg-indigo-100",
        priority: "T",
      },
      {
        name: "Other",
        icon: "fa-solid fa-shapes",
        color: "bg-stone-300",
        priority: "U",
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
    async checkAndAddOrder() {
      const storeAuth = useStoreAuth();
      const orderCollectionRef = doc(
        db,
        "users",
        storeAuth.user.id,
        "order",
        "order"
      );
      const docSnap = await getDoc(orderCollectionRef);

      if (docSnap.exists()) {
        if (docSnap.data().order != null) {
          this.groupedOrder = docSnap.data().order;
        }
      } else {
        await setDoc(doc(db, "users", storeAuth.user.id, "order", "order"), {
          order: true,
        });
        this.groupedOrder = true;
      }
      this.init();
    },
    async init() {
      const storeAuth = useStoreAuth();
      productsCollectionRef = collection(
        db,
        "users",
        storeAuth.user.id,
        "products"
      );

      const orderCollectionRef = doc(
        db,
        "users",
        storeAuth.user.id,
        "order",
        "order"
      );

      const docSnap = await getDoc(orderCollectionRef);

      if (docSnap.exists()) {
        if (docSnap.data().order === true) {
          productsCollectionQuery = query(productsCollectionRef, orderBy("id"));
        } else {
          productsCollectionQuery = query(
            productsCollectionRef,
            orderBy("date")
          );
        }
      } else {
        productsCollectionQuery = query(productsCollectionRef, orderBy("id"));
      }
      this.getProducts();
    },
    async getProducts() {
      this.productsLoaded = false;
      getListSnapshot = onSnapshot(
        productsCollectionQuery,
        (querySnapshot) => {
          let products = [];
          querySnapshot.forEach((doc) => {
            let product = {
              id: doc.id,
              sortId: doc.data().id,
              category: doc.data().category,
              completed: doc.data().completed,
              item: doc.data().item,
              quantity: doc.data().quantity,
              units: doc.data().units,
              date: doc.data().date,
            };
            products.push(product);
          });
          this.groceryList = products;
          this.productsLoaded = true;
        },
        (error) => {
          console.log("error.message: ", error.message);
        }
      );
    },
    clearList() {
      this.groceryList = [];
      this.selectedItem = {};
      // unsubscribe from any active listener
      if (getListSnapshot) {
        getListSnapshot();
      }
      if (getOrderSnapshot) {
        getOrderSnapshot();
      }
    },
    async addProduct(item, category, qty, units) {
      if (item.value.length === 0 && qty.value.length === 0) {
        this.invalidEntry = {
          item: true,
          qty: true,
        };
        return;
      } else if (item.value.length === 0) {
        this.invalidEntry = {
          item: true,
          qty: false,
        };
        return;
      } else if (qty.value.length === 0) {
        this.invalidEntry = {
          item: false,
          qty: true,
        };
        return;
      }

      let currentDate = new Date().getTime().toString();

      let foundCategory = this.categories.find((obj) => {
        return obj.name === category.value;
      });

      let foundPriority = foundCategory.priority;

      let id = foundPriority + currentDate;

      if (isNaN(qty.value)) {
        return;
      } else {
        qty.value = Number(qty.value);
      }
      if (this.groceryList.length > 0) {
        if (
          this.groceryList.find(
            (obj) =>
              obj.item === item.value && obj.category.name === category.value
          )
        ) {
          this.duplicateFound = true;
          this.selectedItem.item = item;
          this.selectedItem.category = category;
          return;
        }
      }
      await addDoc(productsCollectionRef, {
        id: id,
        category: this.categories.find((obj) => obj.name === category.value),
        item: item.value,
        quantity: qty.value,
        units: units.value,
        completed: false,
        date: currentDate,
      });
      this.invalidEntry = {
        item: false,
        qty: false,
      };
    },
    async deleteProduct(id) {
      this.showDeleteModal = false;
      await deleteDoc(doc(productsCollectionRef, id));
    },
    async toggleCompleted(id, completed) {
      await updateDoc(doc(productsCollectionRef, id), {
        completed: !completed,
      });
    },
    toggleDeleteModal(id, item) {
      this.selectedItem = { id: id, item: item };
      this.showDeleteModal = true;
    },
    async toggleOrder() {
      const storeAuth = useStoreAuth();
      await updateDoc(doc(db, "users", storeAuth.user.id, "order", "order"), {
        order: this.groupedOrder,
      });
      this.init();
    },
  },
});
