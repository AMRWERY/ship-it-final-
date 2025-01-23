<template>
  <div>
    <!-- Overlay Component -->
    <Overlay :visible="localeStore.isOverlayVisible" />

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

          <nuxt-link class="me-4 text-neutral-600" to="" role="button" v-if="localeStore.isRTL">
            <span class="[&>svg]:w-5" @click="setLocale('en')">
              En
            </span>
          </nuxt-link>
          <nuxt-link class="me-4 text-neutral-600" to="" role="button" v-else>
            <span class="[&>svg]:w-5" @click="setLocale('ar')">
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
const localeStore = useLocaleStore();
// const sidebarStore = useSidebarStore()

const { locale } = useI18n();

const setLocale = (value) => {
  locale.value = value;
  localeStore.updateLocale(value);
};

computed(() => {
  const storedLocale = localeStore.locale;
  setLocale(storedLocale);
});

const authStore = useAuthStore();
const isAuthenticated = computed(() => localStorage.getItem('user'));
// const isAuthenticated = computed(() => authStore.isAuthenticated);
const isAdmin = computed(() => {
  const user = authStore.user;
  return user?.email === 'admin@ship.com';
});

onMounted(async () => {
  const { Tooltip, Ripple, initTWE } = await import("tw-elements");
  initTWE({ Tooltip, Ripple });
});
</script>