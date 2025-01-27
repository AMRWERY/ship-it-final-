<template>
  <div>
    <button type="button" class="text-sm text-white capitalize mb-0.5" data-twe-toggle="modal"
      data-twe-target="#loginModal">
      Sign in
    </button>

    <!-- Modal -->
    <div data-twe-modal-init
      class="fixed inset-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none" id="loginModal"
      tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
      <div data-twe-modal-dialog-ref
        class="fixed bottom-6 end-6 pointer-events-none translate-y-[100px] opacity-0 transition-all duration-300 ease-in-out w-[500px]">
        <div
          class="relative flex flex-col w-full text-current bg-white dark:bg-[#181a1b] border-none rounded-md outline-none pointer-events-auto bg-clip-padding shadow-4">
          <!-- Modal body -->
          <div class="relative flex-auto p-4" data-twe-modal-body-ref>
            <div class="space-y-4">
              <p class="text-2xl font-semibold text-center">Sign in to your account</p>
            </div>

            <div class="grid mt-6 space-y-4">
              <button @click="googleLogin"
                class="h-12 px-6 transition duration-300 border-2 border-gray-300 rounded-full group hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
                <div class="relative flex items-center justify-center space-x-4">
                  <icon name="logos:google-icon" class="absolute w-12 start-0" />
                  <span
                    class="block text-sm font-semibold tracking-wide text-gray-700 transition duration-300 w-max group-hover:text-blue-600 sm:text-base dark:text-gray-200 dark:group-hover:text-blue-300">Continue
                    with Google</span>
                </div>
              </button>
            </div>

            <div class="mt-5 text-center">
              <p>or <nuxt-link to="/sign-up" class="text-blue-600 dark:text-blue-400">Create free
                  account</nuxt-link>
              </p>
            </div>

            <div class="relative mt-6">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-6 text-gray-500 bg-white dark:bg-gray-800 dark:text-gray-200">or continue with</span>
              </div>
            </div>

            <div class="w-full max-w-xl mx-auto mt-10">
              <div>
                <ClientOnly>
                  <dynamic-inputs :label="t('form.email')" :placeholder="t('form.enter_your_email')" type="email"
                    name="email" :rules="'required|email'" :required="true"
                    prefixIcon="material-symbols:alternate-email" v-model="email" />

                  <dynamic-inputs :label="t('form.password')" :placeholder="t('form.enter_your_password')"
                    type="password" name="password" :rules="'required|minLength:7'" :required="true"
                    prefixIcon="ri:lock-password-fill" v-model="password" />
                </ClientOnly>
              </div>

              <div>
                <button type="submit" :disabled="loading" @click="handleLogin" class="block w-full px-5 py-2 btn-style">
                  <div class="flex items-center justify-center" v-if="loading">
                    <span class="text-center me-2">{{ $t('btn.logging') }}</span>
                    <icon name="svg-spinners:270-ring-with-bg" />
                  </div>
                  <span v-else>{{ $t('btn.login') }}</span>
                </button>
              </div>

              <div v-if="loginSuccessfully" class="w-full mt-2">
                <p class="font-normal text-center text-green-800">{{ $t('toast.successfully_logged_in') }}</p>
              </div>
              <div v-if="loginFailed && !loginSuccessfully" class="mt-2">
                <p class="font-normal text-center text-red-800">{{ $t('toast.failed_to_log_in') }}</p>
              </div>
            </div>
          </div>
        </div>
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
const loginSuccessfully = ref(false)
const loginFailed = ref(false)

const handleLogin = async () => {
  if (!email.value || !password.value) {
    return
  }
  loading.value = true;
  loginSuccessfully.value = false;
  loginFailed.value = false;
  try {
    await authStore.loginUser(email.value, password.value);
    if (authStore.user?.email === 'admin@ship.com') {
      navigateTo('/dashboard');
    } else {
      navigateTo('/');
    }
    loginSuccessfully.value = true;
    setTimeout(() => {
      location.reload();
    }, 1000);
  } catch (error) {
    loginFailed.value = true;
    setTimeout(() => {
      loginFailed.value = false;
    }, 3000);
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

onMounted(async () => {
  authStore.init();
  const { Modal, Ripple, initTWE } = await import("tw-elements");
  initTWE({ Modal, Ripple });
});
</script>