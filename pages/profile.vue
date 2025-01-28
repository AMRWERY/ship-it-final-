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
        <!-- Tabs navigation -->
        <ul :class="[
          'flex flex-col w-50 h-screen space-y-12 list-none me-4 ps-0', 'sm:block', isNavOpen ? 'block' : 'hidden']"
          role="tablist" data-twe-nav-ref>
          <li role="presentation">
            <nuxt-link to=""
              class="flex items-center gap-2 border-s-4 border-transparent px-4 py-2 text-sm font-medium leading-tight text-neutral-600 dark:text-neutral-100 focus:border-black dark:focus:border-gray-300 data-[twe-nav-active]:border-black dark:data-[twe-nav-active]:border-gray-300 data-[twe-nav-active]:text-black dark:data-[twe-nav-active]:text-gray-300 cursor-pointer"
              data-twe-toggle="pill" data-twe-target="#tabs-profile03" data-twe-nav-active role="tab"
              aria-controls="tabs-profile03" aria-selected="true">
              <icon name="iconoir:user" />
              Profile
            </nuxt-link>
          </li>
          <li role="presentation">
            <nuxt-link to=""
              class="flex items-center gap-2 border-s-4 border-transparent px-4 py-2 text-sm font-medium leading-tight text-neutral-600 dark:text-neutral-100 focus:border-black dark:focus:border-gray-300 data-[twe-nav-active]:border-black data-[twe-nav-active]:text-black dark:data-[twe-nav-active]:border-gray-300 dark:data-[twe-nav-active]:text-gray-300 cursor-pointer"
              data-twe-toggle="pill" data-twe-target="#tabs-addresses03" role="tab" aria-controls="tabs-addresses03"
              aria-selected="false">
              <icon name="iconoir:map-pin" />
              Addresses
            </nuxt-link>
          </li>
          <li role="presentation">
            <nuxt-link to=""
              class="flex items-center gap-2 border-s-4 border-transparent px-4 py-2 text-sm font-medium leading-tight text-neutral-600 dark:text-neutral-100 focus:border-black dark:focus:border-gray-300 data-[twe-nav-active]:border-black data-[twe-nav-active]:text-black dark:data-[twe-nav-active]:border-gray-300 dark:data-[twe-nav-active]:text-gray-300 cursor-pointer"
              data-twe-toggle="pill" data-twe-target="#tabs-order-tracking03" role="tab"
              aria-controls="tabs-order-tracking03" aria-selected="false">
              <icon name="iconoir:numbered-list-left" />
              Orders Tracking
            </nuxt-link>
          </li>
          <li role="presentation">
            <nuxt-link to=""
              class="flex items-center gap-2 border-s-4 border-transparent px-4 py-2 text-sm font-medium leading-tight text-neutral-600 dark:text-neutral-100 focus:border-black data-[twe-nav-active]:border-black dark:focus:border-gray-300 data-[twe-nav-active]:text-black dark:data-[twe-nav-active]:border-gray-300 dark:data-[twe-nav-active]:text-gray-300 cursor-pointer"
              data-twe-toggle="pill" data-twe-target="#tabs-messages03" role="tab" aria-controls="tabs-messages03"
              aria-selected="false">
              <icon name="tabler:messages" />
              Messages
            </nuxt-link>
          </li>
        </ul>

        <!-- Tabs content -->
        <div class="flex-1 p-4 border rounded">
          <div class="hidden opacity-100 transition-opacity duration-150 ease-linear data-[twe-tab-active]:block"
            id="tabs-profile03" role="tabpanel" aria-labelledby="tabs-profile-tab03" data-twe-tab-active>
            <!-- Profile component -->
            <profile />
          </div>
          <div class="hidden opacity-0 transition-opacity duration-150 ease-linear data-[twe-tab-active]:block"
            id="tabs-addresses03" role="tabpanel" aria-labelledby="tabs-addresses-tab03">
            <!-- Addresses component -->
            <addresses />
          </div>
          <div class="hidden opacity-0 transition-opacity duration-150 ease-linear data-[twe-tab-active]:block"
            id="tabs-order-tracking03" role="tabpanel" aria-labelledby="tabs-order-tracking-tab03">
            <!-- order-tracking component -->
            <order-tracking />
          </div>
          <div class="hidden opacity-0 transition-opacity duration-150 ease-linear data-[twe-tab-active]:block"
            id="tabs-messages03" role="tabpanel" aria-labelledby="tabs-messages-tab03">
            <!-- messages component -->
            <messages />
          </div>
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

onMounted(async () => {
  const { Tab, initTWE } = await import("tw-elements");
  initTWE({ Tab });
});
</script>