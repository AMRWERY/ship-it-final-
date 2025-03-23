<template>
  <div>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 mt-7">
      <div class="p-2 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-black"
        v-for="product in productsList" :key="product.id">
        <div class="w-full h-56">
          <nuxt-link to="">
            <img class="object-cover w-full h-full mx-auto" :src="product.imageUrl1" />
          </nuxt-link>
        </div>
        <div class="pt-6">
          <div class="flex items-center justify-between gap-4 mb-4">
            <span class="me-2 rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800"
              v-if="product.discount">
              {{ $t('products.up_to') }} {{ product.discount }}% {{ $t('products.off') }}</span>
            <div class="flex items-center justify-end gap-1 ms-auto">
              <tooltip :text="$t('tooltip.quick_look')" position="bottom">
                <nuxt-link-locale :to="`/products/${product.id}`" type="button"
                  class="p-2 text-gray-500 rounded-lg hover:text-gray-900 dark:text-gray-100 dark:hover:text-gray-300">
                  <span class="sr-only">Quick look</span>
                  <icon name="material-symbols:visibility-outline-rounded" class="w-6 h-6" aria-hidden="true" />
                </nuxt-link-locale>
              </tooltip>

              <tooltip :text="$t('tooltip.add_to_wishlist')" position="bottom">
                <button @click="toggleWishlist(product)"
                  class="p-2 text-gray-500 rounded-lg hover:text-gray-900 dark:text-gray-100 dark:hover:text-gray-300">
                  <icon :name="wishlistIcon(product)" size="20px" :class="wishlistIconClass(product)"
                    class="p-1 rounded-full" />
                </button>
              </tooltip>
            </div>
          </div>

          <nuxt-link to=""
            class="block w-full text-lg font-semibold leading-tight text-gray-900 capitalize truncate hover:underline dark:text-gray-200">
            {{ $i18n.locale === 'ar' ? product.titleAr :
              product.title }}</nuxt-link>
          <div class="flex items-center gap-2 mt-2">
            <div class="flex items-center">
              <!-- ratings component -->
              <ratings @ratingSelected="handleRating" :productId="product.id" />
            </div>
          </div>

          <ul class="flex items-center gap-4 mt-2">
            <li class="flex items-center gap-2">
              <icon name="material-symbols:delivery-truck-speed" class="w-4 h-4 text-gray-500 dark:text-gray-100"
                aria-hidden="true" />
              <p class="text-sm font-medium text-gray-500 dark:text-gray-100">Fast Delivery</p>
            </li>

            <li class="flex items-center gap-2">
              <icon name="bi:cash-stack" class="w-4 h-4 text-gray-500 dark:text-gray-100" aria-hidden="true" />
              <p class="text-sm font-medium text-gray-500 dark:text-gray-100">Best Price</p>
            </li>
          </ul>

          <div class="flex items-center gap-2 mt-4">
            <p class="text-2xl font-extrabold leading-tight text-gray-800 dark:text-gray-200">{{
              $n(parseFloat(product.discountedPrice), 'currency', currencyLocale) }}</p>
            <p class="mt-2 font-semibold leading-tight text-gray-400 line-through text-md dark:text-gray-100"
              v-if="product.originalPrice">
              {{
                $n(parseFloat(product.originalPrice), 'currency', currencyLocale) }}</p>
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
            <span v-else>{{ $t('btn.add_to_cart') }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- dynamic-toast component -->
    <div class="fixed z-50 pointer-events-none bottom-5 start-5 w-96">
      <div class="pointer-events-auto">
        <dynamic-toast v-if="showToast" :message="toastMessage" :toastType="toastType" :duration="5000"
          :toastIcon="toastIcon" @toastClosed="showToast = false" />
      </div>
    </div>
  </div>
</template>

<script setup>
const productStore = useProductsStore()
const categoriesStore = useCategoriesStore()
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();
const route = useRoute();
const loading = ref({});
const errorMessage = ref("");
const itemAdded = ref('')
const { showToast, toastMessage, toastType, toastIcon, triggerToast } = useToast();
const { t } = useI18n()
const productsList = ref([])

onMounted(async () => {
  if (route.query.categoryId) {
    const categoryId = String(route.query.categoryId);
    productsList.value = productStore.fetchProductsByCategory(categoryId);
  } else if (route.query.brand) {
    const brandTitle = String(route.query.brand);
    productsList.value = productStore.fetchProductsByBrand(brandTitle);
  } else {
    productStore.fetchProducts();
    productsList.value = productStore.products
  }
});

watch(() => route.query, async (newQuery) => {
  if (newQuery.categoryId) {
    const categoryId = String(newQuery.categoryId);
    await categoriesStore.fetchCategoryById(categoryId);
    productStore.fetchProductsByCategory(categoryId);
  } else if (newQuery.brand) {
    productStore.fetchProductsByBrand(newQuery.brand);
  } else {
    productStore.fetchProducts();
  }
});

const quantity = ref(1)

const handleAddToCart = async (product) => {
  if (!product) return;
  const authStore = useAuthStore();
  if (!authStore.isAuthenticated) {
    triggerToast({
      message: t('toast.please_log_in_first_to_add_to_cart'),
      type: 'warning',
      icon: 'material-symbols:warning-outline-rounded'
    });
    return;
  }
  try {
    loading.value[product.id] = true;
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await cartStore.addToCart({
      ...product,
      quantity: 1
    });
    triggerToast({
      message: t('toast.product_added_to_cart'),
      type: 'success',
      icon: 'clarity:shopping-cart-line'
    });
  } catch (error) {
    triggerToast({
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
    triggerToast({ message: t('toast.please_log_in_first_to_add_to_wishlist'), type: 'warning', icon: 'material-symbols:warning-outline-rounded' });
    return;
  }
  const userId = authStore.user?.uid;
  if (!userId) {
    return;
  }
  if (wishlistStore.isInWishlist(product.id)) {
    errorMessage.value = t('toast.product_already_added_to_the_wishlist');
    setTimeout(() => (errorMessage.value = ""), 3000);
  } else {
    try {
      await wishlistStore.addToWishlist({
        ...product,
        userId,
        quantity: 1
      });
      itemAdded.value = t('toast.product_added_to_wishlist');
      setTimeout(() => (itemAdded.value = ""), 3000);
      triggerToast({ message: t('toast.product_added_to_wishlist'), type: 'success', icon: 'clarity:heart-line' });
    } catch (error) {
      if (error.message === t('toast.product_already_added_to_the_wishlist')) {
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

//ratings
const props = defineProps({
  productId: String,
});

const handleRating = (rating) => {
  productStore.updateProductRating(props.productId, rating);
};

//currency composable
const { currencyLocale } = useCurrencyLocale();
</script>