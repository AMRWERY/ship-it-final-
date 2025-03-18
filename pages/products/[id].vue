<template>
  <div>
    <div class="font-[sans-serif] p-4">
      <div class="max-w-xl mx-auto lg:max-w-7xl">
        <div class="grid items-start grid-cols-1 gap-8 lg:grid-cols-2 max-lg:gap-12 max-sm:gap-8">
          <div class="top-0 w-full lg:sticky">
            <div class="flex flex-row gap-4">
              <div class="flex flex-col w-16 space-y-4 max-sm:w-14 shrink-0">
                <img v-for="(image, index) in imageList" :key="index" :src="image" @click="setSelectedImage(image)"
                  class="aspect-[64/85] object-cover object-top w-full cursor-pointer p-1 border border-gray-200 rounded-lg" />
              </div>
              <div class="flex-1">
                <img :src="selectedImage" class="w-full aspect-[548/712] object-cover rounded-lg" />
              </div>
            </div>
          </div>

          <div class="w-full">
            <div>
              <h3 class="text-lg font-bold text-gray-800 sm:text-xl dark:text-gray-200">{{
                $i18n.locale === 'ar' ? productStore.selectedProduct?.titleAr :
                  productStore.selectedProduct?.title }}</h3>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-100">{{ $i18n.locale === 'ar' ?
                productStore.selectedProduct?.brandAr :
                productStore.selectedProduct?.brand }}
              </p>
              <div class="flex flex-wrap items-center gap-4 mt-4">
                <h4 class="text-2xl font-bold text-gray-800 sm:text-3xl dark:text-gray-200">{{
                  $n(parseFloat(productStore.selectedProduct?.discountedPrice) || 0, 'currency', currencyLocale) }}</h4>
                <p class="text-lg text-gray-500 line-through dark:text-gray-100 mt-0.5"
                  v-if="productStore.selectedProduct?.originalPrice">{{
                    $n(parseFloat(productStore.selectedProduct?.originalPrice) || 0, 'currency', currencyLocale) }}</p>
                <span class="p-2 text-sm font-medium text-white bg-green-400 ms-8 rounded-xl dark:bg-orange-400"
                  v-if="productStore.selectedProduct?.discount">{{ $t('products.save') }}
                  {{ productStore.selectedProduct?.discount }}%</span>
              </div>

              <div class="flex items-center gap-4 mt-3">
                <div class="flex items-center">
                  <div class="flex space-s-2">
                    <!-- ratings component -->
                    <ratings @ratingSelected="handleRating" :productId="productStore.selectedProduct?.id" />
                  </div>
                </div>
              </div>
            </div>

            <hr class="my-3 border-gray-300" />

            <div>
              <h3 class="text-lg font-bold text-gray-800 sm:text-xl dark:text-gray-200">{{ $t('products.size') }}</h3>
              <div class="flex flex-wrap gap-4 mt-1">
                <button v-for="size in productStore.selectedProduct?.sizes" :key="size" @click="setSelectedSize(size)"
                  :class="{
                    'border-blue-600 bg-blue-50': selectedSize === size,
                    'border-gray-300': selectedSize !== size
                  }"
                  class="relative flex items-center justify-center w-auto px-2 py-1 text-sm transition-colors border h-11 hover:border-blue-600 shrink-0">
                  {{ size }}
                  <div v-if="selectedSize === size"
                    class="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <div class="flex items-center justify-center w-4 h-4 bg-blue-600 rounded-full">
                      <icon name="heroicons:check-20-solid" class="w-3 h-3 text-white" />
                    </div>
                  </div>
                </button>
              </div>

              <h3 class="mt-8 text-lg font-bold text-gray-800 sm:text-xl dark:text-gray-200">{{ $t('products.color') }}
              </h3>
              <div class="flex flex-wrap gap-4 mt-1">
                <button v-for="color in productStore.selectedProduct?.colors" :key="color"
                  @click="setSelectedColor(color)" :class="{
                    'border-blue-600 bg-blue-50': selectedColor === color,
                    'border-gray-300': selectedColor !== color
                  }"
                  class="relative flex items-center justify-center w-auto px-2 py-1 text-sm transition-colors border h-11 hover:border-blue-600 shrink-0">
                  {{ color }}
                  <div v-if="selectedColor === color"
                    class="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <div class="flex items-center justify-center w-4 h-4 bg-blue-600 rounded-full">
                      <icon name="heroicons:check-20-solid" class="w-3 h-3 text-white" />
                    </div>
                  </div>
                </button>
              </div>

              <!-- SKU -->
              <div class="mt-8">
                <h2 class="text-lg font-bold text-gray-800 dark:text-gray-200 sm:text-xl">{{ $t('products.sku') }}</h2>
                <p class="mt-1 space-y-1 text-gray-600 dark:text-gray-100">
                  {{ productStore.selectedProduct?.sku }}
                </p>
              </div>

              <!-- Stock -->
              <div class="mt-8">
                <h2 class="text-lg font-bold text-gray-800 sm:text-xl dark:text-gray-200">{{ $t('products.stock') }}
                </h2>
                <p class="mt-1 space-y-1 text-gray-600 dark:text-gray-100">
                  {{ $t('products.only') }} <span class="font-semibold text-red-700 underline dark:text-red-400">{{
                    productStore.selectedProduct?.stock
                  }}</span>
                  {{ $t('products.left_in_stock_order_soon') }}
                </p>
              </div>

              <div class="mt-8">
                <h3 class="text-lg font-bold text-gray-800 dark:text-gray-200 sm:text-xl">{{ $t('products.quantity') }}
                </h3>
                <div class="flex mt-1 overflow-hidden border divide-x rounded w-max">
                  <button type="button" class="w-12 h-10 font-semibold bg-gray-100 dark:bg-gray-300"
                    @click="decrementQuantity">
                    <icon name="material-symbols:remove" class="w-5 h-5 mt-1 text-black" />
                  </button>
                  <input type="number" placeholder="1"
                    class="flex items-center justify-center w-16 h-10 text-lg font-semibold text-gray-800 bg-transparent dark:text-gray-200"
                    v-model="quantity">
                  <button type="button" class="w-12 h-10 font-semibold bg-gray-800 dark:bg-gray-600"
                    @click="incrementQuantity">
                    <icon name="material-symbols:add" class="w-5 h-5 mt-1 text-white" />
                  </button>
                </div>
              </div>

              <div class="flex flex-wrap gap-4 mt-6">
                <button class="flex items-center justify-center gap-2 px-6 py-2 btn-style w-[60%]"
                  @click="handleAddToCart">
                  <icon name="material-symbols:add-shopping-cart-sharp" class="w-5 h-5" />
                  <div class="flex items-center justify-center" v-if="loading">
                    <span class="text-center">{{ $t('btn.adding_to_cart') }}...</span>
                    <icon name="svg-spinners:270-ring-with-bg" class="w-5 h-5" />
                  </div>
                  <span v-else>{{ $t('btn.add_to_cart') }}</span>
                </button>

                <!-- Add to Cart Wishlist -->
                <button @click="toggleWishlist"
                  class="flex items-center justify-center h-10 p-2 text-gray-700 border border-gray-300 w-11 hover:text-gray-50 hover:bg-black dark:text-gray-200">
                  <icon :name="isInWishlist ? 'clarity:heart-solid' : 'clarity:heart-line'" size="20px"
                    :class="isInWishlist ? 'bg-red-600' : ''" class="p-1 rounded-full" />
                </button>
              </div>

              <p v-if="errorMessage" class="mt-2 mb-3 text-sm text-center text-red-500">{{ errorMessage }}
              </p>
              <p v-if="itemAdded" class="mt-2 mb-3 text-sm text-center text-green-500">{{ itemAdded }}</p>
            </div>

            <hr class="my-6 border-gray-300" />

            <div>
              <h3 class="text-lg font-bold text-gray-800 sm:text-xl dark:text-gray-200">{{
                $t('products.product_information') }}</h3>
              <div class="mt-2" role="accordion">
                <div class="transition-all">
                  <span class="text-sm font-semibold text-gray-800 text-start dark:text-gray-200">
                  </span>
                  <div class="px-4 pb-4 mt-2 text-gray-600 dark:text-gray-100 max-h-24 custom-scroll">
                    <p>
                      {{ $i18n.locale === 'ar' ? productStore.selectedProduct?.descriptionAr :
                        productStore.selectedProduct?.description }}
                    </p>
                  </div>
                </div>

                <!-- don't delete it (Vendor details) -->
                <!-- <div class="mt-3">
                  <p
                    class="w-full text-sm font-semibold text-start px-4 py-2.5 text-gray-800 dark:text-gray-200 flex items-center">
                    <span class="me-4">Vendor details</span>
                  </p>
                  <div class="px-4 pb-4">
                    <p class="text-sm leading-relaxed text-gray-500 dark:text-gray-100">Lorem ipsum dolor sit amet,
                      consectetur adipiscing
                      elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  </div>
                </div>

                <div>
                  <p
                    class="w-full text-sm font-semibold text-start px-4 py-2.5 text-gray-800 dark:text-gray-200 flex items-center">
                    <span class="me-4">Return and exchange policy</span>
                  </p>
                  <div class="px-4 pb-4">
                    <p class="text-sm leading-relaxed text-gray-500 dark:text-gray-100">Lorem ipsum dolor sit amet,
                      consectetur adipiscing
                      elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  </div>
                </div> -->
              </div>
            </div>

            <hr class="border-gray-300" />

            <div>
              <h3 class="mt-4 text-lg font-bold text-gray-800 sm:text-xl dark:text-gray-200">{{
                $t('products.customer_reviews') }}</h3>
              <!-- ratings component -->
              <ratings :productId="productStore.selectedProduct?.id" />
            </div>

            <div class="mt-6">
              <div class="flex items-start">
                <img :src="profileImg" alt="user" class="w-12 h-12 border-2 border-white rounded-full" />
                <div class="ms-3">
                  <h4 class="text-sm font-bold">{{ firstName }} {{ lastName }}</h4>
                  <p class="mt-4 text-sm text-gray-500 dark:text-gray-200">Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit. Sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
              </div>
              <div class="mt-3">
                <label for="comment" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{
                  $t('form.your_comment') }}</label>
                <textarea id="comment" rows="4"
                  class="w-full px-3 py-2 transition duration-300 bg-transparent border rounded-md shadow-sm placeholder:text-slate-400 dark:placeholder:text-slate-300 text-slate-700 dark:text-slate-200 focus:outline-none focus:border-slate-400 hover:border-slate-300 focus:shadow"
                  :placeholder="t('form.write_your_comments_here')"></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- may-also-like component -->
    <may-also-like />

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
const wishlistStore = useWishlistStore();
const cartStore = useCartStore();
const route = useRoute();
const loading = ref(false);
const errorMessage = ref("");
const itemAdded = ref('')
const { showToast, toastMessage, toastType, toastIcon, triggerToast } = useToast();
const { t } = useI18n()
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const firstName = computed(() => user.value?.firstName);
const lastName = computed(() => user.value?.lastName);
const profileImg = computed(() => user.value?.profileImg);

