<template>
  <div>
    <section class="container max-w-full m-10 mx-auto sm:px-6 lg:px-8">
      <div class="flex items-center justify-center mt-8 mb-3">
        <div class="w-1/12 h-1 border-t-2 border-gray-700"></div>
        <span class="mx-4 title title-font">{{ title }}</span>
        <div class="w-1/12 h-1 border-t-2 border-gray-700"></div>
      </div>

      <!-- skeleton-loader component -->
      <skeleton-loader v-if="filteredProducts.length === 0" />

      <ClientOnly>
        <Carousel v-bind="config">
          <Slide v-for="card in filteredProducts" :key="card.id">
            <div class="carousel__item">
              <nuxt-link :to="`/products/${card.id}`"
                class="relative flex flex-col w-full max-w-xs my-10 overflow-hidden bg-white group">
                <div class="w-full h-[307px] relative">
                  <img
                    class="absolute top-0 object-cover object-top w-full h-full transition-all duration-500 ease-in-out end-0"
                    :src="card.imageUrl1" />
                  <img
                    class="absolute top-0 object-cover object-top w-full h-full transition-all duration-500 ease-in-out opacity-0 end-0 group-hover:opacity-100"
                    :src="card.imageUrl2" />
                </div>

                <div class="flex flex-col flex-1 p-2">
                  <div class="flex-1">
                    <h5 class="text-sm font-bold text-gray-800 truncate sm:text-base text-start">{{ card.title }}</h5>
                    <div class="flex items-center justify-between">
                      <p class="mt-1 text-gray-500 truncate text-start">{{ card.brand }}</p>
                      <p class="mt-1 text-gray-500 truncate text-start">{{ card.productTypes[0] }}</p>
                    </div>
                    <div class="flex flex-wrap justify-between gap-2 mt-2">
                      <div class="flex items-center gap-2">
                        <h6 class="text-sm font-bold text-gray-800 sm:text-base">{{ card.discountedPrice }} egp</h6>
                        <h6 class="text-sm text-gray-500 line-through sm:text-base" v-if="card.originalPrice">{{
                          card.originalPrice
                        }} egp</h6>
                      </div>

                      <!-- ratings component -->
                      <ratings />
                    </div>
                  </div>
                </div>
              </nuxt-link>
              <div class="flex items-center gap-2 mt-4">
                <button type="button" @click="toggleWishlist(card)"
                  class="flex items-center justify-center w-12 bg-pink-100 rounded cursor-pointer hover:bg-pink-200 h-9"
                  title="Wishlist">
                  <icon name="heroicons-outline:heart" class="inline-block fill-pink-600" />
                </button>
                <button type="button" class="flex items-center justify-center w-full px-4 py-2 btn-style"
                  @click="handleAddToCart(card)">
                  <div class="flex items-center justify-center" v-if="loading">
                    <span class="text-center">{{ $t('btn.adding_to_cart') }}...</span>
                    <icon name="svg-spinners:270-ring-with-bg" class="w-5 h-5" />
                  </div>
                  <span v-else>Add to Cart</span>
                </button>
              </div>
            </div>
          </Slide>

          <template #addons>
            <Navigation />
          </template>
        </Carousel>
      </ClientOnly>

      <div class="flex flex-col items-center pb-2 space-y-2 bg-home/40 md:pb-4 md:space-y-4" v-if="imageSrc">
        <div class="relative w-full h-[100px] md:h-[180px] lg:h-[360px]">
          <canvas width="10" height="10"
            class="inset-0 object-contain object-center w-full h-full !absolute !object-cover !object-top">
          </canvas>
          <img :src="imageSrc" decoding="async" data-nimg="future-fill"
            class="!object-contain !object-center !w-full !h-full !object-cover !object-top w-full h-full img"
            loading="lazy" style="">
        </div>
      </div>

      <div class="max-w-2xl px-4 mx-auto sm:px-6 lg:max-w-full lg:px-8 my-7">
        <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 lg:grid-cols-2 xl:gap-x-8">
          <nuxt-link v-for="card in cardsOne" :key="card" :to="{ path: '/products', query: { brand: card.brand } }"
            class="relative transition-transform duration-300 border rounded-lg shadow-md group hover:scale-105">
            <div class="block bg-white rounded-lg max-w-96 xs:min-w-full">
              <img :src="card.img" class="object-cover w-full h-full" />
            </div>
            <div
              class="absolute bottom-0 w-full p-4 text-center transform -translate-x-1/2 translate-y-0 bg-black bg-opacity-50 left-1/2">
              <h2 class="mt-2 mb-4 text-xl font-semibold text-white">{{ card.title }}</h2>
              <p class="text-base font-semibold text-gray-200">{{ card.subtitle }}</p>
            </div>
          </nuxt-link>
        </div>
      </div>
    </section>

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
const props = defineProps({
  config: {
    type: Object,
    required: true
  },
  productTypes: {
    type: Array,
    required: true,
    default: () => [],
  },
  title: {
    type: String,
    required: true,
  },
  imageSrc: {
    type: String,
    required: false,
    // default: '',
  },
  cardsOne: {
    type: Array,
    required: false,
    default: () => [],
  }
});

const productsStore = useProductsStore()
const products = ref([])
const filteredProducts = ref([])
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();
const loading = ref(false);
const errorMessage = ref("");
const itemAdded = ref('')
const { showToast, toastTitle, toastMessage, toastType, toastIcon, triggerToast } = useToast();
const { t } = useI18n()

onMounted(() => {
  productsStore.fetchProducts();
  products.value = productsStore.products;

  if (props.productTypes && Array.isArray(props.productTypes)) {
    filteredProducts.value = products.value.filter(product =>
      Array.isArray(product.productTypes) &&
      product.productTypes.some(type => props.productTypes.includes(type))
    );
    // console.log('Filtered Products:', filteredProducts.value);
  }
});

watch(
  () => productsStore.products,
  (newProducts) => {
    products.value = newProducts;
    filteredProducts.value = newProducts.filter(product =>
      product.productTypes?.some(type => props.productTypes.includes(type))
    );
  }
);

const quantity = ref(1)

const handleAddToCart = (product) => {
  if (!product) return;
  const authStore = useAuthStore();
  if (!authStore.isAuthenticated) {
    triggerToast({
      title: t('toast.ah_ah'),
      message: t('toast.please_log_in_first_to_add_to_cart'),
      type: 'warning',
      icon: 'material-symbols:warning-outline-rounded',
    });
    return;
  }
  loading.value = true;
  cartStore
    .addToCart(
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
      triggerToast({
        title: t('toast.great'),
        message: t('toast.item_added_to_your_cart'),
        type: 'success',
        icon: 'clarity:shopping-cart-line',
      });
    })
    .catch((error) => {
      triggerToast({
        title: t('toast.error'),
        message: t('toast.failed_to_add_to_cart'),
        type: 'error',
        icon: 'material-symbols:error-outline-rounded',
      });
    })
    .finally(() => {
      loading.value = false;
    });
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
        product.originalPrice,
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

const isInWishlist = computed(() =>
  wishlistStore.isInWishlist(productStore.selectedProduct?.id)
);
</script>