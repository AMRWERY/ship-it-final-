<template>
  <div>
    <!-- Overlay component -->
    <Overlay :visible="authStore.isOverlayVisible" />

    <div class="py-6 mx-auto mb-5 max-w-7xl sm:px-6 lg:px-8">
      <!-- breadcrumb component -->
      <breadcrumb />

      <section class="relative flex flex-wrap my-12 lg:h-screen lg:items-center">
        <div class="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
          <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img class="w-auto h-16 mx-auto" src="@/public/shopping-bags.svg" />
            <h2 class="mt-5 text-2xl font-bold leading-9 tracking-tight text-center text-gray-800 dark:text-gray-200">
              Create free
              account</h2>
          </div>

          <div class="w-full max-w-md mx-auto mt-10">
            <div class="grid my-6 space-y-4">
              <button @click="googleSignup"
                class="h-12 px-6 transition duration-300 border-2 border-gray-300 rounded-full group hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
                <div class="relative flex items-center justify-center space-s-4">
                  <icon name="logos:google-icon" class="absolute w-12 start-0" />
                  <span
                    class="block text-sm font-semibold tracking-wide text-gray-700 transition duration-300 w-max group-hover:text-blue-600 sm:text-base dark:text-gray-200 dark:group-hover:text-blue-300">Continue
                    with Google</span>
                </div>
              </button>
            </div>

            <div class="relative my-6">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-6 text-gray-500 bg-white dark:bg-gray-800 dark:text-gray-200">or continue with</span>
              </div>
            </div>

            <ClientOnly>
              <dynamic-inputs :label="t('form.first_name')" :placeholder="t('form.enter_your_first_name')" type="text"
                name="first_name" :rules="'required|alpha_spaces'" :required="true" prefixIcon="material-symbols:person"
                v-model="firstName" />

              <dynamic-inputs :label="t('form.last_name')" :placeholder="t('form.enter_your_last_name')" type="text"
                name="last name" :rules="'required|alpha_spaces'" :required="true" prefixIcon="material-symbols:person"
                v-model="lastName" />

              <dynamic-inputs :label="t('form.email')" :placeholder="t('form.enter_your_email')" type="email"
                name="email" :rules="'required|email'" :required="true" prefixIcon="material-symbols:alternate-email"
                v-model="email" />

              <dynamic-inputs :label="t('form.password')" :placeholder="t('form.enter_your_password')" type="password"
                name="password" :rules="'required|minLength:7'" :required="true" prefixIcon="ri:lock-password-fill"
                v-model="password" />
            </ClientOnly>

            <div>
              <button type="submit" :disabled="loading" @click="handleSignup" class="block w-full px-5 py-2 btn-style">
                <div class="flex items-center justify-center" v-if="loading">
                  <span class="text-center me-2">{{ $t('btn.signing_up') }}...</span>
                  <icon name="svg-spinners:270-ring-with-bg" />
                </div>
                <span v-else>{{ $t('btn.create_an_account') }}</span>
              </button>
            </div>
          </div>

          <div v-if="errorMessage" class="mt-2 text-sm text-red-500">
            {{ errorMessage }}
          </div>
        </div>

        <div class="relative w-full h-64 sm:h-96 lg:h-full lg:w-1/2">
          <img src="https://justfields.com/storage/projects/7M5rV059/slider01.jpg" alt="img"
            class="absolute inset-0 object-cover w-full h-full" />
        </div>
      </section>
    </div>

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
const authStore = useAuthStore()
const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const loading = ref(false);
const errorMessage = ref('');
const { t } = useI18n()
const { showToast, toastTitle, toastMessage, toastType, toastIcon, triggerToast } = useToast();

const handleSignup = async () => {
  if (!email.value || !password.value || !firstName.value || !lastName.value) {
    return
  }
  loading.value = true;
  try {
    await authStore.registerUser(
      email.value,
      password.value,
      firstName.value,
      lastName.value
    );
    triggerToast({
      title: t('toast.successfully_signed_up'),
      message: t('toast.your_account_has_been_successfully_signed_up'),
      type: 'success',
      icon: 'mdi-check-circle',
    });
    setTimeout(() => {
      navigateTo('/');
    }, 3000);
  } catch (error) {
    triggerToast({
      title: t('toast.error'),
      message: t('toast.failed_to_sign_up'),
      type: 'error',
      icon: 'material-symbols:error-outline-rounded',
    });
  } finally {
    loading.value = false;
  }
};

const googleSignup = async () => {
  loading.value = true;
  try {
    await authStore.loginWithGoogle();
    triggerToast({
      title: t('toast.successfully_signed_up'),
      message: t('toast.your_account_has_been_successfully_signed_up'),
      type: 'success',
      icon: 'mdi-check-circle',
    });
    setTimeout(() => {
      navigateTo('/');
    }, 3000);
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
};

useHead({
  titleTemplate: () => t("head.sign_up"),
});
</script>