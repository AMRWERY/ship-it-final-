<!-- BlogsDialog.vue -->
<template>
  <div>
    <div v-if="blog" class="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div class="relative w-full max-w-3xl max-h-[90vh] overflow-auto bg-white dark:bg-[#181a1b] rounded-lg shadow-lg">
        <div class="p-6">
          <div class="relative group">
            <button 
              @click="$emit('close')" 
              class="absolute top-2 end-2 z-10 p-1.5 transition-colors rounded-full bg-white/80 hover:bg-white/90 text-gray-700 hover:text-red-500 dark:bg-gray-700/80 dark:hover:bg-gray-600/90 dark:text-gray-200"
            >
              <icon name="material-symbols:close-small-rounded" class="flex items-center w-7 h-7" />
            </button>
            
            <img 
              :src="blog.img" 
              :alt="blog.title" 
              class="object-cover w-full h-64 mb-4 rounded-lg shadow-md dark:shadow-gray-900"
            >
          </div>

          <div class="flex items-center mb-4 text-sm text-gray-500 dark:text-gray-300">
            <span class="me-4">{{ blog.date }}</span>
          </div>
          
          <h2 class="mb-4 text-2xl font-bold text-gray-800 dark:text-gray-200">{{ blog.title }}</h2>
          
          <p class="mb-3 text-lg text-gray-600 dark:text-gray-300">{{ blog.desc }}</p>

          <!-- <div class="space-y-4 text-gray-700 dark:text-gray-300">
            <p v-for="(paragraph, index) in blog.content" :key="index" class="leading-relaxed">
              {{ paragraph }}
            </p>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  blog: {
    type: Object,
    default: null
  }
})

defineEmits(['close'])
</script>