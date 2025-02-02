<template>
    <div>
        <section class="py-8 antialiased bg-white dark:bg-[#181a1b] md:py-16">
            <div class="max-w-screen-xl px-4 mx-auto 2xl:px-0">
                <div class="mb-6">
                    <!-- breadcrumb component -->
                    <breadcrumb />
                </div>

                <h2 class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-gray-200">Shopping Cart</h2>
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
                                                item.discountedPrice }} egp
                                            </p>
                                        </div>
                                    </div>

                                    <div class="flex-1 w-full min-w-0 space-y-4 md:order-2 md:max-w-md">
                                        <nuxt-link to=""
                                            class="text-base font-medium text-gray-900 dark:text-gray-200 hover:underline">
                                            {{ item.title }}</nuxt-link>
                                        <p>Quantity: <span class="font-semibold text-blue-700 dark:text-blue-400">{{
                                            item.quantity
                                                }}</span></p>

                                        <div class="flex items-center gap-4">
                                            <button type="button"
                                                class="inline-flex items-center text-sm font-medium text-gray-500 dark:text-gray-200 hover:text-gray-900 hover:underline">
                                                <icon name="heroicons-outline:heart" class="me-1.5 h-5 w-5" />
                                                Add to Favorites
                                            </button>

                                            <button type="button" @click.stop="removeItem(item.docId)"
                                                class="inline-flex items-center text-sm font-medium text-red-600 dark:text-red-400 hover:underline">
                                                <icon v-if="removingItem === item.docId"
                                                    name="svg-spinners:6-dots-rotate" class="me-1.5 h-5 w-5" />
                                                <icon name="heroicons-outline:x-mark" class="me-1.5 h-5 w-5" v-else />
                                                Remove
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
                            <p class="text-xl font-semibold text-gray-900 dark:text-gray-200">Order summary</p>
                            <div class="space-y-4">
                                <div class="space-y-2">
                                    <dl class="flex items-center justify-between gap-4">
                                        <dt class="text-base font-normal text-gray-500 dark:text-gray-100">Original
                                            price</dt>
                                        <dd class="text-base font-medium text-gray-900 dark:text-gray-200">{{
                                            totalOriginalPrice
                                        }} egp</dd>
                                    </dl>

                                    <dl class="flex items-center justify-between gap-4">
                                        <dt class="text-base font-normal text-gray-500 dark:text-gray-100">Savings</dt>
                                        <dd class="text-base font-medium text-green-600 dark:text-green-400">-{{
                                            totalSavings }} egp</dd>
                                    </dl>

                                    <dl class="flex items-center justify-between gap-4">
                                        <dt class="text-base font-normal text-gray-500 dark:text-gray-200">Store Pickup
                                        </dt>
                                        <dd class="text-base font-medium text-gray-900 dark:text-gray-200">15.00 egp
                                        </dd>
                                    </dl>

                                    <dl class="flex items-center justify-between gap-4">
                                        <dt class="text-base font-normal text-gray-500 dark:text-gray-100">Tax</dt>
                                        <dd class="text-base font-medium text-gray-900 dark:text-gray-200">12.00 egp
                                        </dd>
                                    </dl>
                                </div>

                                <dl class="flex items-center justify-between gap-4 pt-2 border-t border-gray-200">
                                    <dt class="text-base font-bold text-gray-900 dark:text-gray-200">Total</dt>
                                    <dd class="text-base font-bold text-gray-900 dark:text-gray-200">{{ totalAmount }}
                                        egp</dd>
                                </dl>
                            </div>

                            <nuxt-link to="/checkout"
                                class="flex w-full items-center justify-center px-5 py-2.5 btn-style">Proceed
                                to Checkout</nuxt-link>

                            <div class="flex items-center justify-center gap-2">
                                <span class="text-sm font-normal text-gray-500 dark:text-gray-100"> or </span>
                                <nuxt-link to="" title=""
                                    class="inline-flex items-center gap-2 text-sm font-medium underline text-primary-700 dark:text-primary-400 hover:no-underline">
                                    Continue Shopping
                                    <icon name="heroicons-outline:arrow-right" class="w-5 h-5 rtl:rotate-180" />
                                </nuxt-link>
                            </div>
                        </div>

                        <div
                            class="p-4 space-y-4 bg-white dark:bg-[#181a1b] border border-gray-200 rounded-lg shadow-sm sm:p-6">
                            <form class="space-y-4">
                                <div>
                                    <label for="voucher"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200"> Do you
                                        have a voucher or gift card?</label>
                                    <input type="text" id="voucher"
                                        class="block w-full transition duration-300 bg-transparent border rounded-md shadow-sm pe-16 placeholder:text-slate-400 text-slate-700 dark:text-slate-200 border-slate-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 focus:shadow dark:placeholder:text-slate-200"
                                        placeholder="enter your voucher code here" />
                                </div>
                                <button type="submit"
                                    class="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300">Apply
                                    Code</button>
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
        console.error("No docId provided for removal.");
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

const totalOriginalPrice = computed(() => {
    return cartStore.cart.reduce((total, item) => {
        return total + (parseFloat(item.originalPrice) || 0) * item.quantity;
    }, 0).toFixed(2);
});

const totalSavings = computed(() => {
    return cartStore.cart.reduce((total, item) => {
        return total + (parseFloat(item.originalPrice) - parseFloat(item.discountedPrice)) * item.quantity;
    }, 0).toFixed(2);
});

useHead({
    titleTemplate: () => t("head.shopping_cart"),
});
</script>