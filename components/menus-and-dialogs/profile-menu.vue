<template>
    <div>
        <div class="flex items-center ms-2">
            <!-- Profile Dropdown -->
            <div class="relative" v-if="isAuthenticated">
                <tooltip :text="$t('tooltip.profile')" position="bottom">
                    <nuxt-link to="" type="button" class="relative flex text-white rounded-full" v-if="isAuthenticated"
                        @click="showDropdown = !showDropdown">
                        <span class="absolute -inset-1.5" />
                        <span class="sr-only">View Profile</span>
                        <img :src="userProfileImg" alt="profile-img" class="rounded-full h-7 w-7" v-if="userProfileImg">
                        <img src="https://justfields.com/storage/projects/7M5rV059/vector-avatar-02.jpg"
                            alt="profile-img" class="rounded-full h-7 w-7" v-else>
                    </nuxt-link>
                </tooltip>

                <!-- Dropdown Menu -->
                <Transition name="fade">
                    <div v-if="showDropdown"
                        class="absolute z-50 w-56 py-1 mt-2 bg-white rounded-md shadow-lg end-0 ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-[#181a1b] text-gray-700 dark:text-gray-100"
                        role="menu">
                        <nuxt-link-locale to="/profile"
                            class="flex items-center px-4 py-2 text-sm space-s-4 hover:bg-gray-100 hover:text-gray-700"
                            role="menuitem" @click="showDropdown = false">
                            <icon name="iconoir:user" class="w-5 h-5 ms-2" />
                            <span>{{ $t('menu.profile') }}</span>
                        </nuxt-link-locale>

                        <nuxt-link-locale to="/messages"
                            class="flex items-center px-4 py-2 text-sm hover:bg-gray-100 space-s-4 hover:text-gray-700"
                            role="menuitem" @click="showDropdown = false">
                            <icon name="tabler:messages" class="w-5 h-5 ms-2" />
                            <span>{{ $t('menu.messages') }}</span>
                        </nuxt-link-locale>

                        <nuxt-link-locale to="/addresses"
                            class="flex items-center px-4 py-2 text-sm hover:bg-gray-100 space-s-4 hover:text-gray-700"
                            role="menuitem" @click="showDropdown = false">
                            <icon name="iconoir:map-pin" class="w-5 h-5 ms-2" />
                            <span>{{ $t('menu.addresses') }}</span>
                        </nuxt-link-locale>

                        <nuxt-link-locale to="/order-tracking"
                            class="flex items-center px-4 py-2 text-sm hover:bg-gray-100 space-s-4 hover:text-gray-700"
                            role="menuitem" @click="showDropdown = false">
                            <icon name="iconoir:numbered-list-left" class="w-5 h-5 ms-2" />
                            <span>{{ $t('menu.order_tracking') }}</span>
                        </nuxt-link-locale>

                        <div class="my-1 border-t"></div>

                        <nuxt-link-locale to="/" type="button"
                            class="flex items-center px-4 py-2 text-sm hover:bg-gray-100 space-s-4 hover:text-gray-700"
                            @click="logout">
                            <icon name="mynaui:logout" class="w-5 h-5 ms-2" />
                            <span>{{ $t('menu.logout') }}</span>
                        </nuxt-link-locale>
                    </div>
                </Transition>
            </div>
        </div>
    </div>
</template>

<script setup>
const authStore = useAuthStore();

const userProfileImg = computed(() => authStore.user?.profileImg || '')

onMounted(() => {
    if (authStore.user?.profileImg) {
        userProfileImg.value = authStore.user?.profileImg;
        // console.log('img', userProfileImg.value)
    }
});

const isAuthenticated = computed(() => authStore.isAuthenticated);

const showDropdown = ref(false)
const dropdownRef = ref(null)

// Close dropdown when clicking outside
onClickOutside(dropdownRef, () => {
    showDropdown.value = false
})

// Close dropdown on escape key
const handleEscape = (e) => {
    if (e.key === 'Escape') showDropdown.value = false
}

onMounted(() => window.addEventListener('keydown', handleEscape))
onBeforeUnmount(() => window.removeEventListener('keydown', handleEscape))


const logout = async () => {
    try {
        await authStore.logoutUser();
    } catch (err) {
        console.error('Error during logout:', err);
    }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>