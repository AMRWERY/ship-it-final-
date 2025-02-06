<template>
  <div>
    <div class="space-y-6">
      <div v-for="(item, index) in faqItems" :key="index" class="border border-gray-300 rounded-lg">
        <button @click="toggle(index)"
          class="flex items-center justify-between w-full px-4 py-2 text-lg font-medium text-gray-800 bg-gray-200 text-start focus:outline-none hover:bg-gray-300">
          <span>{{ item.question }}</span>
          <span :class="{ 'transform rotate-180': openStates[index], 'transform rotate-0': !openStates[index] }"
            class="transition-transform duration-200 ease-in-out">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </button>

        <Transition>
          <div v-show="openStates[index]"
            class="px-4 py-2 transition-all duration-300 ease-in-out border-t border-gray-300">
            <p class="px-5 py-4">{{ item.answer }}</p>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
const faqItems = computed(() => [
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy for unused and unopened items. Contact support for more details."
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order ships, you will receive a tracking number via email to track your package."
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes, we ship to over 50 countries worldwide. Shipping rates and delivery times vary by location."
  },
  {
    question: "How do I reset my password?",
    answer:
      "To reset your password, click 'Forgot Password' on the login page and follow the instructions."
  }
]);

const openStates = ref(faqItems.value.map((_, i) => i === 0));

const toggle = (index) => {
  openStates.value[index] = !openStates.value[index];
};
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>