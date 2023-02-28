<template>
  <div class="mx-1 auth">
    <div
      class="mb-8 text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700"
    >
      <ul class="flex justify-center -mb-px">
        <li class="mr-2">
          <a
            @click.prevent="register = false"
            href="#"
            :class="
              !register
                ? 'inline-block p-4 text-blue-500 border-b-2 border-blue-500 rounded-t-lg active dark:text-blue-500 dark:border-blue-500'
                : 'inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
            "
            >Login</a
          >
        </li>
        <li class="mr-2">
          <a
            @click.prevent="register = true"
            href="#"
            :class="
              register
                ? 'inline-block p-4 text-blue-500 border-b-2 border-blue-500 rounded-t-lg active dark:text-blue-500 dark:border-blue-500'
                : 'inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
            "
            >Register</a
          >
        </li>
      </ul>
    </div>
    <div
      class="mx-auto max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700"
    >
      <form @submit.prevent="onSubmit" class="space-y-6">
        <h5
          class="text-xl text-center font-medium text-gray-900 dark:text-white"
        >
          {{ formTitle }}
        </h5>
        <div>
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Email</label
          >
          <input
            v-model="credentials.email"
            type="email"
            name="email"
            id="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="name@company.com"
          />
        </div>
        <div>
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Password</label
          >
          <input
            v-model="credentials.password"
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          />
        </div>
        <div v-if="register">
          <label
            for="confirm"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Confirm password</label
          >
          <input
            v-model="confirm"
            type="password"
            name="confirm"
            id="confirm"
            placeholder="••••••••"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          />
        </div>

        <button
          type="submit"
          class="w-full text-white bg-blue-500 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {{ formTitle }}
        </button>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, reactive } from "vue";
import { useStoreAuth } from "@/stores/storeAuth";

const storeAuth = useStoreAuth();

const register = ref(false);

const formTitle = computed(() => {
  return register.value ? "Register" : "Login";
});

const onSubmit = () => {
  if (!credentials.email || !credentials.password) {
    alert("Please enter an email and password");
  } else {
    if (register.value) {
      if (credentials.password === confirm.value) {
        storeAuth.registerUser(credentials);
      } else {
        alert("Passwords do not match!");
        return;
      }
    } else {
      storeAuth.loginUser(credentials);
    }
  }
};

const credentials = reactive({
  email: "",
  password: "",
});

const confirm = ref("");
</script>
<style scoped></style>
