<template>
  <div>
    <div class="flex flex-col gap-2 sm:flex-row">
      <div class="flex-1">
        <h1 class="text-3xl font-semibold">Addresses</h1>
        <p class="mt-2 text-sm text-gray-500">Add, edit, and remove addresses</p>
      </div>
    </div>
    <div class="flex items-center flex-1 h-full" v-if="!showForm">
      <div class="flex-1 w-full mt-12 text-center">
        <icon name="ic:sharp-map" class="w-12 h-12 mx-auto text-gray-400" />
        <h3 class="mt-2 text-sm font-medium text-gray-900">Your Addresses Book looks empty</h3>
        <p class="mt-1 text-sm text-gray-500">What are you waiting for?</p>
        <div class="mt-6">
          <nuxt-link to="" type="button"
            class="inline-flex items-center justify-center px-4 py-2 cursor-pointer btn-style"
            @click="showForm = true">Create an Address</nuxt-link>
        </div>
      </div>
    </div>

    <Transition name="fade">
      <div class="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:pb-24 lg:px-8" v-if="showForm">
        <div class="max-w-xl">
          <p class="mt-2 text-base text-gray-500">Add a new address</p>
        </div>
        <div class="p-4 mt-8 bg-white border-b border-gray-200 rounded-md shadow-sm sm:border sm:rounded-lg">
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
                  class="block text-sm font-medium text-gray-700 after:content-['*'] after:mis-0.5 after:text-red-500">City</label>
                <div class="relative mt-1 rounded-md shadow-sm">
                  <select id="city" name="city" v-model="authStore.user.selectedCity"
                    class="block w-full placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none sm:text-sm focus:ring-indigo-500 focus:border-indigo-500"
                    autocomplete="city">
                    <option hidden="" class="hidden" value="" label="-- select a city --"></option>
                    <option v-for=" country in countriesData" :key="country.country" :value="country.country">
                      {{ country.country }}</option>
                  </select>
                </div>
              </div>
            </ClientOnly>
          </div>

          <div class="sm:col-span-2">
            <button class="flex items-center justify-center w-full px-4 py-2 mt-6 btn-style" type="submit"
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
    </Transition>

    <!-- dynamic-toast component -->
    <div class="fixed z-50 pointer-events-none bottom-5 start-5 w-96">
      <div class="pointer-events-auto">
        <dynamic-toast v-if="showToast" :title="toastTitle" :message="toastMessage" :toastType="toastType"
          :duration="5000" :toastIcon="toastIcon" @toastClosed="showToast = false" />
      </div>
    </div>
  </div>
</template>

<script setup>
import dataBase from "@/assets/countries.json";

const countriesData = ref(dataBase);
const showForm = ref(false);

const authStore = useAuthStore();
const { t } = useI18n()
const loading = ref(false);
const { showToast, toastTitle, toastMessage, toastType, toastIcon, triggerToast } = useToast();

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
        title: t('toast.successfully_updated'),
        message: t('toast.your_address_has_been_successfully_updated'),
        type: 'success',
        icon: 'mdi-check-circle',
      });
    })
    .catch((error) => {
      triggerToast({
        title: t('toast.error'),
        message: t('toast.failed_to_update_address'),
        type: 'error',
        icon: 'material-symbols:error-outline-rounded',
      });
    })
    .finally(() => {
      loading.value = false;
    });
};

// const saveProfile = async () => {
//   loading.value = true;
//   try {
//     const message = await authStore.saveProfile();
//     triggerToast({
//       title: t('toast.successfully_updated'),
//       message: t('toast.your_address_has_been_successfully_updated'),
//       type: 'success',
//       icon: 'mdi-check-circle',
//     });
//   } catch (error) {
//     triggerToast({
//       title: t('toast.error'),
//       message: t('toast.failed_to_update_address'),
//       type: 'error',
//       icon: 'material-symbols:error-outline-rounded',
//     });
//   } finally {
//     loading.value = false;
//   }
// };
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