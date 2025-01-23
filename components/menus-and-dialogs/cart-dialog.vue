<template>
  <div>
    <nuxt-link to="" role="button" @click="openCartSidebar" class="flex items-center text-white">
      <icon name="material-symbols:shopping-cart" class="me-1" />
      <span class="inline-block bg-red-600 text-white rounded-full px-1 py-0.5 text-xs font-bold"
        v-if="cartStore.cart.length > 0">
        {{ cartStore.cart.length }}
      </span>
    </nuxt-link>

    <div v-if="isSidebarOpen"
      class="fixed inset-0 w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] font-sans">
      <div class="relative w-full h-screen max-w-lg bg-white shadow-lg ms-auto">
        <div class="overflow-auto p-6 h-[calc(100vh-124px)] scroll-hidden">
          <div class="flex items-center gap-4 text-gray-800">
            <h3 class="flex-1 text-2xl font-bold">Shopping cart</h3>
            <button @click="closeCartSidebar">
              <icon name="material-symbols:close-rounded"
                class="w-4 h-4 cursor-pointer ms-2 shrink-0 fill-black hover:fill-red-500" />
            </button>
          </div>

          <div class="p-4 space-y-4" v-if="cartStore.cart.length === 0">
            <p class="text-base text-center text-gray-800">{{ $t('cart.your_cart_is_currently_empty') }}</p>
            <nuxt-link to="/products" @click="closeCartSidebar" type="button"
              class="block text-sm font-medium text-center text-blue-500">
              <span class="flex justify-center text-sm">{{ $t('cart.continue_shopping') }}
                <icon name="material-symbols:arrow-right-alt-rounded" class="rtl:rotate-180 ms-1" />
              </span>
            </nuxt-link>
          </div>

          <div class="mt-12 space-y-4" v-else>
            <div class="grid items-start grid-cols-3 gap-4" v-for="item in cartStore.cart" :key="item.id">
              <div class="flex items-start col-span-2 gap-4 border-b">
                <div class="p-2 bg-gray-100 rounded-md w-28 h-28 max-sm:w-24 max-sm:h-24 shrink-0">
                  <img :src="item.imageUrl1" class="object-contain w-full h-full" />
                </div>

                <div class="flex flex-col">
                  <h3 class="text-base font-bold text-gray-800 max-sm:text-sm">{{ item.title }}</h3>
                  <p class="text-xs font-semibold text-gray-500 mt-0.5">Brand: {{ item.brand }}</p>
                  <p class="text-xs font-semibold text-gray-500 mt-0.5">Quantity: {{ item.quantity }}</p>

                  <button type="button" @click.stop="removeItem(item.docId, item.quantity)"
                    class="flex items-center gap-1 mt-6 text-xs font-semibold text-red-500 shrink-0">
                    <icon v-if="removingItem === item.docId" name="svg-spinners:6-dots-rotate"
                      class="inline w-4 fill-curren" />
                    <icon name="material-symbols:delete-outline-rounded" class="inline w-4 fill-current" v-else />
                    Remove
                  </button>
                </div>
              </div>

              <div class="ms-auto">
                <h4 class="text-base font-bold text-gray-800 max-sm:text-sm">{{ item.discountedPrice }} egp</h4>
                <div class="flex items-center gap-3 mt-10">
                  <button type="button" @click.stop="decrementQuantity(item)"
                    class="flex items-center justify-center w-5 h-5 bg-gray-400 rounded-full outline-none">
                    <icon name="ic:round-minus" class="w-4 text-white fill-white" />
                  </button>
                  <span class="font-bold text-sm leading-[18px]">{{ item.quantity }}</span>
                  <button type="button" @click.stop="incrementQuantity(item)"
                    class="flex items-center justify-center w-5 h-5 bg-gray-800 rounded-full outline-none">
                    <icon name="material-symbols:add" class="w-4 text-white fill-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="absolute bottom-0 w-full p-4 bg-white border-t" v-if="cartStore.cart.length > 0">
          <ul class="text-gray-800 divide-y">
            <li class="flex flex-wrap gap-4 text-lg font-bold">Subtotal <span class="ms-auto">{{ totalAmount }}
                egp</span>
            </li>
          </ul>
          <div class="space-y-3">
            <nuxt-link to="/checkout" type="button" @click="closeCartSidebar"
              class="flex items-center justify-center w-full px-5 py-2 mt-6 text-sm font-medium text-white transition duration-300 border rounded-md bg-rose-500">Proceed
              to Checkout</nuxt-link>
            <nuxt-link to="/shopping-cart" type="button" @click="closeCartSidebar"
              class="block w-full px-5 py-2 text-center btn-style">
              {{ $t('btn.view_cart') }}
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const cartStore = useCartStore();
const removingItem = ref(null);

const removeItem = async (docId, quantityToRemove) => {
  if (!docId) {
    console.error("No docId provided for removal.");
    return;
  }
  try {
    removingItem.value = docId;
    await cartStore.removeFromCart(docId, quantityToRemove);
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
  cartStore.fetchCart();
  saveCartToLocalStorage();
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

const isSidebarOpen = ref(false);

const openCartSidebar = () => {
  isSidebarOpen.value = true;
};

const closeCartSidebar = () => {
  isSidebarOpen.value = false;
};

onMounted(async () => {
  const { Tooltip, Ripple, initTWE } = await import("tw-elements");
  initTWE({ Tooltip, Ripple });
});
</script>

<style scoped>
.scroll-hidden {
  overflow-y: scroll;
}

.scroll-hidden::-webkit-scrollbar {
  display: none;
}

.scroll-hidden {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>