<template>
  <div>
    <div class="flex justify-center mt-6">
      <nav class="inline-flex">
        <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1"
          class="px-4 py-2 mx-1 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          {{ $t('pagination.previous') }}
        </button>
        <button v-for="page in visiblePages" :key="page" @click="goToPage(page)" :class="{
          'bg-blue-500 text-gray-700 border-blue-500': page === currentPage,
          'text-gray-600 border-gray-300': page !== currentPage
        }"
          class="px-4 py-2 mx-1 text-sm font-medium bg-white border rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          {{ page }}
        </button>
        <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages"
          class="px-4 py-2 mx-1 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          {{ $t('pagination.next') }}
        </button>
      </nav>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['page-changed'])

const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, props.currentPage - 2)
  const end = Math.min(props.totalPages, props.currentPage + 2)
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

const goToPage = (page) => {
  if (page >= 1 && page <= props.totalPages) {
    emit('page-changed', page)
  }
}
</script>