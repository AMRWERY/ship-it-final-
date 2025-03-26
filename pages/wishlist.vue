<template>
  <div>
    <div class="px-5 py-10">
      <div class="mb-6">
        <!-- breadcrumb component -->
        <breadcrumb />
      </div>

      <h2 class="mb-8 text-3xl font-semibold text-center">{{ $t('wishlist.your_wishlist') }}</h2>
      <!-- skeleton loader -->
      <div v-if="loading" class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div v-for="i in 4" :key="i"
          class="overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 animate-pulse">
          <div class="w-full h-48 bg-gray-200 dark:bg-gray-700"></div>
          <div class="p-4">
            <div class="w-3/4 h-5 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            <div class="w-1/2 h-4 mt-3 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            <div class="flex items-center mt-4 space-s-2">
              <div class="w-1/3 h-6 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              <div class="w-1/4 h-4 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
            <div class="flex mt-4 space-s-5">
              <div class="h-10 bg-gray-200 rounded-full w-11 dark:bg-gray-700"></div>
              <div class="w-full h-10 bg-gray-200 rounded-lg dark:bg-gray-700"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Check if wishlist is empty -->
      <div v-else-if="wishlistStore.wishlist.length === 0" class="text-center text-gray-500 dark:text-gray-100">
        <p>{{ $t('wishlist.your_wishlist_is_empty') }} <nuxt-link-locale to="/products"
            class="text-blue-500 dark:text-blue-300">{{ $t('wishlist.Start_adding_products') }}</nuxt-link-locale>
        </p>
      </div>

      <!-- Wishlist Items -->
      <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div v-for="item in wishlistStore.wishlist" :key="item.id"
          class="overflow-hidden bg-white rounded-lg shadow-lg dark:bg-black">
          <img :src="item.imageUrl1" class="object-cover w-full h-48">
          <div class="p-4">
            <h3 class="text-lg font-semibold truncate">{{ $i18n.locale === 'ar' ? item.titleAr :
              item.title }}</h3>
            <p class="mt-1 text-gray-500 dark:text-gray-100">{{ $t('wishlist.brand') }} {{ $i18n.locale === 'ar' ?
              item.brandAr :
              item.brand }}</p>
            <div class="flex items-center mt-2 space-s-2">
              <p class="mt-1 text-xl font-bold text-gray-900 dark:text-gray-200">{{ $n(parseFloat(item.discountedPrice),
                'currency', currencyLocale) }}</p>
              <p class="mt-2 text-sm text-gray-500 line-through dark:text-gray-100" v-if="item.originalPrice">{{
                $n(parseFloat(item.originalPrice), 'currency', currencyLocale) }}</p>
            </div>
            <div class="flex mt-2 space-s-5">
              <!-- Remove Button -->
              <button type="button" :title="$t('tooltip.delete_item')" @click="removeItem(item.docId)"
                class="flex items-center justify-center h-10 bg-transparent border rounded-full w-11">
                <icon v-if="removingItem === item.docId" name="svg-spinners:6-dots-rotate" size="20px"
                  class="text-red-500" />
                <icon name="material-symbols:close-rounded" class="inline w-6 text-red-500 dark:text-red-300" v-else />
              </button>
              <!-- add to cart Button -->
              <button type="button" @click="moveToCart(item)"
                class="flex items-center justify-center w-full px-5 py-2.5 btn-style">
                <div class="flex items-center justify-center" v-if="itemLoading[item.docId]">
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
const { t } = useI18n()
const wishlistStore = useWishlistStore();
const cartStore = useCartStore();
const loading = ref(false)

onMounted(() => {
  loading.value = true;
  setTimeout(() => {
    wishlistStore.fetchWishlist();
    cartStore.fetchCart();;
    loading.value = false;
  }, 3000);
});

const removingItem = ref(null);

const removeItem = async (docId) => {
  removingItem.value = docId;
  setTimeout(async () => {
    await wishlistStore.removeFromWishlist(docId);
    removingItem.value = null;
  }, 3000);
};

const itemLoading = ref({});

const moveToCart = async (item) => {
  itemLoading.value[item.docId] = true;
  setTimeout(async () => {
    const { productId, title, titleAr, discountedPrice, originalPrice, imageUrl1, brand, brandAr, discount = null } = item;
    const existingProduct = cartStore.cart.find((product) => product.productId === productId);
    if (existingProduct) {
      const newQuantity = existingProduct.quantity + 1;
      await cartStore.updateQuantityInCart(productId, newQuantity);
    } else {
      await cartStore.addToCart({
        ...item,
        quantity: 1,
      });
    }
    await wishlistStore.removeFromWishlist(item.docId);
    itemLoading.value[item.docId] = false;
  }, 3000);
};

//currency composable
const { currencyLocale } = useCurrencyLocale();

useHead({
  titleTemplate: () => t("head.wishlist"),
});
</script>