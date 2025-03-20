<template>
  <div>
    <div class="mt-4">
      <!-- breadcrumb component -->
      <breadcrumb />
    </div>

    <div class="mb-10">
      <div class="max-w-5xl mx-auto mt-6 overflow-hidden rounded-lg shadow-md dark:border dark:border-gray-100">
        <div class="p-4">
          <p>{{ $t('profile.edit_your_profile') }}</p>
          <div class="grid grid-cols-1 mt-2 gap-x-6 sm:grid-cols-6">
            <ClientOnly>
              <div class="sm:col-span-3" v-if="authStore.user">
                <dynamic-inputs :label="t('form.first_name')" :placeholder="t('form.enter_your_first_name')" type="text"
                  name="first_name" :rules="'required|alpha_spaces'" :required="true"
                  prefixIcon="material-symbols:person" v-model="authStore.user.firstName" />
              </div>

              <div class="sm:col-span-3" v-if="authStore.user">
                <dynamic-inputs :label="t('form.last_name')" :placeholder="t('form.enter_your_last_name')" type="text"
                  name="last name" :rules="'required|alpha_spaces'" :required="true"
                  prefixIcon="material-symbols:person" v-model="authStore.user.lastName" />
              </div>

              <div class="sm:col-span-3" v-if="authStore.user">
                <dynamic-inputs :label="t('form.email')" :placeholder="t('form.enter_your_email')" type="email"
                  name="email" :rules="'required|email'" :required="true" prefixIcon="material-symbols:alternate-email"
                  v-model="authStore.user.email" />
              </div>

              <div class="sm:col-span-3" v-if="authStore.user">
                <dynamic-inputs :label="t('form.phone_number')" :placeholder="t('form.enter_phone_number')" type="tel"
                  name="phone number" prefixIcon="material-symbols:call" v-model="authStore.user.phone" />
              </div>

              <div class="sm:col-span-3" v-if="authStore.user">
                <span class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-100">{{ $t('form.birth_date')
                  }}</span>
                <!-- date-picker componenet -->
                <date-picker v-model="authStore.user.birthDate" />
              </div>
            </ClientOnly>

            <div class="mt-5 sm:col-span-full" v-if="authStore.user">
              <div
                class="flex items-center justify-center h-48 p-4 bg-gray-200 border rounded-md shadow-md dark:bg-gray-100 w-96">
                <label for="upload" class="flex flex-col items-center gap-2 cursor-pointer">
                  <template v-if="imagePreview">
                    <img :src="imagePreview" alt="Profile Preview" class="object-cover w-full h-48 rounded-xl" />
                  </template>
                  <template v-else>
                    <icon name="tdesign:user-avatar" class="w-10 h-10 text-gray-500 stroke-indigo-500" />
                    <span class="font-medium text-gray-600">{{ $t('form.upload_file') }}</span>
                  </template>
                </label>
                <input id="upload" type="file" class="hidden" @change="onFileSelected" />
              </div>
            </div>
          </div>

          <div class="flex items-center justify-end mt-4 gap-x-6">
            <button type="submit" class="px-4 py-2 btn-style" @click="saveProfile">
              <div class="flex items-center justify-center" v-if="loading">
                <span class="text-center me-2">{{ $t('btn.saving') }}</span>
                <icon name="svg-spinners:270-ring-with-bg" />
              </div>
              <span v-else>{{ $t('btn.save') }}</span>
            </button>
          </div>
        </div>
      </div>

      <div class="max-w-5xl mx-auto mt-6 overflow-hidden rounded-lg shadow-md dark:border dark:border-gray-100">
        <div class="p-4">
          <p>{{ $t('profile.change_your_password') }}</p>
          <div class="grid grid-cols-1 mt-2 gap-x-6 sm:grid-cols-6">
            <ClientOnly>
              <div class="sm:col-span-3" v-if="authStore.user">
                <dynamic-inputs :label="t('form.password')" :placeholder="t('form.enter_your_password')" type="password"
                  name="password" :rules="'minLength:7'" prefixIcon="ri:lock-password-fill" v-model="currentPassword" />
              </div>

              <div class="sm:col-span-3" v-if="authStore.user">
                <dynamic-inputs :label="t('form.new_password')" :placeholder="t('form.enter_your_new_password')"
                  type="password" name="password" :rules="'required'" prefixIcon="ri:lock-password-fill"
                  v-model="newPassword" />
              </div>

              <div class="sm:col-span-3" v-if="authStore.user">
                <dynamic-inputs :label="t('form.confirm_password')" :placeholder="t('form.confirm_your_password')"
                  type="password" name="confirmation" :rules="'required|confirmed:password'"
                  prefixIcon="ri:lock-password-fill" v-model="confirmNewPassword" />
              </div>
            </ClientOnly>
          </div>
          <div class="flex items-center justify-end mt-4 gap-x-6">
            <button type="submit" class="px-4 py-2 btn-style" @click="changePassword">
              <div class="flex items-center justify-center" v-if="loadingTwo">
                <span class="text-center me-2">{{ $t('btn.updating') }}</span>
                <icon name="svg-spinners:270-ring-with-bg" />
              </div>
              <span v-else>{{ $t('btn.update') }}</span>
            </button>
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
const authStore = useAuthStore();
const currentPassword = ref("");
const newPassword = ref("");
const confirmNewPassword = ref("");
const { t } = useI18n()
const loading = ref(false);
const loadingTwo = ref(false);
const { showToast, toastMessage, toastType, toastIcon, triggerToast } = useToast();

onMounted(() => {
  if (authStore.user) {
    authStore.fetchUserData(authStore.user.uid);
  } else {
    authStore.init();
  }
});

const selectedFile = ref(null);
const imagePreview = ref(null);

const onFileSelected = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
    imagePreview.value = URL.createObjectURL(file);
  }
};

const saveProfile = () => {
  loading.value = true;
  authStore
    .saveProfile(selectedFile.value)
    .then((message) => {
      triggerToast({
        message: t('toast.successfully_updated'),
        type: 'success',
        icon: 'mdi-check-circle',
      });
    })
    .catch((error) => {
      triggerToast({
        message: t('toast.failed_to_update_profile'),
        type: 'error',
        icon: 'material-symbols:error-outline-rounded',
      });
    })
    .finally(() => {
      loading.value = false;
    });
};

const changePassword = () => {
  loadingTwo.value = true;
  if (newPassword.value !== confirmNewPassword.value) {
    triggerToast({
      message: t('toast.new_passwords_do_not_match'),
      type: 'error',
      icon: 'material-symbols:error-outline-rounded',
    });
    loadingTwo.value = false;
    return;
  }
  authStore
    .changePassword(currentPassword.value, newPassword.value)
    .then((message) => {
      triggerToast({
        message: t('toast.your_password_has_been_successfully_updated'),
        type: 'success',
        icon: 'mdi-check-circle',
      });
    })
    .catch((error) => {
      triggerToast({
        message: t('toast.failed_to_update_password'),
        type: 'error',
        icon: 'material-symbols:error-outline-rounded',
      });
    })
    .finally(() => {
      loadingTwo.value = false;
    });
};

useHead({
  titleTemplate: () => t("head.profile"),
});
</script>