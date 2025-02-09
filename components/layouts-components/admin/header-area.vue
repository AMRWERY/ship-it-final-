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
          <!-- <ul class="flex items-center space-s-5" v-if="isAuthenticated">
            <dropdown-notification />

            <dropdown-message />

            <dropdown-user />
          </ul> -->

          <nuxt-link class="text-neutral-600" to="" role="button" v-if="localeStore.isRTL">
            <span class="[&>svg]:w-5" @click="setLocale('en')">
              En
            </span>
          </nuxt-link>
          <nuxt-link class="text-neutral-600" to="" role="button" v-else>
            <span class="[&>svg]:w-5" @click="setLocale('ar')">
              العربية
            </span>
          </nuxt-link>

          <!--toggle theme -->
          <tooltip :text="$t('tooltip.toggle_theme')" position="bottom">
            <nuxt-link to="" type="button" class="relative flex text-white rounded-full cursor-pointer"
              @click="$emit('toggle-theme')">
              <span class="absolute -inset-1.5" />
              <span class="sr-only">toggle theme</span>
              <icon :name="isDark ? 'heroicons-solid:sun' : 'heroicons-solid:moon'" class="text-neutral-600" />
            </nuxt-link>
          </tooltip>

          <tooltip :text="$t('tooltip.back_to_home')" position="bottom">
            <nuxt-link to="/" type="button" class="relative hidden text-gray-700 rounded-full sm:flex">
              <span class="absolute -inset-1.5" />
              <span class="sr-only">Back to Home Page</span>
              <icon name="material-symbols:house" />
            </nuxt-link>
          </tooltip>

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
  localeStore.updateLocale(value);
  locale.value = value;
  updatePageTitle();
};

watch(() => localeStore.locale, (newLocale) => {
  locale.value = newLocale;
  updatePageTitle();
});

const updatePageTitle = () => {
  const pageTitle = locale.value === 'ar' ? 'العنوان بالعربية' : 'Title in English'; // Adjust based on current locale
  useHead({
    title: pageTitle,
  });
};

// computed(() => {
//   const storedLocale = localeStore.locale;
//   setLocale(storedLocale);
// });

const authStore = useAuthStore();
const isAuthenticated = computed(() => localStorage.getItem('user'));
// const isAuthenticated = computed(() => authStore.isAuthenticated);
const isAdmin = computed(() => {
  const user = authStore.user;
  return user?.email === 'admin@ship.com';
});

onMounted(() => {
  updatePageTitle()
});

//toggle themes
defineProps({
  isDark: Boolean,
});
</script>