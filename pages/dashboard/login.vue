<template>
  <div>
    <div class="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
      <div class="max-w-md mx-auto">
        <img src="@/public/shopping-bags.svg" alt="shopping-bags" class="mx-auto w-36 h-36" />
        <ClientOnly>
          <div class="p-4 space-y-4 rounded-lg shadow-lg sm:p-6 lg:p-8">
            <p class="mb-10 text-2xl font-bold text-center text-black sm:text-3xl">{{
              $t('form.sign_in_to_your_account')
            }}</p>
            <div>
              <dynamic-inputs :label="t('form.email')" :placeholder="t('form.enter_your_email')" type="email"
                name="email" :rules="'required|email'" :required="true" prefixIcon="material-symbols:alternate-email"
                v-model="email" />
            </div>
            <div>
              <dynamic-inputs :label="t('form.password')" :placeholder="t('form.enter_your_password')" type="password"
                name="password" :rules="'required|minLength:7'" :required="true" prefixIcon="ri:lock-password-fill"
                v-model="password" />
            </div>

            <div class="mt-6">
              <button type="submit" :disabled="loading" @click="handleLogin" class="block w-full px-4 py-2 btn-style">
                <div class="flex items-center justify-center" v-if="loading">
                  <span class="text-center me-2">{{ $t('btn.logging') }}...</span>
                  <icon name="svg-spinners:270-ring-with-bg" />
                </div>
                <span v-else>{{ $t('btn.login') }}</span>
              </button>

            </div>
            <div v-if="errorMessage" class="mt-2 text-sm text-center text-red-500">
              {{ errorMessage }}
            </div>
          </div>
        </ClientOnly>
      </div>
    </div>

    <!-- dynamic-toast component  -->
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
const email = ref('');
const password = ref('');
const loading = ref(false);
const errorMessage = ref('');
const { t } = useI18n()
const { showToast, toastTitle, toastMessage, toastType, toastIcon, triggerToast } = useToast();

const handleLogin = async () => {
  loading.value = true;
  try {
    await authStore.loginUser(email.value, password.value);
    if (authStore.user?.email === 'admin@ship.com') {
      navigateTo('/dashboard');
    }
    triggerToast({
      title: t('toast.successfully_signed_up'),
      message: t('toast.login_successfully'),
      type: 'success',
      icon: 'mdi-check-circle',
    });
  } catch (error) {
    triggerToast({
      title: t('toast.error'),
      message: t('toast.failed_to_login'),
      type: 'error',
      icon: 'material-symbols:error-outline-rounded',
    });
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await authStore.init();
});

onMounted(() => {
  const storedLocale = localStorage.getItem('locale') || 'en';
  console.log(storedLocale);
});

definePageMeta({
  layout: "admin",
});

useHead({
  titleTemplate: () => t("head.login"),
});
</script>