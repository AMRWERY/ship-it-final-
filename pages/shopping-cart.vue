<template>
    <div>
        <section class="py-8 antialiased bg-white dark:bg-[#181a1b] md:py-16">
            <div class="max-w-screen-xl px-4 mx-auto 2xl:px-0">
                <div class="mb-6">
                    <!-- breadcrumb component -->
                    <breadcrumb />
                </div>

                <h2 class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-gray-200">{{
                    $t('cart.shopping_cart') }}</h2>
                <div class="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                    <div class="flex-none w-full mx-auto lg:max-w-2xl xl:max-w-4xl">
                        <div class="space-y-6">
                            <div v-for="item in cartStore.cart" :key="item.id"
                                class="p-4 bg-white dark:bg-[#181a1b] border border-gray-200 dark:border-gray-200 rounded-lg shadow-sm md:p-6">
                                <div class="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                    <nuxt-link to="" class="shrink-0 md:order-1">
                                        <img class="w-20 h-20" :src="item.imageUrl1" />
                                    </nuxt-link>

                                    <label for="counter-input" class="sr-only">Choose quantity:</label>
                                    <div class="flex items-center justify-between md:order-3 md:justify-end">
                                        <div class="flex items-center">
                                            <button type="button" id="decrement-button" @click="decrementQuantity(item)"
                                                class="inline-flex items-center justify-center w-5 h-5 bg-gray-100 border border-gray-300 rounded-md shrink-0 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100">
                                                <icon name="heroicons-outline:minus-sm"
                                                    class="h-2.5 w-2.5 text-gray-900" />
                                            </button>
                                            <input type="text" id="counter-input" v-model="quantity"
                                                @change="updateQuantityInStore(item.id, item.quantity)"
                                                class="w-10 text-sm font-medium text-center text-gray-900 bg-transparent border-0 dark:text-gray-200 shrink-0 focus:outline-none focus:ring-0"
                                                placeholder="" />
                                            <button type="button" id="increment-button" @click="incrementQuantity(item)"
                                                class="inline-flex items-center justify-center w-5 h-5 bg-gray-100 border border-gray-300 rounded-md shrink-0 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100">
                                                <icon name="heroicons-outline:plus-sm"
                                                    class="h-2.5 w-2.5 text-gray-900" />
                                            </button>
                                        </div>
                                        <div class="text-end md:order-4 md:w-32">
                                            <p class="text-base font-bold text-gray-900 dark:text-gray-200">{{
                                                $n(parseFloat(item.discountedPrice),
                                                    'currency', currencyLocale) }}
                                            </p>
                                        </div>
                                    </div>

                                    <div class="flex-1 w-full min-w-0 space-y-4 md:order-2 md:max-w-md">
                                        <nuxt-link to=""
                                            class="text-base font-medium text-gray-900 dark:text-gray-200 hover:underline">
                                            {{ $i18n.locale ===
                                                'ar' ? item.titleAr :
                                                item.title }}</nuxt-link>
                                        <p class="text-xs font-semibold text-gray-500 mt-0.5 dark:text-gray-100">{{
                                            $t('cart.brand') }}
                                            {{ $i18n.locale ===
                                                'ar' ? item.brandAr :
                                                item.brand }}</p>
                                        <p>{{ $t('cart.quantity') }} <span
                                                class="font-semibold text-blue-700 dark:text-blue-400">{{
                                                    item.quantity
                                                }}</span></p>

                                        <div class="flex items-center gap-4">
                                            <button type="button" @click.stop="removeItem(item.docId)"
                                                class="inline-flex items-center text-sm font-medium text-red-600 dark:text-red-400 hover:underline">
                                                <icon v-if="removingItem === item.docId"
                                                    name="svg-spinners:6-dots-rotate" class="me-1.5 h-5 w-5" />
                                                <icon name="heroicons-outline:x-mark" class="me-1.5 h-5 w-5" v-else />
                                                {{ $t('btn.remove') }}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex-1 max-w-4xl mx-auto mt-6 space-y-6 lg:mt-0 lg:w-full">
                        <div
                            class="p-4 space-y-4 bg-white dark:bg-[#181a1b] border border-gray-200 rounded-lg shadow-sm sm:p-6">
                            <p class="text-xl font-semibold text-gray-900 dark:text-gray-200">{{
                                $t('cart.order_summary') }}</p>
                            <div class="space-y-4">
                                <div class="space-y-2">
                                    <dl class="flex items-center justify-between gap-4">
                                        <dt class="text-base font-normal text-gray-500 dark:text-gray-100">{{
                                            $t('cart.original_price') }}</dt>
                                        <dd class="text-base font-medium text-gray-900 dark:text-gray-200">{{
                                            $n(parseFloat(totalDsicoutedPrice),
                                                'currency', currencyLocale)
                                        }}</dd>
                                    </dl>

                                    <dl class="flex items-center justify-between gap-4">
                                        <dt class="text-base font-normal text-gray-500 dark:text-gray-100">{{
                                            $t('cart.savings') }}</dt>
                                        <dd class="text-base font-medium text-green-600 dark:text-green-400">-{{
                                            totalSavings }} {{ $t('products.egp') }}</dd>
                                    </dl>

                                    <dl class="flex items-center justify-between gap-4">
                                        <dt class="text-base font-normal text-gray-500 dark:text-gray-200">{{
                                            $t('cart.store_pickup') }}
                                        </dt>
                                        <dd class="text-base font-medium text-gray-900 dark:text-gray-200">{{
                                            $t('products.15_00') }} {{ $t('products.egp') }}
                                        </dd>
                                    </dl>

                                    <dl class="flex items-center justify-between gap-4">
                                        <dt class="text-base font-normal text-gray-500 dark:text-gray-100">{{
                                            $t('cart.tax') }}</dt>
                                        <dd class="text-base font-medium text-gray-900 dark:text-gray-200">{{
                                            $t('products.12_00') }} {{ $t('products.egp') }}
                                        </dd>
                                    </dl>
                                </div>

                                <dl class="flex items-center justify-between gap-4 pt-2 border-t border-gray-400">
                                    <dt class="text-base font-bold text-gray-900 dark:text-gray-200">{{ $t('cart.total')
                                        }}</dt>
                                    <dd class="text-base font-bold text-gray-900 dark:text-gray-200">{{
                                        $n(parseFloat(totalAmount),
                                            'currency', currencyLocale) }}
                                    </dd>
                                </dl>
                            </div>

                            <nuxt-link-locale to="/checkout"
                                class="flex w-full items-center justify-center px-5 py-2.5 btn-style">{{
                                    $t('btn.proceed_to_checkout') }}</nuxt-link-locale>

                            <div class="flex items-center justify-center gap-2">
                                <span class="text-sm font-normal text-gray-500 dark:text-gray-100"> {{ $t('cart.or') }}
                                </span>
                                <nuxt-link-locale to="/products"
                                    class="inline-flex items-center gap-2 text-sm font-medium underline text-primary-700 dark:text-primary-400 hover:no-underline">
                                    {{ $t('cart.continue_shopping') }}
                                    <icon name="heroicons-outline:arrow-right" class="w-5 h-5 rtl:rotate-180" />
                                </nuxt-link-locale>
                            </div>
                        </div>

                        <div
                            class="p-4 space-y-4 bg-white dark:bg-[#181a1b] border border-gray-200 rounded-lg shadow-sm sm:p-6">
                            <form class="space-y-4">
                                <div>
                                    <label for="voucher"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">{{
                                            $t('cart.do_you_have_a_voucher_or_gift_card') }}</label>
                                    <input type="text" id="voucher"
                                        class="block w-full transition duration-300 bg-transparent border rounded-md shadow-sm pe-16 placeholder:text-slate-400 text-slate-700 dark:text-slate-200 border-slate-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 focus:shadow dark:placeholder:text-slate-200"
                                        :placeholder="t('form.enter_your_voucher_code_here')" />
                                </div>
                                <button type="submit"
                                    class="flex w-full items-center justify-center px-5 py-2.5 btn-style">{{
                                    $t('btn.apply_code') }}</button>
                            </form>
                        </div>
                    </div>
                </div>

                <!-- social-media-sharing component -->
                <div v-if="cartStore.cart.length >= 1">
                    <social-media-sharing />
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
const cartStore = useCartStore();
const removingItem = ref(null);
const { t } = useI18n()
const loading = ref(false)

