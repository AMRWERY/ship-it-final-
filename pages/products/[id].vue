<template>
  <div>
    <div class="font-[sans-serif] p-4">
      <div class="max-w-xl mx-auto lg:max-w-7xl">
        <div class="grid items-start grid-cols-1 gap-8 lg:grid-cols-2 max-lg:gap-12 max-sm:gap-8">
          <div class="top-0 w-full lg:sticky">
            <div class="flex flex-row gap-4">
              <div class="flex flex-col w-16 space-y-4 max-sm:w-14 shrink-0">
                <img v-for="(image, index) in imageList" :key="index" :src="image" @click="setSelectedImage(image)"
                  class="aspect-[64/85] object-cover object-top w-full cursor-pointer border-b-2 border-black rounded-xl" />
              </div>
              <div class="flex-1">
                <img :src="selectedImage" class="w-full aspect-[548/712] object-cover rounded-xl" />
              </div>
            </div>
          </div>

          <div class="w-full">
            <div>
              <h3 class="text-lg font-bold text-gray-800 sm:text-xl dark:text-gray-200">{{
                productStore.selectedProduct?.title }}</h3>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-100">{{ productStore.selectedProduct?.brand }}
              </p>
              <div class="flex flex-wrap items-center gap-4 mt-4">
                <h4 class="text-2xl font-bold text-gray-800 sm:text-3xl dark:text-gray-200">{{
                  productStore.selectedProduct?.discountedPrice }} egp</h4>
                <p class="text-lg text-gray-500 line-through dark:text-gray-100 mt-0.5"
                  v-if="productStore.selectedProduct?.originalPrice">{{
                    productStore.selectedProduct?.originalPrice }} egp</p>
                <span class="p-2 text-sm font-medium text-white bg-green-400 ms-8 rounded-xl dark:bg-orange-400"
                  v-if="productStore.selectedProduct?.discount">Save
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

            <hr class="my-6 border-gray-300" />

            <div>
              <h3 class="text-lg font-bold text-gray-800 sm:text-xl dark:text-gray-200">Sizes</h3>
              <div class="flex flex-wrap gap-4 mt-4">
                <button type="button" v-for="size in productStore.selectedProduct?.sizes" :key="size"
                  class="flex items-center justify-center w-auto px-3 py-1 text-sm border border-gray-300 h-11 hover:border-blue-600 shrink-0">{{
                    size }}</button>
              </div>

              <h3 class="mt-8 text-lg font-bold text-gray-800 sm:text-xl dark:text-gray-200">Colors</h3>
              <div class="flex flex-wrap gap-4 mt-4">
                <button type="button" v-for="color in productStore.selectedProduct?.colors" :key="color"
                  class="flex items-center justify-center w-auto px-2 py-1 text-sm border border-gray-300 h-11 hover:border-blue-600 shrink-0">{{
                    color }}</button>
              </div>

              <!-- SKU -->
              <div class="mt-8">
                <h2 class="text-lg font-bold text-gray-800 dark:text-gray-200 sm:text-xl">SKU</h2>
                <p class="mt-4 space-y-1 text-gray-600 dark:text-gray-100">
                  {{ productStore.selectedProduct?.sku }}
                </p>
              </div>

              <!-- Stock -->
              <div class="mt-8">
                <h2 class="text-lg font-bold text-gray-800 sm:text-xl dark:text-gray-200">Stock</h2>
                <p class="mt-3 space-y-1 text-gray-600 dark:text-gray-100">
                  Only <span class="font-semibold text-red-700 underline dark:text-red-400">{{
                    productStore.selectedProduct?.stock
                    }}</span>
                  left in stock - order soon.
                </p>
              </div>

              <div class="mt-8">
                <h3 class="text-lg font-bold text-gray-800 dark:text-gray-200 sm:text-xl">Quantity</h3>
                <div class="flex mt-5 overflow-hidden border divide-x rounded w-max">
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

            <!-- don't delete it -->
            <!-- <div>
              <h3 class="text-lg font-bold text-gray-800 sm:text-xl">Select Delivery Location</h3>
              <p class="mt-1 text-sm text-gray-500">Enter the pin code of your area to check product
                availability.</p>
              <div class='flex items-center max-w-sm gap-2 mt-4'>
                <input type='number' placeholder='Enter pincode'
                  class='bg-gray-100 px-4 py-2.5 text-sm w-full  border-0 outline-0' />
                <button type='button'
                  class='border-0 outline-0 bg-blue-600 hover:bg-blue-700 text-white  px-4 py-2.5 text-sm'>Apply</button>
              </div>
            </div>
            <hr class="my-6 border-gray-300" /> -->

            <div>
              <h3 class="text-lg font-bold text-gray-800 sm:text-xl dark:text-gray-200">Product Information</h3>
              <div class="mt-2" role="accordion">
                <div class="transition-all">
                  <span class="text-sm font-semibold text-gray-800 text-start dark:text-gray-200">
                  </span>
                  <div class="px-4 pb-4 mt-2 text-gray-600 dark:text-gray-100 max-h-24 custom-scroll">
                    <p>
                      {{ productStore.selectedProduct?.description }}
                    </p>
                  </div>
                </div>

                <!-- don't delete it -->
                <!-- <div class="mt-3 transition-all hover:bg-gray-100">
                  <p
                    class="w-full text-sm font-semibold text-left px-4 py-2.5 text-gray-800 flex items-center">
                    <span class="mr-4">Vendor details</span>
                  </p>
                  <div class="px-4 pb-4">
                    <p class="text-sm leading-relaxed text-gray-500">Lorem ipsum dolor sit amet,
                      consectetur adipiscing
                      elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  </div>
                </div>

                <div class="transition-all hover:bg-gray-100">
                  <p
                    class="w-full text-sm font-semibold text-left px-4 py-2.5 text-gray-800 flex items-center">
                    <span class="mr-4">Return and exchange policy</span>
                  </p>
                  <div class="px-4 pb-4">
                    <p class="text-sm leading-relaxed text-gray-500">Lorem ipsum dolor sit amet,
                      consectetur adipiscing
                      elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  </div>
                </div> -->
              </div>
            </div>

            <hr class="my-6 border-gray-300" />

            <div>
              <h3 class="mb-4 text-lg font-bold text-gray-800 sm:text-xl dark:text-gray-200">Customer Reviews</h3>
              <!-- ratings component -->
              <ratings />

              <div class="flex flex-wrap items-center gap-4 mt-4">
                <h4 class="text-2xl font-semibold text-gray-800 dark:text-gray-200 sm:text-3xl">4.0 / 5</h4>
                <p class="text-sm text-gray-500 dark:text-gray-100">Based on 253 ratings</p>
              </div>
            </div>

            <div class="mt-6">
              <div class="flex items-start">
                <img src="https://readymadeui.com/team-2.webp" alt="user"
                  class="w-12 h-12 border-2 border-white rounded-full" />
                <div class="ms-3">
                  <h4 class="text-sm font-bold">Amr Mohamed</h4>
                  <div class="flex mt-1 space-s-1">
                    <!-- ratings component -->
                    <ratings />
                    <p class="text-xs text-gray-500 !ms-2 mt-0.5 dark:text-gray-200">2 months ago</p>
                  </div>
                  <p class="mt-4 text-sm text-gray-500 dark:text-gray-200">Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit. Sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
              </div>
            </div>
          </div>
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
const wishlistStore = useWishlistStore();
const cartStore = useCartStore();
const route = useRoute();
const loading = ref(false);
const errorMessage = ref("");
const itemAdded = ref('')
const { showToast, toastTitle, toastMessage, toastType, toastIcon, triggerToast } = useToast();
const { t } = useI18n()

