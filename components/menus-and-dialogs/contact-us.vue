<template>
  <div>
    <!-- Button to open the dialog -->
    <button @click="openDialog" v-if="isAuthenticated && isEmailInList !== null && isEmailInList"
      class="fixed z-50 flex items-center justify-center p-4 text-white transition-all duration-300 rounded-full shadow-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bottom-28 end-8 hover:from-purple-500 hover:via-pink-500 hover:to-yellow-500 focus:ring-4 focus:ring-purple-300 active:scale-90">
      <icon name="ic:sharp-wechat" />
    </button>

    <transition name="slide-fade">
      <div v-if="isDialogOpen"
        class="fixed inset-0 p-4 flex flex-wrap justify-end items-end w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
        <div class="relative w-full max-w-lg p-4 bg-white rounded-lg shadow-lg">
          <div class="flex items-center pb-3 border-b border-gray-300">
            <h3 class="flex-1 text-xl font-medium leading-normal text-surface dark:text-gray-100">{{
              $t('form.new_message') }}</h3>
            <button type="button" @click="closeDialog"
              class="box-content border-none rounded-none text-neutral-500 hover:text-neutral-800 hover:no-underline focus:text-neutral-800 focus:opacity-100 focus:shadow-none focus:outline-none dark:text-gray-100 dark:hover:text-gray-200">
              <span class="w-5 h-5">
                <icon name="ic:baseline-close" />
              </span>
            </button>
          </div>

          <div class="relative flex-auto">
            <ClientOnly>
              <dynamic-inputs :label="t('form.name')" :placeholder="t('form.enter_your_name')" type="text" name="name"
                :rules="'required|alpha_spaces'" :required="true" prefixIcon="material-symbols:alternate-email"
                v-model="data.yourName" />

              <dynamic-inputs :label="t('form.email')" :placeholder="t('form.enter_your_email')" type="email"
                name="email" :rules="'required|email'" :required="true" prefixIcon="material-symbols:alternate-email"
                v-model="data.email" />

              <dynamic-inputs :label="t('form.your_message')" :placeholder="t('form.enter_your_message')"
                type="textarea" :name="t('form.your_message')" :rules="'required|length:100'" :required="true"
                prefixIcon="material-symbols:chat-outline" v-model="data.message" />

              <div class="mt-6">
                <button type="submit" class="block w-full px-4 py-2 btn-style" @click="sendMessage">
                  <div class="flex items-center justify-center" v-if="loading">
                    <span class="text-center me-2">{{ $t('btn.sending') }}...</span>
                    <icon name="svg-spinners:270-ring-with-bg" />
                  </div>
                  <span v-else>{{ $t('btn.send_your_message') }}</span>
                </button>
              </div>
            </ClientOnly>

            <!--toast messages -->
            <div>
              <div v-if="messageSent" class="w-full mt-2">
                <p class="font-normal text-center text-green-800">
                  {{ $t('toast.your_message_sent_successfully') }}
                </p>
              </div>
              <div v-else-if="errorType === 'failed'" class="w-full mt-2">
                <p class="font-normal text-center text-red-800">
                  {{ $t('toast.failed_to_send_message') }}
                </p>
              </div>
              <div v-else-if="errorType === 'incomplete'" class="w-full mt-2">
                <p class="font-normal text-center text-red-800">
                  {{ $t('toast.please_fill_all_required_fields') }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
const contactStore = useContactStore();
const mailStore = useMailStore();
const { t } = useI18n()
const loading = ref(false);
const messageSent = ref(false);
const errorType = ref('');

const isAuthenticated = computed(() => localStorage.getItem('user'));

const data = ref({
  yourName: '',
  email: '',
  message: ''
});

const sendMessage = () => {
  if (!data.value.yourName || !data.value.email || !data.value.message) {
    errorType.value = 'incomplete';
    return;
  }
  errorType.value = '';
  loading.value = true;
  messageSent.value = false;
  contactStore
    .submitForm(data.value)
    .then(() => {
      messageSent.value = true;
      setTimeout(() => {
        messageSent.value = false;
        resetForm();
      }, 3000);
      // resetForm();
    })
    .catch((error) => {
      errorType.value = 'failed';
      setTimeout(() => {
        errorType.value = '';
      }, 3000);
    })
    .finally(() => {
      loading.value = false;
    });
};

const resetForm = () => {
  data.value = {
    yourName: '',
    email: '',
    message: ''
  };
};

const isEmailInList = ref(null);

onMounted(() => {
  const email = localStorage.getItem('user');
  if (email) {
    isEmailInList.value = mailStore.checkEmailInMailList(email);
    // console.log(email)
  } else {
    isEmailInList.value = false;
  }

  mailStore.fetchAllEmails()
});

const isDialogOpen = ref(false);

const openDialog = () => {
  isDialogOpen.value = true;
};

const closeDialog = () => {
  isDialogOpen.value = false;
};
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>