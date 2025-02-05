<template>
  <div>
    <div class="relative" ref="target">
      <tooltip :text="$t('tooltip.profile')" position="bottom">
        <nuxt-link class="flex items-center gap-4 text-gray-700 cursor-pointer" to=""
          @click.prevent="dropdownOpen = !dropdownOpen">
          <span class="rounded-full">
            <icon name="material-symbols:person" />
          </span>
        </nuxt-link>
      </tooltip>
      <!-- Dropdown Start -->
      <div v-show="dropdownOpen"
        class="absolute flex flex-col p-3 mt-4 bg-white border rounded-sm w-52 end-0 border-stroke shadow-default">
        <ul class="flex flex-col gap-6 py-7.5">
          <li>
            <nuxt-link to=""
              class="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
              <icon name="material-symbols:person" class="w-[22px] h-[22px] fill-current" />
              My Profile
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to=""
              class="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
              <icon name="fa6-solid:address-card" class="w-[22px] h-[22px] fill-current" />
              My Contacts
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to=""
              class="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
              <icon name="material-symbols:settings-outline" class="w-[22px] h-[22px] fill-current" />
              Account Settings
            </nuxt-link>
          </li>
        </ul>
      </div>
      <!-- Dropdown End -->
    </div>
  </div>
</template>

<script setup>
const target = ref(null)
const dropdownOpen = ref(false)

onClickOutside(target, () => {
  dropdownOpen.value = false
})
</script>