onMounted(() => {
  const productId = route.params.id;
  // console.log('id', productId)
  if (productId) {
    productStore.fetchProductDetail(productId);
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
    productStore.selectedProduct?.imageUrl5,
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

const handleAddToCart = () => {
  const product = productStore.selectedProduct;
  if (!product) return;
  const authStore = useAuthStore();
  if (!authStore.isAuthenticated) {
    triggerToast({ title: t('toast.ah_ah'), message: t('toast.please_log_in_first_to_add_to_cart'), type: 'warning', icon: 'material-symbols:warning-outline-rounded' });
    return;
  }
  loading.value = true;
  cartStore.addToCart(
    product.id,
    product.title,
    product.discountedPrice,
    product.originalPrice,
    product.imageUrl1,
    product.brand,
    product.discount,
    quantity.value
  )
    .then(() => {
      triggerToast({ title: t('toast.great'), message: t('toast.item_added_to_your_cart'), type: 'success', icon: 'clarity:shopping-cart-line' });
    })
    .catch((error) => {
      // console.error("Error adding product to cart:", error);
      triggerToast({ title: t('toast.error'), message: t('toast.failed_to_add_to_cart'), type: 'error', icon: 'material-symbols:error-outline-rounded' });
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
      title: t('toast.ah_ah'),
      message: t('toast.please_log_in_first_to_add_to_wishlist'),
      type: 'warning',
      icon: 'material-symbols:warning-outline-rounded'
    });
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
    wishlistStore.addToWishlist(
      product.id,
      product.title,
      product.discountedPrice,
      product.originalPrice,
      product.brand,
      product.imageUrl1,
      userId
    )
      .then(() => {
        itemAdded.value = "Product added to wishlist!";
        setTimeout(() => (itemAdded.value = ""), 3000);
        triggerToast({
          title: t('toast.great'),
          message: t('toast.item_added_to_your_wishlist'),
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
</script>

<style scoped>
.custom-scroll {
  overflow-y: scroll;
}

.custom-scroll::-webkit-scrollbar {
  display: none;
}

.custom-scroll {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>