<template>
  <div>
    <div class="min-h-screen bg-gray-50 flex flex-col">
      <!-- Header -->
      <header class="bg-blue-600 text-white p-6">
        <div class="container mx-auto flex justify-between items-center">
          <h1 class="text-3xl font-bold">Help Center</h1>
          <div class="relative">
            <input type="text" placeholder="Search for help..."
              class="py-2 pl-10 pr-4 rounded-full bg-white text-gray-700 border border-gray-300 w-72 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <icon name="ic:baseline-keyboard-arrow-right"
              class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>
      </header>

      <div class="flex-grow container mx-auto flex flex-col md:flex-row mt-8 px-6">
        <!-- Sidebar -->
        <div class="w-full md:w-1/4 bg-white p-4 shadow-lg rounded-lg mb-8 md:mb-0">
          <h2 class="text-xl font-semibold mb-4">Categories</h2>
          <ul class="space-y-3 text-gray-600">
            <li><nuxt-link to="" class="hover:text-blue-600">Account Management</nuxt-link></li>
            <li><nuxt-link to="" class="hover:text-blue-600">Orders & Shipping</nuxt-link></li>
            <li><nuxt-link to="" class="hover:text-blue-600">Returns & Exchanges</nuxt-link></li>
            <li><nuxt-link to="" class="hover:text-blue-600">Payment Issues</nuxt-link></li>
            <li><nuxt-link to="" class="hover:text-blue-600">General Questions</nuxt-link></li>
          </ul>
        </div>

        <!-- Main Content -->
        <div class="w-full md:w-3/4 pl-4 md:pl-8">
          <!-- FAQ Section -->
          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <div class="space-y-6">
              <div class="border-b pb-4">
                <h3 class="text-lg font-medium text-gray-700">How do I reset my password?</h3>
                <p class="text-gray-600 mt-2">To reset your password, click on 'Forgot Password' on the login page, and
                  follow the instructions sent to your email.</p>
              </div>
              <div class="border-b pb-4">
                <h3 class="text-lg font-medium text-gray-700">How can I track my order?</h3>
                <p class="text-gray-600 mt-2">Once your order has shipped, you will receive an email with tracking
                  details. You can also check the order status in your account.</p>
              </div>
              <div class="border-b pb-4">
                <h3 class="text-lg font-medium text-gray-700">What are your return policies?</h3>
                <p class="text-gray-600 mt-2">You can return any item within 30 days of purchase. Please refer to our
                  Returns & Exchanges page for more details.</p>
              </div>
            </div>
          </section>

          <!-- Contact Support Section -->
          <section class="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">Contact Support</h2>
            <p class="text-gray-600 mb-4">If you need further assistance, you can reach our support team by filling out
              the form below:</p>
            <form action="#" class="space-y-4">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" id="name"
                  class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  required />
              </div>
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
                <input type="email" id="email"
                  class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  required />
              </div>
              <div>
                <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
                <textarea id="message" rows="4"
                  class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  required></textarea>
              </div>
              <button type="submit"
                class="w-full py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">Submit</button>
            </form>
          </section>
        </div>
      </div>

      <!-- Footer -->
      <footer class="bg-blue-600 text-white py-6 mt-12">
        <div class="container mx-auto text-center">
          <p>&copy; 2024 Ship-IT. All rights reserved.</p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>

</script>