onMounted(() => {
  const productId = route.params.id;
  if (productId) {
    productStore.fetchProductDetail(productId);
    // addToProductHistory(productId);
  }
});

const productDetails = ref(null);

watch(() => productStore.selectedProduct, (newProduct) => {
  if (newProduct) {
    productDetails.value = newProduct;
  }
});

const imageList = computed(() =>
  [
    productStore.selectedProduct?.imageUrl1,
    productStore.selectedProduct?.imageUrl2,
    productStore.selectedProduct?.imageUrl3,
    productStore.selectedProduct?.imageUrl4,
  ].filter(Boolean)
);

const selectedImage = ref('');

const setSelectedImage = (image) => {
  selectedImage.value = image;
};

watch(
  () => productStore.selectedProduct,
  (newProduct) => {
    if (newProduct) {
      selectedImage.value = newProduct.imageUrl1 || "";
    }
  },
  { immediate: true }
);

const selectedColor = ref(null);
const selectedSize = ref(null);

const setSelectedColor = (color) => {
  selectedColor.value = color;
};

const setSelectedSize = (size) => {
  selectedSize.value = size;
};

const handleAddToCart = () => {
  const product = productStore.selectedProduct;
  if (!product) return;
  const authStore = useAuthStore();
  if (!authStore.isAuthenticated) {
    triggerToast({ message: t('toast.please_log_in_first_to_add_to_cart'), type: 'warning', icon: 'material-symbols:warning-outline-rounded' });
    return;
  }
  loading.value = true;
  const cartItem = {
    id: product.id,
    title: product.title,
    titleAr: product.titleAr,
    discountedPrice: product.discountedPrice,
    originalPrice: product.originalPrice,
    imageUrl1: product.imageUrl1,
    brand: product.brand,
    brandAr: product.brandAr,
    discount: product.discount,
    quantity: quantity.value,
    color: selectedColor.value,
    size: selectedSize.value
  };
  cartStore.addToCart(cartItem)
    .then(() => {
      triggerToast({ message: t('toast.product_added_to_cart'), type: 'success', icon: 'clarity:shopping-cart-line' });
    })
    .catch((error) => {
      triggerToast({ message: t('toast.failed_to_add_to_cart'), type: 'error', icon: 'material-symbols:error-outline-rounded' });
    })
    .finally(() => {
      loading.value = false;
    });
};

