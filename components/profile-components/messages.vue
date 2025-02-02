<template>
  <div>
    <div class="flex flex-col h-screen">
      <!-- Chat Messages -->
      <div class="flex-1 p-8 space-y-4 overflow-y-auto">
        <div v-if="loading" class="flex items-center justify-center text-gray-500">
          <icon name="svg-spinners:bars-scale" class="w-16 h-16 text-gray-500 dark:text-gray-100" />
        </div>

        <div v-else-if="userMessages.length === 0"
          class="text-lg font-semibold text-center text-gray-500 dark:text-gray-100">
          No messages found
        </div>

        <div class="space-y-4" v-for="msg in userMessages" :key="msg.id" v-else>
          <!-- Sent Message -->
          <div class="flex items-start space-s-3">
            <img :src="userProfileImg" alt="profile-img" class="rounded-full w-14 h-14" />
            <div class="p-3 bg-gray-200 rounded-lg">
              <p class="text-sm dark:text-gray-800">{{ msg.message }}</p>
              <small class="font-semibold text-gray-500" v-if="msg.date">{{ msg.date }}</small>
            </div>
          </div>

          <!-- Received Message -->
          <div class="flex items-end justify-end space-s-3">
            <div class="p-3 text-white bg-blue-400 rounded-lg dark:bg-blue-300 dark:text-gray-800">
              <p class="text-sm" v-if="msg.reply">{{ msg.reply }}</p>
              <small class="font-semibold text-gray-100" v-if="msg.repliedAt">{{ formatDate(msg.repliedAt) }}</small>
            </div>
            <img src="https://justfields.com/storage/projects/7M5rV059/vector-avatar-02.jpg" alt="Avatar"
              class="rounded-full w-14 h-14" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const contactStore = useContactStore()
const authStore = useAuthStore()
const userProfileImg = ref('');
const currentUserUid = ref(null)
const loading = ref(true);

onMounted(() => {
  if (authStore.user?.profileImg) {
    userProfileImg.value = authStore.user?.profileImg;
  }
  // console.log('profile img:', userProfileImg.value)
  try {
    setTimeout(async () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        currentUserUid.value = user?.uid;
      }
      await contactStore.fetchMessages();
      loading.value = false;
    }, 3000);
  } catch (error) {
    console.error('Error loading data:', error);
    loading.value = false;
  }
});

const userMessages = computed(() => {
  return contactStore.messages.filter(msg =>
    msg.uid === currentUserUid.value
  );
});

watchEffect(() => {
  if (contactStore.messages.length > 0) {
    // console.log("Reactive messages:", JSON.parse(JSON.stringify(contactStore.messages)));
  }
});

const formatDate = (timestamp) => {
  if (!timestamp?.seconds) return '';
  return new Date(timestamp.seconds * 1000).toLocaleDateString();
};
</script>