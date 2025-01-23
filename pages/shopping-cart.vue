<template>
    <div>
        <section class="py-8 antialiased bg-white md:py-16">
            <div class="max-w-screen-xl px-4 mx-auto 2xl:px-0">

                <div class="mb-6">
                    <!-- breadcrumb component -->
                    <breadcrumb />
                </div>

                <h2 class="text-xl font-semibold text-gray-900 sm:text-2xl">Shopping Cart</h2>
                <div class="p-4 space-y-4" v-if="cartStore.cart.length === 0">
                    <p class="text-[13px] text-center text-gray-800">{{ $t('cart.your_cart_is_currently_empty') }}</p>
                    <nuxt-link to="/products" type="button"
                        class="block text-sm font-medium text-center text-blue-500 ">
                        <span class="flex justify-center text-sm">{{ $t('cart.continue_shopping') }}
                            <icon name="material-symbols:arrow-right-alt-rounded" class="rtl:rotate-180 ms-1" />
                        </span>
                    </nuxt-link>
                </div>

                <div class="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                    <div class="flex-none w-full mx-auto lg:max-w-2xl xl:max-w-4xl">
                        <div class="space-y-6">
                            <div v-for="item in cartStore.cart" :key="item.id"
                                class="p-4 bg-white border border-gray-200 rounded-lg shadow-sm md:p-6">
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
                                                class="w-10 text-sm font-medium text-center text-gray-900 bg-transparent border-0 shrink-0 focus:outline-none focus:ring-0"
                                                placeholder="" />
                                            <button type="button" id="increment-button" @click="incrementQuantity(item)"
                                                class="inline-flex items-center justify-center w-5 h-5 bg-gray-100 border border-gray-300 rounded-md shrink-0 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100">
                                                <icon name="heroicons-outline:plus-sm"
                                                    class="h-2.5 w-2.5 text-gray-900" />
                                            </button>
                                        </div>
                                        <div class="text-end md:order-4 md:w-32">
                                            <p class="text-base font-bold text-gray-900">{{ item.discountedPrice }} egp
                                            </p>
                                        </div>
                                    </div>

                                    <div class="flex-1 w-full min-w-0 space-y-4 md:order-2 md:max-w-md">
                                        <nuxt-link to="" class="text-base font-medium text-gray-900 hover:underline">
                                            {{ item.title }}</nuxt-link>
                                        <p>Quantity: <span class="font-semibold text-blue-700">{{ item.quantity
                                                }}</span></p>

                                        <div class="flex items-center gap-4">
                                            <button type="button"
                                                class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline">
                                                <icon name="heroicons-outline:heart" class="me-1.5 h-5 w-5" />
                                                Add to Favorites
                                            </button>

                                            <button type="button" @click.stop="removeItem(item.docId)"
                                                class="inline-flex items-center text-sm font-medium text-red-600 hover:underline">
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
                        <div class="p-4 space-y-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6">

                            <p class="text-xl font-semibold text-gray-900">Order summary</p>
                            <div class="space-y-4">
                                <div class="space-y-2">
                                    <dl class="flex items-center justify-between gap-4">
                                        <dt class="text-base font-normal text-gray-500">Original
                                            price</dt>
                                        <dd class="text-base font-medium text-gray-900">{{ totalOriginalPrice
                                            }} egp</dd>
                                    </dl>

                                    <dl class="flex items-center justify-between gap-4">
                                        <dt class="text-base font-normal text-gray-500">Savings</dt>
                                        <dd class="text-base font-medium text-green-600">-{{ totalSavings }} egp</dd>
                                    </dl>

                                    <dl class="flex items-center justify-between gap-4">
                                        <dt class="text-base font-normal text-gray-500">Store Pickup
                                        </dt>
                                        <dd class="text-base font-medium text-gray-900">15.00 egp</dd>
                                    </dl>

                                    <dl class="flex items-center justify-between gap-4">
                                        <dt class="text-base font-normal text-gray-500">Tax</dt>
                                        <dd class="text-base font-medium text-gray-900">12.00 egp</dd>
                                    </dl>
                                </div>

                                <dl class="flex items-center justify-between gap-4 pt-2 border-t border-gray-200">
                                    <dt class="text-base font-bold text-gray-900">Total</dt>
                                    <dd class="text-base font-bold text-gray-900">{{ totalAmount }} egp</dd>
                                </dl>
                            </div>

                            <nuxt-link to="/checkout"
                                class="flex w-full items-center justify-center px-5 py-2.5 btn-style">Proceed
                                to Checkout</nuxt-link>

                            <div class="flex items-center justify-center gap-2">
                                <span class="text-sm font-normal text-gray-500"> or </span>
                                <nuxt-link to="" title=""
                                    class="inline-flex items-center gap-2 text-sm font-medium underline text-primary-700 hover:no-underline">
                                    Continue Shopping
                                    <icon name="heroicons-outline:arrow-right" class="w-5 h-5" />
                                </nuxt-link>
                            </div>
                        </div>

                        <div class="p-4 space-y-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6">
                            <form class="space-y-4">
                                <div>
                                    <label for="voucher" class="block mb-2 text-sm font-medium text-gray-900"> Do you
                                        have a voucher or gift card? </label>
                                    <input type="text" id="voucher"
                                        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                                        placeholder="" required />
                                </div>
                                <button type="submit"
                                    class="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300">Apply
                                    Code</button>
                            </form>
                        </div>
                    </div>
                </div>

                <!-- social-media-sharing component -->
                <social-media-sharing />
            </div>
        </section>
    </div>
</template>

<script setup>
const cartStore = useCartStore();
const removingItem = ref(null);
const { t } = useI18n()

const removeItem = (docId) => {
    if (!docId) {
        // console.error("No docId provided for removal.");
        return;
    }
    removingItem.value = docId;
    cartStore.removeFromCart(docId)
        .then(() => {
            setTimeout(() => {
                removingItem.value = null;
            }, 3000);
        })
        .catch((error) => {
            console.error("Error removing item:", error);
        });
};

// const removeItem = async (docId) => {
//     if (!docId) {
//         console.error("No docId provided for removal.");
//         return;
//     }
//     try {
//         removingItem.value = docId;
//         await cartStore.removeFromCart(docId);
//         setTimeout(() => {
//             removingItem.value = null;
//         }, 3000);
//     } catch (error) {
//         console.error("Error removing item:", error);
//     }
// };

const saveCartTolocalStorage = () => {
    localStorage.setItem('cart', JSON.stringify(cartStore.cart));
};

onMounted(() => {
    cartStore.fetchCart();
    saveCartTolocalStorage();
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
    saveCartTolocalStorage();
};

const decrementQuantity = (item) => {
    if (item.quantity > 1) {
        item.quantity--;
        updateQuantityInStore(item.productId, item.quantity);
        saveCartTolocalStorage();
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