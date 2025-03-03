<template>
    <div>
        <!-- Overlay Component -->
        <overlay :visible="localeStore.isOverlayVisible" />

        <!-- today-deal component -->
        <today-deal />

        <nav class="py-3.5 bg-black border-gray-200">
            <div class="flex items-center justify-between mx-auto px-7">
                <nuxt-link to="/" class="flex items-center">
                    <span class="text-base text-white me-3 head sm:text-lg md:text-2xl">Ship-IT</span>
                </nuxt-link>

                <!-- categories-menu component -->
                <categories-menu class="me-auto" />

                <div class="flex items-center lg:order-2">
                    <div class="hidden mt-2 me-4 sm:inline-block">
                        <span></span>
                    </div>

                    <div class="flex items-center justify-center space-s-3">
                        <!-- toggle locales -->
                        <nuxt-link to="" class="font-semibold text-white" role="button" v-if="localeStore.isRTL">
                            <span class="w-5" @click="setLocale('en')">
                                En
                            </span>
                        </nuxt-link>
                        <nuxt-link to="" class="font-semibold text-white" role="button" v-else>
                            <span class="w-5" @click="setLocale('ar')">
                                العربية
                            </span>
                        </nuxt-link>

                         <!--toggle theme -->
                         <tooltip :text="$t('tooltip.toggle_theme')" position="bottom">
                            <nuxt-link to="" type="button" class="relative flex text-white rounded-full cursor-pointer"
                                @click="$emit('toggle-theme')">
                                <span class="absolute -inset-1.5" />
                                <span class="sr-only">toggle theme</span>
                                <icon :name="isDark ? 'heroicons-solid:sun' : 'heroicons-solid:moon'" class="ms-2" />
                            </nuxt-link>
                        </tooltip>
                        
                        <!-- login dialog -->
                        <login v-if="!isAuthenticated" />

                        <nuxt-link to="/sign-up" class="text-sm text-white capitalize hover:text-gray-200"
                            v-if="!isAuthenticated">{{ $t('layout.create_account') }}</nuxt-link>

                        <!-- profile-menu component -->
                        <profile-menu />

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

const isAuthenticated = computed(() => authStore.isAuthenticated);

//toggle themes
defineProps({
    isDark: Boolean,
});
</script>