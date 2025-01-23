<template>
  <div>
    <footer class="text-center text-white bg-black lg:text-start">
      <div class="flex items-center justify-center p-6 border-b-2 border-neutral-400 lg:justify-between">
        <div class="hidden me-12 lg:block">
          <span>Get connected with us on social networks:</span>
        </div>
        <!-- Social network icons container -->
        <div class="flex justify-center">
          <nuxt-link to="" class="me-6">
            <icon name="logos:facebook" class="w-6 h-6" />
          </nuxt-link>
          <nuxt-link to="" class="me-6">
            <icon name="skill-icons:instagram" class="w-6 h-6" />
          </nuxt-link>
          <nuxt-link to="" class="me-6">
            <icon name="fa6-brands:x-twitter" class="w-6 h-6" />
          </nuxt-link>
          <nuxt-link to="" class="me-6">
            <icon name="logos:whatsapp-icon" class="w-6 h-6" />
          </nuxt-link>
        </div>
      </div>

      <div class="py-10 mx-6 text-center md:text-start">
        <div class="grid gap-8 grid-1 md:grid-cols-2 lg:grid-cols-4 lg:space-s-36">
          <div class="">
            <h6 class="flex items-center justify-center mb-4 font-semibold md:justify-start">
              <img class="w-auto h-12 me-1" src="@/public/shopping-bags.svg" />
              <span class="text-2xl">Ship-IT</span>
            </h6>
            <p class="text-lg">
              Ship-IT is your trusted e-commerce solution for the best shopping experience.
            </p>
          </div>

          <!-- Useful links section 1 -->
          <div class="">
            <h6 class="flex justify-center mb-4 font-semibold md:justify-start">
              Categories
            </h6>
            <p class="mb-4">
              <nuxt-link to="" class="text-white">Women</nuxt-link>
            </p>
            <p class="mb-4">
              <nuxt-link to="" class="text-white">Men</nuxt-link>
            </p>
            <p class="mb-4">
              <nuxt-link to="" class="text-white">Juniors &
                Kids</nuxt-link>
            </p>
            <p class="mb-4">
              <nuxt-link to="" class="text-white">Electronics</nuxt-link>
            </p>
            <p>
              <nuxt-link to="" class="text-white">Beauty</nuxt-link>
            </p>
          </div>
          <!-- Useful links section 2 -->
          <div class="">
            <h6 class="flex justify-center mb-4 font-semibold md:justify-start">
              Quick Links
            </h6>
            <p class="mb-4">
              <nuxt-link to="/blogs" class="text-white">Blogs</nuxt-link>
            </p>
            <p class="mb-4">
              <nuxt-link to="/customer-support" class="text-white">Customer Support</nuxt-link>
            </p>
            <p class="mb-4">
              <nuxt-link to="/faqs" class="text-white">FAQs</nuxt-link>
            </p>
            <p class="mb-4">
              <nuxt-link to="/help-center" class="text-white">Help Center</nuxt-link>
            </p>
          </div>
          <!-- Contact section -->
          <div>
            <h6 class="flex justify-center mb-4 font-semibold md:justify-start">
              Contact
            </h6>
            <p class="flex items-center justify-center mb-4 md:justify-start">
              <icon name="material-symbols:home-work-outline-rounded" class="w-5 h-5 me-3" />
              Maadi, Cairo, Egypt
            </p>
            <p class="flex items-center justify-center mb-4 md:justify-start">
              <icon name="material-symbols:alternate-email-rounded" class="w-5 h-5 me-3" />
              amrmounir2@gmail.com
            </p>
            <p class="flex items-center justify-center mb-4 md:justify-start">
              <icon name="material-symbols:call" class="w-5 h-5 me-3" />
              +201022655742
            </p>
          </div>
        </div>
      </div>

      <!--Copyright section-->
      <div class="p-6 text-center bg-black border-t-2 border-neutral-400">
        <span class="me-1">© 2024 Copyright:</span>
        <nuxt-link class="font-semibold text-white" to="">Ship-IT</nuxt-link>
      </div>
    </footer>
  </div>
</template>

<script setup>

</script>