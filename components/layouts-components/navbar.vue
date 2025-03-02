<template>
    <div>
        <!-- Overlay Component -->
        <Overlay :visible="localeStore.isOverlayVisible" />

        <!-- today-deal component -->
        <today-deal />

        <nav class="py-3.5 bg-black border-gray-200">
            <div class="flex items-center justify-between mx-auto px-7">
                <nuxt-link to="/" class="flex items-center">
                    <span class="text-2xl text-white me-3 head">Ship-IT</span>
                </nuxt-link>

                <!-- categories-menu component -->
                <categories-menu class="me-auto" />

                <div class="flex items-center lg:order-2">
                    <div class="hidden mt-2 me-4 sm:inline-block">
                        <span></span>
                    </div>

                    <div class="flex items-center space-s-4">
                        <!-- toggle locales -->
                        <nuxt-link to="" class="font-semibold text-white me-4" role="button" v-if="localeStore.isRTL">
                            <span class="[&>svg]:w-5" @click="setLocale('en')">
                                En
                            </span>
                        </nuxt-link>
                        <nuxt-link to="" class="font-semibold text-white me-4" role="button" v-else>
                            <span class="[&>svg]:w-5" @click="setLocale('ar')">
                                العربية
                            </span>
                        </nuxt-link>

                        <!-- login dialog -->
                        <login v-if="!isAuthenticated" />

                        <nuxt-link to="/sign-up" class="text-sm text-white capitalize hover:text-gray-200"
                            v-if="!isAuthenticated">{{ $t('layout.create_account') }}</nuxt-link>
                    </div>

                    <div class="flex items-center space-s-1">
                        <!-- profile -->
                        <tooltip :text="$t('tooltip.profile')" position="bottom">
                            <nuxt-link to="/profile" type="button" class="relative flex text-white rounded-full"
                                v-if="isAuthenticated">
                                <span class="absolute -inset-1.5" />
                                <span class="sr-only">View Profile</span>
                                <img :src="userProfileImg" alt="profile-img" class="rounded-full h-7 w-7 me-2"
                                    v-if="userProfileImg">
                                <img src="https://justfields.com/storage/projects/7M5rV059/vector-avatar-02.jpg"
                                    alt="profile-img" class="rounded-full h-7 w-7 me-2" v-else>
                            </nuxt-link>
                        </tooltip>

                        <!-- cart-dialog component -->
                        <cart-dialog v-if="isAuthenticated" />

                        <!--wishlist -->
                        <tooltip :text="$t('tooltip.your_wishlist')" position="bottom">
                            <nuxt-link to="/wishlist" type="button" class="relative flex text-white rounded-full"
                                v-if="isAuthenticated">
                                <span class="absolute -inset-1.5" />
                                <span class="sr-only">View wishlist</span>
                                <icon name="heroicons-solid:heart" class="ms-2" />
                                <span v-if="wishlistStore.wishlist.length > 0"
                                    class="absolute top-0 end-0 w-2.5 h-2.5 bg-red-600 rounded-full"></span>
                            </nuxt-link>
                        </tooltip>

                        <!--toggle theme -->
                        <tooltip :text="$t('tooltip.toggle_theme')" position="bottom">
                            <nuxt-link to="" type="button" class="relative flex text-white rounded-full cursor-pointer"
                                @click="$emit('toggle-theme')">
                                <span class="absolute -inset-1.5" />
                                <span class="sr-only">toggle theme</span>
                                <icon :name="isDark ? 'heroicons-solid:sun' : 'heroicons-solid:moon'" class="ms-2" />
                            </nuxt-link>
                        </tooltip>
                    </div>

                    <!-- admin dashboard - display for admin only -->
                    <div class="flex items-center space-s-4">
                        <!--logout -->
                        <tooltip :text="$t('tooltip.logout')" position="bottom">
                            <nuxt-link to="/" type="button" class="relative flex text-white rounded-full cursor-pointer"
                                @click="logout" v-if="isAuthenticated">
                                <span class="absolute -inset-1.5" />
                                <span class="sr-only">Logout</span>
                                <icon name="mynaui:logout" class="ms-2" />
                            </nuxt-link>
                        </tooltip>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<script setup>
const wishlistStore = useWishlistStore();
const authStore = useAuthStore();
const localeStore = useLocaleStore();

const { locale } = useI18n();

const setLocale = (value) => {
    locale.value = value;
    localeStore.updateLocale(value);
};

computed(() => {
    const storedLocale = localeStore.locale;
    setLocale(storedLocale);
});

const userProfileImg = computed(() => authStore.user?.profileImg || '')

onMounted(() => {
    if (authStore.user?.profileImg) {
        userProfileImg.value = authStore.user?.profileImg;
        // console.log('img', userProfileImg.value)
    }
});

const isAuthenticated = computed(() => authStore.isAuthenticated);

const logout = async () => {
    try {
        await authStore.logoutUser();
    } catch (err) {
        console.error('Error during logout:', err);
    }
};

//toggle themes
defineProps({
    isDark: Boolean,
});
</script>