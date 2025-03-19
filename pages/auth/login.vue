<template>
  <div>
    <!-- overlay component -->
    <overlay :visible="authStore.isOverlayVisible" />

    <div class="flex flex-col items-center justify-center min-h-screen px-4 py-6">
      <div class="grid items-center w-full max-w-6xl gap-10 md:grid-cols-2 max-md:max-w-md">
        <div class="w-full h-full">
          <div class="relative w-full h-64 sm:h-96 lg:h-full">
            <img src="https://justfields.com/storage/projects/7M5rV059/slider01.jpg" alt="img"
              class="absolute inset-0 object-cover w-full h-full sm:max-w-md md:max-w-full" />
          </div>
        </div>

        <div class="w-full max-w-full py-6 border border-gray-100 rounded-lg shadow-lg md:me-auto">
          <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img class="w-auto h-16 mx-auto" src="@/public/shopping-bags.svg" />
            <h2 class="mt-5 text-2xl font-bold leading-9 tracking-tight text-center text-gray-800 dark:text-gray-200">
              {{ $t('form.sign_in_to_your_account') }}</h2>
          </div>

          <div class="w-full max-w-full px-4 mx-auto">
            <div class="grid my-6 space-y-4">
              <button @click="googleLogin"
                class="h-12 px-6 transition duration-300 border-2 border-gray-300 rounded-full group hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
                <div class="relative flex items-center justify-center space-s-4">
                  <icon name="logos:google-icon" class="absolute w-12 start-0" />
                  <span
                    class="block text-sm font-semibold tracking-wide text-gray-700 transition duration-300 w-max group-hover:text-blue-600 sm:text-base dark:text-gray-200 dark:group-hover:text-blue-300">{{
                      $t('btn.continue_with_google') }}</span>
                </div>
              </button>
            </div>

            <div class="relative my-6">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-6 text-gray-500 bg-white dark:bg-gray-800 dark:text-gray-200">{{
                  $t('form.or_continue_with') }}</span>
              </div>
            </div>

            <ClientOnly>
              <dynamic-inputs :label="t('form.email')" :placeholder="t('form.enter_your_email')" type="email"
                name="email" :rules="'required|email'" :required="true" prefixIcon="material-symbols:alternate-email"
                v-model="email" />

              <dynamic-inputs :label="t('form.password')" :placeholder="t('form.enter_your_password')" type="password"
                name="password" :rules="'required|minLength:7'" :required="true" prefixIcon="ri:lock-password-fill"
                v-model="password" />
            </ClientOnly>

            <div>
              <button type="submit" :disabled="loading" @click="handleLogin" class="block w-full px-5 py-2 btn-style">
                <div class="flex items-center justify-center" v-if="loading">
                  <span class="text-center me-2">{{ $t('btn.logging') }}...</span>
                  <icon name="svg-spinners:270-ring-with-bg" />
                </div>
                <span v-else>{{ $t('btn.login') }}</span>
              </button>
            </div>

            <div v-if="errorMessage" class="mt-2 font-medium text-center text-red-600 dark:text-red-500">
              {{ errorMessage }}
            </div>
          </div>

          <div class="text-center">
            <p class="text-sm mt-7 text-slate-500">{{ $t('form.do_not_have_an_account') }}
              <nuxt-link to="/auth/sign-up" class="font-medium text-blue-600 ms-1 hover:underline">{{
                $t('form.register_here') }}</nuxt-link>
            </p>
          </div>
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
const authStore = useAuthStore()
const email = ref('');
const password = ref('');
const loading = ref(false);
const { t } = useI18n()
const errorMessage = ref('');
const { showToast, toastMessage, toastType, toastIcon, triggerToast } = useToast();

const handleLogin = async () => {
  if (!email.value || !password.value) {
    errorMessage.value = t('form.all_fields_are_required')
    return
  }
  try {
    await authStore.loginUser(email.value, password.value);
    triggerToast({
      message: t('toast.successfully_login'),
      type: 'success',
      icon: 'mdi-check-circle',
    });
    setTimeout(() => {
      navigateTo('/');
    }, 3000);
  } catch (error) {
    triggerToast({
      message: t('toast.failed_to_login'),
      type: 'error',
      icon: 'material-symbols:error-outline-rounded',
    });
  } finally {
    loading.value = false;
  }
};

const googleLogin = async () => {
  try {
    await authStore.loginWithGoogle();
    setTimeout(() => {
      loginSuccessfully.value = true
    }, 3000);
    setTimeout(() => {
      navigateTo('/');
    }, 3000);
  } catch (error) {
    loginFailed.value = true;
    setTimeout(() => {
      loginFailed.value = false;
    }, 3000);
  }
};

onMounted(() => {
  authStore.init();
});

definePageMeta({
  layout: false
});

useHead({
  titleTemplate: () => t("head.login"),
});
</script>