<template>
  <div>
    <div class="customer-support bg-gradient-to-r from-blue-50 via-white to-blue-50 py-8 px-6 rounded-lg shadow-lg">
      <h3 class="text-2xl font-bold mb-6 text-center text-gray-800">Customer Support</h3>
      <div class="flex flex-wrap gap-6 justify-between">
        <!-- Contact Us -->
        <div class="w-full sm:w-[48%] md:w-[30%] bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div class="text-center">
            <div
              class="icon bg-blue-500 text-white w-12 h-12 mx-auto flex items-center justify-center rounded-full mb-4">
              <icon name="material-symbols:emoji-language" class="h-6 w-6" />
            </div>
            <h4 class="text-lg font-semibold text-gray-700">Contact Us</h4>
            <p class="text-sm text-gray-500 mt-2">Reach us at admin@ship.com or call +1 800 123 456.</p>
          </div>
        </div>

        <!-- FAQs -->
        <div class="w-full sm:w-[48%] md:w-[30%] bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div class="text-center">
            <div
              class="icon bg-green-500 text-white w-12 h-12 mx-auto flex items-center justify-center rounded-full mb-4">
              <icon name="material-symbols:check-small-rounded" class="h-6 w-6" />
            </div>
            <h4 class="text-lg font-semibold text-gray-700">FAQs</h4>
            <p class="text-sm text-gray-500 mt-2">Find answers to common questions in our FAQ section.</p>
          </div>
        </div>

        <!-- Returns -->
        <div class="w-full sm:w-[48%] md:w-[30%] bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div class="text-center">
            <div
              class="icon bg-red-500 text-white w-12 h-12 mx-auto flex items-center justify-center rounded-full mb-4">
              <icon
                name="streamline:interface-setting-menu-1-button-parallel-horizontal-lines-menu-navigation-three-hamburger"
                class="h-6 w-6" />
            </div>
            <h4 class="text-lg font-semibold text-gray-700">Returns</h4>
            <p class="text-sm text-gray-500 mt-2">Learn about our return and refund policies.</p>
          </div>
        </div>

        <!-- Live Chat -->
        <div
          class="w-full sm:w-[48%] md:w-[30%] bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow md:mx-auto">
          <div class="text-center">
            <div
              class="icon bg-purple-500 text-white w-12 h-12 mx-auto flex items-center justify-center rounded-full mb-4">
              <icon name="material-symbols:android-chat" class="h-6 w-6" />
            </div>
            <h4 class="text-lg font-semibold text-gray-700">Live Chat</h4>
            <p class="text-sm text-gray-500 mt-2">Chat with our team for instant help.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>