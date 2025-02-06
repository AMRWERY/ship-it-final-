<template>
  <div>
    <div class="p-6">
      <div class="mb-12">
        <p class="text-3xl font-bold text-gray-800 dark:text-gray-200">Profile</p>
        <p class="text-gray-600 font-body dark:text-gray-100">Manage your profile details</p>
      </div>
      <!-- Toggle button for small screens -->
      <button class="flex items-center gap-2 px-4 py-2 mb-4 rounded sm:hidden btn-style" @click="toggleNav">
        <icon :name="isNavOpen ? 'iconoir:cancel' : 'iconoir:menu'" />
      </button>

      <div class="flex">
        <ul :class="[
          'flex flex-col w-50 h-screen space-y-12 list-none me-4 ps-0', 'sm:block', isNavOpen ? 'block' : 'hidden']">
          <li>
            <nuxt-link to="" role="button" @click="activeTab = 'tab1'"
              class="flex items-center gap-2 px-4 py-2 text-sm font-medium leading-tight border-transparent cursor-pointer border-s-4 text-neutral-600 dark:text-neutral-100 focus:border-black dark:focus:border-gray-300">
              <icon name="iconoir:user" />
              Profile
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="" role="button" @click="activeTab = 'tab2'"
              class="flex items-center gap-2 px-4 py-2 text-sm font-medium leading-tight border-transparent cursor-pointer border-s-4 text-neutral-600 dark:text-neutral-100 focus:border-black dark:focus:border-gray-300">
              <icon name="iconoir:map-pin" />
              Addresses
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="" role="button" @click="activeTab = 'tab3'"
              class="flex items-center gap-2 px-4 py-2 text-sm font-medium leading-tight border-transparent cursor-pointer border-s-4 text-neutral-600 dark:text-neutral-100 focus:border-black dark:focus:border-gray-300">
              <icon name="iconoir:numbered-list-left" />
              Orders Tracking
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="" role="button" @click="activeTab = 'tab4'"
              class="flex items-center gap-2 px-4 py-2 text-sm font-medium leading-tight border-transparent cursor-pointer border-s-4 text-neutral-600 dark:text-neutral-100 focus:border-black dark:focus:border-gray-300">
              <icon name="tabler:messages" />
              Messages
            </nuxt-link>
          </li>
        </ul>

        <!-- Tab Content -->
        <div class="flex-1 p-4 border rounded">
          <Transition name="fade">
            <div class="transition-opacity duration-150 ease-linear opacity-100" v-if="activeTab === 'tab1'">
              <!-- Profile component -->
              <profile />
            </div>
          </Transition>

          <Transition name="fade">
            <div class="transition-opacity duration-150 ease-linear opacity-100" v-if="activeTab === 'tab2'">
              <!-- Addresses component -->
              <addresses />
            </div>
          </Transition>

          <Transition name="fade">
            <div class="transition-opacity duration-150 ease-linear opacity-100" v-if="activeTab === 'tab3'">
              <!-- order-tracking component -->
              <order-tracking />
            </div>
          </Transition>

          <Transition name="fade">
            <div class="transition-opacity duration-150 ease-linear opacity-100" v-if="activeTab === 'tab4'">
              <!-- messages component -->
              <messages />
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const isNavOpen = ref(false);

const toggleNav = () => {
  isNavOpen.value = !isNavOpen.value;
};

const activeTab = ref('tab1');
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>