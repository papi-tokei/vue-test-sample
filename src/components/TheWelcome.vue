<template>
  <div class="w-2/4">
    <div class="relative">
      <input
        type="email"
        v-model="email"
        @blur="validateEmail"
        class="peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:outline-blue-500 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600"
        placeholder="Enter name"
      />
      <div
        class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none"
      >
        <svg
          class="flex-shrink-0 w-4 h-4 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </div>
    </div>
    <div>
      <p v-if="emailError" class="text-red-500">{{ emailError }}</p>
    </div>

    <div class="relative mt-1">
      <input
        type="password"
        v-model="password"
        @blur="validatePassword"
        class="peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:outline-blue-500 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600"
        placeholder="Enter password"
      />
      <div
        class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none"
      >
        <svg
          class="flex-shrink-0 w-4 h-4 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z" />
          <circle cx="16.5" cy="7.5" r=".5" />
        </svg>
      </div>
    </div>
    <div>
      <p v-if="passwordError" class="text-red-500">{{ passwordError }}</p>
    </div>

    <button
      type="submit"
      :disabled="!isFormValid"
      :class="isFormValid ? activeClass : inactiveClass"
    >
      Submit
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const email = ref('')
const emailError = ref('')
const password = ref('')
const passwordError = ref('')

const activeClass =
  'mt-4 py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
const inactiveClass =
  'mt-4 py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 opacity-50 cursor-not-allowed dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'

const validateEmail = () => {
  if (email.value !== '' && !email.value.includes('@')) {
    emailError.value = '正しいメールアドレスを入力してください。'
  } else {
    emailError.value = ''
  }
}

const validatePassword = () => {
  const regex = /^[a-zA-Z0-9]*$/

  if (!regex.test(password.value)) {
    passwordError.value = '英数字のみ入力可能です。'
  } else {
    passwordError.value = ''
  }
}

const isFormValid = computed(() => {
  return (
    email.value !== '' &&
    emailError.value === '' &&
    password.value !== '' &&
    passwordError.value === ''
  )
})
</script>
