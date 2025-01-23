<template>
  <div>
    <li class="relative" ref="target">
      <nuxt-link
        class="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray text-gray-700 cursor-pointer"
        to="" @click.prevent="(dropdownOpen = !dropdownOpen), (notifying = false)">
        <span :class="!notifying && 'hidden'" class="absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-meta-1">
          <span class="absolute inline-flex w-full h-full rounded-full opacity-75 -z-1 animate-ping bg-meta-1"></span>
        </span>
        <icon name="material-symbols:notifications-unread" class="w-[18px] h-[18px]" />
      </nuxt-link>

      <!-- Dropdown Start -->
      <div v-show="dropdownOpen"
        class="absolute -right-27 mt-2.5 flex h-90 w-75 flex-col rounded-sm border border-stroke bg-white shadow-default sm:right-0 sm:w-80">
        <div class="px-4.5 py-3">
          <h5 class="text-sm font-medium">Notification</h5>
        </div>

        <ul class="flex flex-col h-auto overflow-y-auto">
          <template v-for="(item, index) in notificationItems" :key="index">
            <li>
              <nuxt-link
                class="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2"
                to="">
                <p class="text-sm">
                  <span class="text-black">{{ item.title }}</span>
                  {{ item.details }}
                </p>

                <p class="text-xs">{{ item.time }}</p>
              </nuxt-link>
            </li>
          </template>
        </ul>
      </div>
      <!-- Dropdown End -->
    </li>
  </div>
</template>

<script setup>
import { onClickOutside } from '@vueuse/core'

const target = ref(null)
const dropdownOpen = ref(false)
const notifying = ref(true)

onClickOutside(target, () => {
  dropdownOpen.value = false
})

const notificationItems = ref([
  {
    route: '#',
    title: 'Edit your information in a swipe',
    details:
      'Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.',
    time: '12 May, 2025'
  },
  {
    route: '#',
    title: 'It is a long established fact',
    details: 'that a reader will be distracted by the readable.',
    time: '24 Feb, 2025'
  },
  {
    route: '#',
    title: 'There are many variations',
    details: 'of passages of Lorem Ipsum available, but the majority have suffered',
    time: '04 Jan, 2025'
  },
  {
    route: '#',
    title: 'There are many variations',
    details: 'of passages of Lorem Ipsum available, but the majority have suffered',
    time: '01 Dec, 2024'
  }
])
</script>