const removeItem = async (docId) => {
    if (!docId) {
        return;
    }
    try {
        removingItem.value = docId;
        await cartStore.removeFromCart(docId);
        setTimeout(() => {
            removingItem.value = null;
        }, 3000);
    } catch (error) {
        console.error("Error removing item:", error);
    }
};

const saveCartToLocalStorage = () => {
    localStorage.setItem('cart', JSON.stringify(cartStore.cart));
};

onMounted(() => {
    loading.value = true;
    setTimeout(() => {
        cartStore.fetchCart();
        saveCartToLocalStorage();
        loading.value = false;
    }, 3000);
});

const totalAmount = computed(() => {
    const itemsTotal = cartStore.cart.reduce((total, item) => {
        const discountedPrice = parseFloat(item.discountedPrice) || 0;
        const quantity = item.quantity || 1;
        return total + (discountedPrice * quantity);
    }, 0);
    const storePickup = 15;
    const tax = 12;
    return (itemsTotal + storePickup + tax).toFixed(2);
});

const quantity = ref(1);

const incrementQuantity = (item) => {
    item.quantity++;
    updateQuantityInStore(item.productId, item.quantity);
    saveCartToLocalStorage();
};

const decrementQuantity = (item) => {
    if (item.quantity > 1) {
        item.quantity--;
        updateQuantityInStore(item.productId, item.quantity);
        saveCartToLocalStorage();
    }
};

const updateQuantityInStore = (productId, newQuantity) => {
    if (productId) {
        cartStore.updateQuantityInCart(productId, newQuantity);
    }
};

const totalDsicoutedPrice = computed(() => {
    return cartStore.cart.reduce((total, item) => {
        return total + (parseFloat(item.discountedPrice) || 0) * item.quantity;
    }, 0).toFixed(2);
});

const totalSavings = computed(() => {
    return cartStore.cart.reduce((total, item) => {
        const original = parseFloat(item.originalPrice) || 0;
        const discounted = parseFloat(item.discountedPrice) || 0;
        return total + (original - discounted) * (item.quantity || 1);
    }, 0).toFixed(2);
});

//currency composable
const { currencyLocale } = useCurrencyLocale();

useHead({
    titleTemplate: () => t("head.shopping_cart"),
});
</script>