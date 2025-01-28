<template>
  <div>
    <div class="flex flex-col h-screen">
      <!-- Chat Messages -->
      <div class="flex-1 p-8 space-y-4 overflow-y-auto">
        <!-- Sent Message -->
        <div class="flex items-start space-s-3" v-for="(message, index) in contactStore.messages" :key="index">
          <img :src="userProfileImg" alt="profile-img" class="rounded-full w-14 h-14" />
          <div class="p-3 bg-gray-200 rounded-lg">
            <p class="text-sm dark:text-gray-800">{{ message.message }}</p>
          </div>
        </div>

        <!-- Received Message -->
        <div class="flex items-end justify-end space-s-3">
          <div class="p-3 text-white bg-blue-500 rounded-lg dark:bg-blue-300 dark:text-gray-800">
            <p class="text-sm">I have a question about my order.</p>
          </div>
          <img src="https://justfields.com/storage/projects/7M5rV059/vector-avatar-02.jpg" alt="Avatar"
            class="rounded-full w-14 h-14" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const contactStore = useContactStore()
const authStore = useAuthStore()

const userProfileImg = ref('');

onMounted(() => {
  contactStore.fetchMessages()
  if (authStore.user?.profileImg) {
    userProfileImg.value = authStore.user?.profileImg;
  }
  // console.log('profile img:', userProfileImg.value)
});
</script>