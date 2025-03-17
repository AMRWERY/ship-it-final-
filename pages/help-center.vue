<template>
  <div>
    <div class="flex flex-col min-h-screen shadow-xl dark:shadow-slate-50">
      <!-- Header -->
      <header class="p-6 text-white bg-blue-600 dark:bg-blue-400">
        <div class="container flex items-center justify-between mx-auto">
          <h1 class="text-3xl font-bold">Help Center</h1>
          <div class="relative">
            <input type="text" placeholder="Search for help..."
              class="py-2 pr-4 text-gray-700 border border-gray-300 rounded-full ps-10 w-72 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <icon name="ic:baseline-keyboard-arrow-right"
              class="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 start-3 top-1/2 rtl:rotate-180" />
          </div>
        </div>
      </header>

      <div class="container flex flex-col flex-grow px-6 mx-auto mt-8 md:flex-row">
        <!-- Sidebar -->
        <div class="w-full p-4 mb-8 rounded-lg shadow-lg md:w-1/4 md:mb-0">
          <h2 class="mb-4 text-xl font-semibold">Categories</h2>
          <ul class="space-y-3">
            <li><nuxt-link to=""
                class="text-blue-500 hover:text-blue-600 dark:text-blue-300 dark:hover:text-blue-400">Account
                Management</nuxt-link></li>
            <li><nuxt-link to=""
                class="text-blue-500 hover:text-blue-600 dark:text-blue-300 dark:hover:text-blue-400">Orders &
                Shipping</nuxt-link></li>
            <li><nuxt-link to=""
                class="text-blue-500 hover:text-blue-600 dark:text-blue-300 dark:hover:text-blue-400">Returns &
                Exchanges</nuxt-link></li>
            <li><nuxt-link to=""
                class="text-blue-500 hover:text-blue-600 dark:text-blue-300 dark:hover:text-blue-400">Payment
                Issues</nuxt-link></li>
            <li><nuxt-link to=""
                class="text-blue-500 hover:text-blue-600 dark:text-blue-300 dark:hover:text-blue-400">General
                Questions</nuxt-link></li>
          </ul>
        </div>``

        <!-- Main Content -->
        <div class="w-full ps-4 md:w-3/4 md:ps-8">
          <!-- FAQ Section -->
          <section class="mb-8">
            <h2 class="mb-4 text-2xl font-semibold text-gray-800 dark:text-gray-200">Frequently Asked Questions</h2>
            <div class="space-y-6">
              <div class="pb-4 border-b">
                <h3 class="text-lg font-medium text-gray-700 dark:text-gray-100">How do I reset my password?</h3>
                <p class="mt-2 text-gray-600 dark:text-gray-100">To reset your password, click on 'Forgot Password' on
                  the login page, and
                  follow the instructions sent to your email.</p>
              </div>
              <div class="pb-4 border-b">
                <h3 class="text-lg font-medium text-gray-700 dark:text-gray-100">How can I track my order?</h3>
                <p class="mt-2 text-gray-600 dark:text-gray-100">Once your order has shipped, you will receive an email
                  with tracking
                  details. You can also check the order status in your account.</p>
              </div>
              <div class="pb-4 border-b">
                <h3 class="text-lg font-medium text-gray-700 dark:text-gray-100">What are your return policies?</h3>
                <p class="mt-2 text-gray-600 dark:text-gray-100">You can return any item within 30 days of purchase.
                  Please refer to our
                  Returns & Exchanges page for more details.</p>
              </div>
            </div>
          </section>

          <!-- Contact Support Section -->
          <section class="p-6 mb-8 rounded-lg shadow-lg">
            <h2 class="mb-4 text-2xl font-semibold text-gray-800 dark:text-gray-200">Contact Support</h2>
            <p class="mb-4 text-gray-600 dark:text-gray-100">If you need further assistance, you can reach our support
              team by filling out
              the form below:</p>
            <form action="" class="space-y-4">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-100">Full Name</label>
                <input type="text" id="name"
                  class="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  required />
              </div>
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-100">Email
                  Address</label>
                <input type="email" id="email"
                  class="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  required />
              </div>
              <div>
                <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-100">Message</label>
                <textarea id="message" rows="4"
                  class="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  required></textarea>
              </div>
              <button type="submit" class="w-full py-2 btn-style">Submit</button>
            </form>
          </section>
        </div>
      </div>

      <!-- Footer -->
      <footer class="py-6 mt-12 text-white bg-blue-600 dark:bg-blue-400">
        <div class="container mx-auto text-center">
          <p>&copy; 2024 Ship-IT. All rights reserved.</p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>

</script>