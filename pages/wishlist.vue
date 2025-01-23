<template>
  <div>
    <div class="px-5 py-10">
      <div class="mb-6">
        <!-- breadcrumb component -->
        <breadcrumb />
      </div>

      <h2 class="mb-8 text-3xl font-semibold text-center">Your Wishlist</h2>
      <!-- Check if wishlist is empty -->
      <div v-if="wishlistStore.wishlist.length === 0" class="text-center text-gray-500">
        <p>Your wishlist is empty. <nuxt-link to="/products" class="text-blue-500">Start adding products!</nuxt-link>
        </p>
      </div>

      <!-- Wishlist Items -->
      <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div v-for="item in wishlistStore.wishlist" :key="item.id"
          class="overflow-hidden bg-white rounded-lg shadow-lg">
          <img :src="item.imageUrl1" class="object-cover w-full h-48">
          <div class="p-4">
            <h3 class="text-lg font-semibold truncate">{{ item.title }}</h3>
            <p class="mt-1 text-gray-500">Brand: {{ item.brand }}</p>
            <div class="flex items-center mt-2 space-s-2">
              <p class="mt-1 text-xl font-bold text-gray-900">{{ item.discountedPrice }} egp</p>
              <p class="mt-2 text-sm text-gray-400 line-through">{{ item.originalPrice }} egp</p>
            </div>

            <div class="flex mt-2 space-s-5">
              <!-- Remove Button -->
              <button type="button" :title="$t('tooltip.delete_item')" @click="removeItem(item.docId)"
                class="flex items-center justify-center h-10 bg-transparent border rounded-full w-11">
                <icon v-if="removingItem === item.docId" name="svg-spinners:6-dots-rotate" size="20px"
                  class="text-red-500" />
                <icon name="material-symbols:close-rounded" class="inline w-6 text-red-500" v-else />
              </button>
              <!-- add to cart Button -->
              <button type="button" @click="moveToCart(item)"
                class="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm text-white hover:bg-white hover:text-black hover:border-black border-transparent border w-full capitalize font-semibold">
                <div class="flex items-center justify-center" v-if="loading">
                  <span class="text-center me-2">{{ $t('btn.adding_to_cart') }}...</span>
                  <icon name="svg-spinners:270-ring-with-bg" />
                </div>
                <span v-else class="flex items-center">
                  <icon name="material-symbols:add-shopping-cart" class="me-2" />
                  {{ $t('btn.add_to_cart') }}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- social-media-sharing component -->
      <div v-if="wishlistStore.wishlist.length >= 1">
        <social-media-sharing />
      </div>
    </div>
  </div>
</template>

<script setup>
const wishlistStore = useWishlistStore();
const cartStore = useCartStore();
const { t } = useI18n()

onMounted(() => {
  wishlistStore.fetchWishlist();
  cartStore.fetchCart();
});

const removingItem = ref(null);

const removeItem = async (docId) => {
  removingItem.value = docId;
  await wishlistStore.removeFromWishlist(docId);
  setTimeout(() => {
    removingItem.value = null;
  }, 3000);
};

const loading = ref(false);

const moveToCart = async (item) => {
  loading.value = true;
  setTimeout(async () => {
    const { productId, title, price, imgOne } = item;
    const existingProduct = cartStore.cart.find((product) => product.productId === productId);
    if (existingProduct) {
      const newQuantity = existingProduct.quantity + 1;
      await cartStore.updateQuantityInCart(productId, newQuantity);
    } else {
      await cartStore.addToCart(productId, title, price, price, imgOne, "", "", "0", 1);
    }
    localStorage.setItem('cart', JSON.stringify(cartStore.cart));
    await wishlistStore.removeFromWishlist(item.docId);
    loading.value = false;
  }, 3000);
};

useHead({
  titleTemplate: () => t("head.wishlist"),
});
</script>