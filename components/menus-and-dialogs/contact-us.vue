<template>
  <div>
    <!-- Button trigger modal -->
    <button type="button" v-if="isAuthenticated && !isAdmin && isEmailInList !== null && isEmailInList"
      class="fixed flex items-center justify-center p-4 text-white transition-all duration-300 rounded-full shadow-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bottom-28 end-8 hover:from-purple-500 hover:via-pink-500 hover:to-yellow-500 focus:ring-4 focus:ring-purple-300 active:scale-90"
      data-twe-toggle="modal" data-twe-target="#contactUsModalVarying">
      <icon name="ic:sharp-wechat" />
    </button>

    <!-- Modal -->
    <div data-twe-modal-init
      class="fixed start-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
      id="contactUsModalVarying" tabindex="-1" aria-labelledby="contactUsModalVaryingLabel" aria-hidden="true">
      <div data-twe-modal-dialog-ref
        class="fixed bottom-6 end-6 pointer-events-none translate-y-[100px] opacity-0 transition-all duration-300 ease-in-out w-[400xpx]">
        <div
          class="relative flex flex-col w-full text-current bg-white border-none rounded-md outline-none pointer-events-auto bg-clip-padding shadow-4">
          <div class="flex items-center justify-between flex-shrink-0 p-4 border-b-2 rounded-t-md border-neutral-100">
            <h5 class="text-xl font-medium leading-normal text-surface" id="contactUsModalLabel">
              New Message
            </h5>
            <button type="button"
              class="box-content border-none rounded-none text-neutral-500 hover:text-neutral-800 hover:no-underline focus:text-neutral-800 focus:opacity-100 focus:shadow-none focus:outline-none"
              data-twe-modal-dismiss aria-label="Close">
              <span class="[&>svg]:h-6 [&>svg]:w-6">
                <icon name="ic:baseline-close" />
              </span>
            </button>
          </div>

          <!-- Modal body -->
          <div class="relative flex-auto p-4" data-twe-modal-body-ref>
            <ClientOnly>
              <dynamic-inputs :label="t('form.name')" :placeholder="t('form.enter_your_name')" type="text"
                name="your name" :rules="'required|alpha_spaces'" :required="true"
                prefixIcon="material-symbols:alternate-email" v-model="data.yourName" />

              <dynamic-inputs :label="t('form.email')" :placeholder="t('form.enter_your_email')" type="email"
                name="email" :rules="'required|email'" :required="true" prefixIcon="material-symbols:alternate-email"
                v-model="data.email" />

              <dynamic-inputs :label="t('form.your_message')" :placeholder="t('form.enter_your_message')"
                type="textarea" name="your message" :rules="'required|between:10,500'" :required="true"
                prefixIcon="material-symbols:person" v-model="data.message" />

              <div class="mt-6">
                <button type="submit" class="w-[400px] px-4 py-2 btn-style" @click="sendMessage">
                  <div class="flex items-center justify-center" v-if="loading">
                    <span class="text-center me-2">{{ $t('btn.sending') }}...</span>
                    <icon name="svg-spinners:270-ring-with-bg" />
                  </div>
                  <span v-else>{{ $t('btn.send_your_message') }}</span>
                </button>
              </div>
            </ClientOnly>

            <div v-if="messageSent" class="w-full mt-2">
              <p class="font-normal text-center text-green-800">{{ $t('toast.your_message_sent_successfully') }}</p>
            </div>
            <div v-else-if="messageAttempted && !messageSent" class="w-full mt-2">
              <p class="font-normal text-center text-red-800">{{ $t('toast.failed_to_send_message') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const authStore = useAuthStore();
const contactStore = useContactStore();
const mailStore = useMailStore();
const { t } = useI18n()

const isAuthenticated = computed(() => localStorage.getItem('user'));

const isAdmin = computed(() => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user?.role === 'admin';
});

const loading = ref(false);
const messageSent = ref(false);
const messageAttempted = ref(false);

const data = ref({
  yourName: '',
  email: '',
  message: ''
});

const sendMessage = () => {
  loading.value = true;
  messageSent.value = false;
  messageAttempted.value = false;
  contactStore
    .submitForm(data.value)
    .then(() => {
      messageSent.value = true;
      setTimeout(() => {
        messageSent.value = false;
      }, 3000);
      // resetForm();
    })
    .catch((error) => {
      messageAttempted.value = true;
      setTimeout(() => {
        messageAttempted.value = false;
      }, 3000);
      // console.error("Error sending message:", error);
    })
    .finally(() => {
      loading.value = false;
    });
};

// const resetForm = () => {
//   data.value = {
//     yourName: '',
//     email: '',
//     message: ''
//   };
// };

const isEmailInList = ref(null);

onMounted(() => {
  const email = localStorage.getItem('user');
  // const email = authStore.user?.email;
  if (email) {
    isEmailInList.value = mailStore.checkEmailInMailList(email);
    // console.log(email)
  } else {
    isEmailInList.value = false;
  }

  mailStore.fetchAllEmails()
});

onMounted(async () => {
  const { Modal, initTWE } = await import("tw-elements");
  initTWE({ Modal });
});
</script>