const toggleWishlist = () => {
  const product = productStore.selectedProduct;
  if (!product) return;
  const authStore = useAuthStore();
  if (!authStore.isAuthenticated) {
    triggerToast({
      message: t('toast.please_log_in_first_to_add_to_wishlist'),
      type: 'warning',
      icon: 'material-symbols:warning-outline-rounded'
    });
    return;
  }
  const userId = authStore.user?.uid;
  if (!userId) {
    return;
  }
  if (wishlistStore.isInWishlist(product.id)) {
    errorMessage.value = "Product already added to the wishlist.";
    setTimeout(() => (errorMessage.value = ""), 3000);
  } else {
    const wishlistItems = {
      id: product.id,
      title: product.title,
      titleAr: product.titleAr,
      discountedPrice: product.discountedPrice,
      originalPrice: product.originalPrice,
      brand: product.brand,
      brandAr: product.brandAr,
      imageUrl1: product.imageUrl1,
      selectedColor: selectedColor.value,
      selectedSize: selectedSize.value,
      userId
    }
    wishlistStore.addToWishlist(wishlistItems)
      .then(() => {
        itemAdded.value = "Product added to wishlist!";
        setTimeout(() => (itemAdded.value = ""), 3000);
        triggerToast({
          message: t('toast.product_added_to_wishlist'),
          type: 'success',
          icon: 'clarity:heart-line'
        });
      })
      .catch((error) => {
        if (error.message === "Product already added to the wishlist.") {
          errorMessage.value = error.message;
          setTimeout(() => (errorMessage.value = ""), 3000);
        } else {
          console.error("Error adding to wishlist:", error);
        }
      });
  }
};

const isInWishlist = computed(() =>
  wishlistStore.isInWishlist(productStore.selectedProduct?.id)
);

const quantity = ref(1);

const incrementQuantity = () => {
  quantity.value++;
  // updateQuantityInStore(quantity.value);
};

const decrementQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
    // updateQuantityInStore(quantity.value);
  }
};

const updateQuantityInStore = (newQuantity) => {
  const productId = productStore.selectedProduct?.id;
  if (productId) {
    cartStore.updateQuantityInCart(productId, newQuantity);
  }
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