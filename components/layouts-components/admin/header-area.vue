<template>
  <div>
    <!-- Overlay Component -->
    <Overlay :visible="isOverlayVisible" />

    <header class="sticky top-0 flex w-full bg-white z-999 drop-shadow-1">
      <div class="flex items-center justify-between flex-grow px-4 py-4 shadow-2 md:px-6">
        <div class="flex items-center gap-2 sm:gap-4 lg:hidden">
          <!-- Hamburger Toggle BTN -->
          <button class="z-50 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm lg:hidden" @click="() => {
            toggleSidebar()
          }">
            <span class="relative block h-[1.375rem] w-[1.375rem] cursor-pointer">
              <icon name="meteor-icons:bars" />
            </span>
          </button>
        </div>

        <div class="flex items-center space-s-5 ms-auto">
          <ul class="flex items-center space-s-5" v-if="isAuthenticated">
            <!-- Notification Menu Area -->
            <dropdown-notification />
            <!-- Notification Menu Area -->

            <!-- Chat Notification Area -->
            <dropdown-message />
            <!-- Chat Notification Area -->

            <!-- User Area -->
            <dropdown-user />
            <!-- User Area -->
          </ul>

          <nuxt-link class="me-4 text-neutral-600" to="" role="button" v-if="isRTL">
            <span class="[&>svg]:w-5" @click="updateLocale('en')">
              En
            </span>
          </nuxt-link>
          <nuxt-link class="me-4 text-neutral-600" to="" role="button" v-else>
            <span class="[&>svg]:w-5" @click="updateLocale('ar')">
              العربية
            </span>
          </nuxt-link>

          <nuxt-link to="/" type="button" class="relative hidden text-gray-700 rounded-full sm:flex"
            data-twe-toggle="tooltip" data-twe-placement="bottom" :title="$t('tooltip.back_to_home')">
            <span class="absolute -inset-1.5" />
            <span class="sr-only">Back to Home Page</span>
            <icon name="material-symbols:house" />
          </nuxt-link>

          <nuxt-link to="/dashboard/login" class="text-neutral-600" v-if="!isAuthenticated && isAdmin">login</nuxt-link>
        </div>
      </div>
    </header>
  </div>
</template>

<script setup>
const { toggleSidebar } = useSidebarStore()
// const sidebarStore = useSidebarStore()

const isRTL = ref(false);
const { locale } = useI18n();
const isOverlayVisible = ref(false);

const updateLocale = (value) => {
  isOverlayVisible.value = true;
  setLocale(value);
  localStorage.setItem('locale', value);
  isRTL.value = value === 'ar';
  setTimeout(() => {
    isOverlayVisible.value = false;
    // location.reload();
  }, 3000);
};

onMounted(() => {
  const storedLocale = localStorage.getItem('locale') || 'en';
  setLocale(storedLocale);
  isRTL.value = storedLocale === 'ar';
});

const setLocale = (lang) => {
  locale.value = lang;
};

const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.isAuthenticated);
const isAdmin = computed(() => {
  const user = authStore.user;
  return user?.email === 'admin@ship.com';
});

onMounted(async () => {
  const { Tooltip, Ripple, initTWE } = await import("tw-elements");
  initTWE({ Tooltip, Ripple });
});
</script>