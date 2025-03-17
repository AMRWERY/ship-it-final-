<template>
  <div>
    <footer class="text-center text-white bg-black lg:text-start">
      <div class="flex items-center justify-center p-6 border-b-2 border-neutral-400 lg:justify-between">
        <div class="hidden me-12 lg:block">
          <span>{{ $t('footer.get_connected_with_us_on_social_networks') }}</span>
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
              Ship-IT {{ $t('footer.is_your_trusted_ecommerce_solution_for_the_best_shopping_experience') }}
            </p>

            <div class="mt-10">
              <p class="text-xl font-medium leading-5 text-gray-100">{{ $t('footer.get_updates') }}</p>
              <div class="flex justify-center mt-3 md:justify-start">
                <!-- chat-list  component -->
                <chat-list />
              </div>
            </div>
          </div>

          <!-- Useful links section 1 -->
          <div class="">
            <h6 class="flex justify-center mb-4 font-semibold md:justify-start">
              {{ $t('footer.categories') }}
            </h6>
            <p class="mb-4">
              <nuxt-link to="" class="text-white">{{ $t('footer.women') }}</nuxt-link>
            </p>
            <p class="mb-4">
              <nuxt-link to="" class="text-white">{{ $t('footer.men') }}</nuxt-link>
            </p>
            <p class="mb-4">
              <nuxt-link to="" class="text-white">{{ $t('footer.juniors_kids') }}</nuxt-link>
            </p>
            <p class="mb-4">
              <nuxt-link to="" class="text-white">{{ $t('footer.electronics') }}</nuxt-link>
            </p>
            <p>
              <nuxt-link to="" class="text-white">{{ $t('footer.beauty') }}</nuxt-link>
            </p>
          </div>
          <!-- Useful links section 2 -->
          <div class="">
            <h6 class="flex justify-center mb-4 font-semibold md:justify-start">
              {{ $t('footer.quick_links') }}
            </h6>
            <p class="mb-4">
              <nuxt-link to="/blogs" class="text-white">{{ $t('footer.blogs') }}</nuxt-link>
            </p>
            <p class="mb-4">
              <nuxt-link to="/help-center" class="text-white">{{ $t('footer.help_center') }}</nuxt-link>
            </p>
          </div>
          <!-- Contact section -->
          <div>
            <h6 class="flex justify-center mb-4 font-semibold md:justify-start">
              {{ $t('footer.contact') }}
            </h6>
            <p class="flex items-center justify-center mb-4 md:justify-start">
              <icon name="material-symbols:home-work-outline-rounded" class="w-5 h-5 me-3" />
              {{ $t('footer.maadi_cairo_egypt') }}
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
    </footer>
  </div>
</template>

<script setup>

</script>