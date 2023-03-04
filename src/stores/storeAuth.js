import { defineStore } from "pinia";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/js/firebase";
import { useGroceryListStore } from "@/stores/useGroceryListStore";

export const useStoreAuth = defineStore("storeAuth", {
  state: () => ({
    user: {},
  }),
  actions: {
    init() {
      const store = useGroceryListStore();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user.id = user.uid;
          this.user.email = user.email;
          this.router.push("/");
          store.checkAndAddOrder();
        } else {
          this.user = {};
          this.router.replace("/login");
          store.clearList();
        }
      });
    },
    registerUser(credentials) {
      createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      )
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          // console.log("error.message:", error.message);
        });
    },
    loginUser(credentials) {
      signInWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredential) => {
          const user = userCredential.user;
          // console.log("user:", user);
        })
        .catch((error) => {
          // console.log("error.message:", error.message);
        });
    },
    logoutUser() {
      signOut(auth)
        .then(() => {
          // console.log("User signed out");
        })
        .catch((error) => {
          // console.log(error.message);
        });
    },
  },
});
