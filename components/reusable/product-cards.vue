<template>
  <div>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-7">
      <div class="p-2 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-black" v-for="product in productStore.products"
        :key="product.id">
        <div class="w-full h-56">
          <nuxt-link to="">
            <img class="object-cover w-full h-full mx-auto" :src="product.imageUrl1" />
          </nuxt-link>
        </div>
        <div class="pt-6">
          <div class="flex items-center justify-between gap-4 mb-4">
            <span class="me-2 rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800">
              Up to {{ product.discount }}% off</span>
            <div class="flex items-center justify-end gap-1">
              <nuxt-link :to="`/products/${product.id}`" type="button" data-twe-toggle="tooltip"
                data-twe-placement="top" title="Quick Look"
                class="p-2 text-gray-500 rounded-lg hover:text-gray-900 dark:text-gray-100 dark:hover:text-gray-300">
                <span class="sr-only">Quick look</span>
                <icon name="material-symbols:visibility-outline-rounded" class="w-6 h-6" aria-hidden="true" />
              </nuxt-link>

              <button @click="toggleWishlist(product)"
                class="p-2 text-gray-500 rounded-lg hover:text-gray-900 dark:text-gray-100 dark:hover:text-gray-300" data-twe-toggle="tooltip"
                data-twe-placement="top" title="Add to wishlist">
                <icon :name="wishlistIcon(product)" size="20px" :class="wishlistIconClass(product)"
                  class="p-1 rounded-full" />
              </button>
            </div>
          </div>

          <nuxt-link to="" class="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-gray-200">
            {{ product.title }}</nuxt-link>
          <div class="flex items-center gap-2 mt-2">
            <div class="flex items-center">
              <!-- ratings component -->
              <ratings />
            </div>
            <p class="text-sm font-medium text-gray-900 dark:text-gray-200">5.0</p>
            <p class="text-sm font-medium text-gray-500 dark:text-gray-100">(455)</p>
          </div>

          <ul class="flex items-center gap-4 mt-2">
            <li class="flex items-center gap-2">
              <icon name="material-symbols:delivery-truck-speed" class="w-4 h-4 text-gray-500 dark:text-gray-100" aria-hidden="true" />
              <p class="text-sm font-medium text-gray-500 dark:text-gray-100">Fast Delivery</p>
            </li>

            <li class="flex items-center gap-2">
              <icon name="bi:cash-stack" class="w-4 h-4 text-gray-500 dark:text-gray-100" aria-hidden="true" />
              <p class="text-sm font-medium text-gray-500 dark:text-gray-100">Best Price</p>
            </li>
          </ul>

          <div class="flex items-center gap-2 mt-4">
            <p class="text-2xl font-extrabold leading-tight text-gray-800 dark:text-gray-200">{{ product.discountedPrice }} egp</p>
            <p class="mt-2 font-semibold leading-tight text-gray-400 line-through text-md dark:text-gray-100" v-if="product.originalPrice">
              {{
                product.originalPrice }} egp</p>
          </div>
        </div>
        <div class="mt-4">
          <button type="button" class="flex items-center justify-center w-full px-5 py-2.5 btn-style"
            @click="handleAddToCart(product)">
            <icon name="material-symbols:add-shopping-cart" class="w-5 h-5 -ms-2 me-2" aria-hidden="true" />
            <div class="flex items-center justify-center" v-if="loading[product.id]">
              <span class="text-center">{{ $t('btn.adding_to_cart') }}...</span>
              <icon name="svg-spinners:270-ring-with-bg" class="w-5 h-5" />
            </div>
            <span v-else>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>

    <!-- dynamic-toast component -->
    <div class="fixed z-50 pointer-events-none bottom-5 start-5 w-96">
      <div class="pointer-events-auto">
        <dynamic-toast v-if="showToast" :title="toastTitle" :message="toastMessage" :toastType="toastType"
          :duration="5000" :toastIcon="toastIcon" @toastClosed="showToast = false" />
      </div>
    </div>
  </div>
</template>

<script setup>
const productStore = useProductsStore()
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();
const route = useRoute();
const brandName = ref("");
const loading = ref({});
const errorMessage = ref("");
const itemAdded = ref('')
const { showToast, toastTitle, toastMessage, toastType, toastIcon, triggerToast } = useToast();
const { t } = useI18n()

onMounted(() => {
  brandName.value = route.query.brand;
  if (brandName.value) {
    productStore.fetchProductsByBrand(brandName.value);
  } else {
    productStore.fetchProducts();
  }
})

const quantity = ref(1)

const handleAddToCart = async (product) => {
  if (!product) return;
  const authStore = useAuthStore();
  if (!authStore.isAuthenticated) {
    triggerToast({
      title: t('toast.ah_ah'),
      message: t('toast.please_log_in_first_to_add_to_cart'),
      type: 'warning',
      icon: 'material-symbols:warning-outline-rounded'
    });
    return;
  }
  try {
    loading.value[product.id] = true;
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await cartStore.addToCart(
      product.id,
      product.title,
      product.discountedPrice,
      product.originalPrice || null,
      product.imageUrl1,
      product.brand,
      product.discount || null,
      quantity.value,
    );
    triggerToast({
      title: t('toast.great'),
      message: t('toast.item_added_to_your_cart'),
      type: 'success',
      icon: 'clarity:shopping-cart-line'
    });
  } catch (error) {
    triggerToast({
      title: t('toast.error'),
      message: t('toast.failed_to_add_to_cart'),
      type: 'error',
      icon: 'material-symbols:error-outline-rounded'
    });
  } finally {
    loading.value[product.id] = false;
  }
};

const toggleWishlist = async (product) => {
  if (!product) return;
  const authStore = useAuthStore();
  if (!authStore.isAuthenticated) {
    triggerToast({ title: t('toast.ah_ah'), message: t('toast.please_log_in_first_to_add_to_wishlist'), type: 'warning', icon: 'material-symbols:warning-outline-rounded' });
    return;
  }
  const userId = authStore.user?.uid;
  if (!userId) {
    // console.error('User ID is not available');
    return;
  }
  if (wishlistStore.isInWishlist(product.id)) {
    errorMessage.value = "Product already added to the wishlist.";
    setTimeout(() => (errorMessage.value = ""), 3000);
  } else {
    try {
      await wishlistStore.addToWishlist(
        product.id,
        product.title,
        product.discountedPrice,
        product.originalPrice || null,
        product.brand,
        product.imageUrl1,
        userId
      );
      itemAdded.value = "Product added to wishlist!";
      setTimeout(() => (itemAdded.value = ""), 3000);
      triggerToast({ title: t('toast.great'), message: t('toast.item_added_to_your_wishlist'), type: 'success', icon: 'clarity:heart-line' });
    } catch (error) {
      if (error.message === "Product already added to the wishlist.") {
        errorMessage.value = error.message;
        setTimeout(() => (errorMessage.value = ""), 3000);
      } else {
        console.error("Error adding to wishlist:", error);
      }
    }
  }
};

const wishlistIcon = (product) => {
  return wishlistStore.isInWishlist(product.id) ? 'clarity:heart-solid' : 'clarity:heart-line';
};

const wishlistIconClass = (product) => {
  return wishlistStore.isInWishlist(product.id) ? 'text-red-600' : '';
};

onMounted(async () => {
  const { Tooltip, Ripple, initTWE } = await import("tw-elements");
  initTWE({ Tooltip, Ripple });
});
</script>