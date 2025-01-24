<template>
  <div>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50" v-if="showDialog">
      <div
        class="flex flex-col w-full max-w-xl p-5 bg-white rounded-lg shadow-lg custom-scroll h-[600px] overflow-y-auto">
        <div class="relative">
          <div class="relative">
            <img src="https://justfields.com/storage/projects/7M5rV059/chat-logo.jpg"
              class="object-cover w-full mb-4 rounded-lg h-96" />
            <button @click="closeModal" class="absolute text-gray-700 rounded-full top-2 end-2 hover:text-gray-900">
              <icon name="material-symbols:close-small" class="w-8 h-8" />
            </button>
          </div>

          <div class="max-w-sm mx-auto mt-8 text-center">
            <p class="text-2xl font-semibold text-gray-800">
              {{ $t('mail.join_our_mailing_list') }}
            </p>
            <div class="w-12 h-0.5 mx-auto my-2 bg-red-500"></div>
            <p class="mt-5 text-xs font-semibold">{{
              $t('mail.get_the_latest_updates_on_new_products_and_upcoming_sales') }}</p>
            <span class="text-xs text-gray-800">{{ $t('mail.we_promise_to_only_send_you_good_things') }}</span>
          </div>
          <div class="w-full max-w-sm min-w-[200px] mx-auto mt-4 mb-8">
            <div class="relative">
              <input type="email" v-model="email"
                class="w-full py-3 text-sm transition duration-300 bg-transparent border rounded-md shadow-sm ps-3 pe-16 placeholder:text-slate-400 text-slate-700 border-slate-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 focus:shadow"
                placeholder="Your Email Address" />
              <button @click="subscribe"
                class="absolute end-1 top-1 rounded bg-black py-2 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="submit">
                <div class="flex items-center justify-center" v-if="loading">
                  <span class="text-center me-2">{{ $t('btn.please_wait') }}</span>
                  <icon name="svg-spinners:270-ring-with-bg" />
                </div>
                <span v-else>{{ $t('btn.subscribe') }}</span>
              </button>
            </div>

            <div v-if="subscribeFailed" class="mt-2">
              <p class="font-normal text-center text-red-800">Please enter a valid email address</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const mailStore = useMailStore();
const email = ref('');
const showDialog = ref(false);
const loading = ref(false);
const subscribeFailed = ref(false)

const subscribe = async () => {
  loading.value = true;
  if (email.value) {
    try {
      await mailStore.addEmailToMailList(email.value);
      closeModal();
    } catch (error) {
      console.error("Error subscribing: ", error);
    }
  } else {
    subscribeFailed.value = false
    loading.value = false;
  }
};

const closeModal = () => {
  showDialog.value = false
  localStorage.setItem("hasSeenModal", "true");
};

onMounted(() => {
  const hasSeenModal = JSON.parse(localStorage.getItem("hasSeenModal")) === true;
  if (!hasSeenModal) {
    showDialog.value = true
    localStorage.setItem("hasSeenModal", true);
  }
});
</script>

<style scoped>
.custom-scroll::-webkit-scrollbar {
  display: none;
}

.custom-scroll {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>