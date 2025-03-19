<template>
  <div>
    <div class="mb-6">
      <!-- breadcrumb component -->
      <breadcrumb />
    </div>

    <div class="flex flex-col gap-2 px-4 mx-auto max-w-7xl sm:flex-row">
      <div class="flex-1">
        <h1 class="text-3xl font-semibold">Addresses</h1>
        <p class="mt-2 text-sm text-gray-500 dark:text-gray-100">Add, edit, and remove addresses</p>
      </div>
    </div>

    <div class="px-4 pt-6 pb-16 mx-auto max-w-7xl sm:px-6 lg:pb-24 lg:px-8">
      <div class="max-w-xl">
        <p class="mt-2 text-base text-gray-500 dark:text-gray-100">Add a new address</p>
      </div>
      <div class="p-4 mt-4 border-b border-gray-200 rounded-md shadow-sm sm:border sm:rounded-lg">
        <!-- <form class="space-y-6"> -->
        <div class="grid grid-cols-1 mt-10 gap-x-6 sm:grid-cols-6">
          <ClientOnly>
            <div class="sm:col-span-3" v-if="authStore.user">
              <dynamic-inputs :label="t('form.first_name')" :placeholder="t('form.enter_your_first_name')" type="text"
                name="first name" prefixIcon="material-symbols:person" v-model="authStore.user.firstName" />
            </div>

            <div class="sm:col-span-3" v-if="authStore.user">
              <dynamic-inputs :label="t('form.last_name')" :placeholder="t('form.enter_your_last_name')" type="text"
                name="last name" prefixIcon="material-symbols:person" v-model="authStore.user.lastName" />
            </div>

            <div class="sm:col-span-full" v-if="authStore.user">
              <dynamic-inputs :label="t('form.address')" :placeholder="t('form.enter_your_address')" type="text"
                name="your address" prefixIcon="material-symbols:location-on" v-model="authStore.user.address" />
            </div>

            <div class="sm:col-span-3" v-if="authStore.user">
              <dynamic-inputs :label="t('form.apartment')" :placeholder="t('form.enter_your_apartment')" type="text"
                name="apartment" prefixIcon="material-symbols:home" v-model="authStore.user.apartment" />
            </div>

            <div class="mt-0 lg:mt-5 sm:col-span-3" v-if="authStore.user">
              <label for="city"
                class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-100 after:content-['*'] after:mis-1 after:text-red-500 dark:after:text-red-300">City</label>
              <div class="relative mt-1 rounded-md shadow-sm">
                <select id="city" name="city" autocomplete="city" v-model="authStore.user.selectedCity"
                  class="w-full px-3 py-2 transition duration-300 bg-transparent border rounded-md shadow-sm pe-16 placeholder:text-slate-400 text-slate-700 dark:text-slate-200 border-slate-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 focus:shadow dark:placeholder:text-slate-200 ps-9">
                  <option v-for="country in countriesData" :key="country.country" :value="country.country"
                    class="bg-white dark:bg-[#181a1b] text-slate-700 dark:text-slate-200">
                    {{ country.country }}</option>
                </select>
              </div>
            </div>
          </ClientOnly>
        </div>

        <div class="sm:col-span-2">
          <button type="submit" class="flex items-center justify-center w-full px-4 py-2 mt-6 btn-style"
            @click="saveProfile">
            <div class="flex items-center justify-center" v-if="loading">
              <span class="text-center me-2">{{ $t('btn.adding') }}</span>
              <icon name="svg-spinners:270-ring-with-bg" />
            </div>
            <span v-else>Add a new address</span>
          </button>
        </div>
      </div>
    </div>

    <!-- dynamic-toast component -->
    <div class="fixed z-50 pointer-events-none bottom-5 start-5 w-96">
      <div class="pointer-events-auto">
        <dynamic-toast v-if="showToast" :message="toastMessage" :toastType="toastType" :duration="5000"
          :toastIcon="toastIcon" @toastClosed="showToast = false" />
      </div>
    </div>
  </div>
</template>

<script setup>
import dataBase from "@/assets/countries.json";

const countriesData = ref(dataBase);
const authStore = useAuthStore();
const { t } = useI18n()
const loading = ref(false);
const { showToast, toastMessage, toastType, toastIcon, triggerToast } = useToast();

onMounted(() => {
  if (authStore.user) {
    authStore.fetchUserData(authStore.user.uid);
  } else {
    authStore.init();
  }
});

const saveProfile = () => {
  loading.value = true;
  authStore
    .saveProfile()
    .then((message) => {
      triggerToast({
        message: t('toast.your_address_has_been_successfully_updated'),
        type: 'success',
        icon: 'mdi-check-circle',
      });
    })
    .catch((error) => {
      triggerToast({
        message: t('toast.failed_to_update_address'),
        type: 'error',
        icon: 'material-symbols:error-outline-rounded',
      });
    })
    .finally(() => {
      loading.value = false;
    });
};

useHead({
  titleTemplate: () => t("head.addresses"),
});
</script>

<style scoped>
select {
  scrollbar-width: none;
}

select::-webkit-scrollbar {
  display: none;
}
</style>