<template>
  <div>
    <!-- Button to open the dialog -->
    <div class="h-8 bg-[#4f46e5] text-white">
      <nuxt-link to="" type="button"
        class="flex items-center justify-center py-1 text-sm capitalize cursor-pointer sm:text-medium md:text-lg"
        @click="openDialog">
        <span>{{
          $t('home.get_free_delivery_on_orders_over_egp1000') }}</span>
        <icon name="svg-spinners:clock" class="w-5 h-5 ms-1" />
      </nuxt-link>
    </div>

    <transition name="fade">
      <div v-if="isDialogOpen"
        class="fixed inset-0 p-4 flex flex-wrap justify-center items-center z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
        <div class="relative max-w-6xl bg-white rounded-lg shadow-xl custom-scroll h-[550px]">
          <div class="bg-gray-50 dark:bg-[#181a1b] p-4">
            <div class="relative">
              <div class="font-sans tracking-wide max-md:mx-auto">
                <div class="font-[sans-serif]">
                  <div class="max-w-xl mx-auto lg:max-w-6xl">
                    <!-- no deals available -->
                    <div v-if="!currentDeal">
                      <p class="text-3xl font-semibold text-center text-gray-600 dark:text-gray-100">{{
                        $t('home.no_deals_available_right_now') }}</p>
                      <p v-if="nextDealStartTime"
                        class="mt-2 text-xl font-medium text-center text-gray-500 dark:text-gray-100">
                        Next deal will start in <span class="font-semibold text-red-500 dark:text-red-400">{{
                          formatRemainingTime(nextDealStartTime) }}</span>
                      </p>
                    </div>

                    <div class="grid items-start grid-cols-1 gap-8 lg:grid-cols-2 max-lg:gap-12 max-sm:gap-8" v-else>
                      <div class="top-0 w-full lg:sticky">
                        <div class="flex flex-col gap-4">
                          <div class="relative shadow-lg">
                            <img :src="selectedImage"
                              class="w-full aspect-[11/8] object-cover object-center h-[450px]" />
                            <button @click="closeDialog"
                              class="absolute top-2 end-2 p-1.5 flex bg-white/80 dark:bg-gray-800/80 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors lg:hidden">
                              <icon name="material-symbols:close-small"
                                class="w-6 h-6 text-gray-800 dark:text-gray-200" />
                            </button>
                          </div>
                          <div class="w-full max-w-full p-2 overflow-auto dark:bg-[#181a1b]">
                            <div class="flex flex-row gap-4 shrink-0 space-s-2">
                              <img v-for="(image, index) in imageList" :key="index" :src="image"
                                @click="setSelectedImage(image)"
                                class="object-cover object-top w-16 h-16 p-1 border border-gray-200 rounded-lg shadow-md cursor-pointer aspect-square" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="w-full">
                        <div>
                          <div class="flex items-center justify-between">
                            <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200">
                              {{ $i18n.locale ===
                                'ar' ? currentDeal?.titleAr :
                                currentDeal?.title }}
                            </h3>
                            <button @click="closeDialog"
                              class="items-center justify-center hidden p-2 text-gray-600 border border-gray-300 rounded-full hover:text-gray-900 dark:text-gray-300 dark:hover:text-white max-sm:hidden lg:flex">
                              <icon name="material-symbols:close-small" />
                            </button>
                          </div>
                          <p class="mt-3 mb-4 text-sm">{{ $i18n.locale ===
                            'ar' ? currentDeal?.brandAr :
                            currentDeal?.brand }}</p>

                          <div class="flex flex-wrap items-center gap-2 mt-4">
                            <p class="text-base text-gray-500 line-through dark:text-gray-100">{{
                              $n(parseFloat(currentDeal?.originalPrice), 'currency', currencyLocale) }}</p>
                            <h4 class="text-2xl font-bold text-purple-800 sm:text-3xl">{{
                              $n(parseFloat(currentDeal?.discountedPrice), 'currency', currencyLocale) }}</h4>
                            <div class="flex py-1.5 px-2 bg-purple-600 font-semibold !ms-4 rounded-lg">
                              <span class="text-sm text-white">{{ $t('home.save') }} {{ currentDeal?.discount }}%</span>
                            </div>
                          </div>

                          <div class="flex items-center justify-around gap-5 mt-5">
                            <div v-for="(value, key) in currentDealTime" :key="key"
                              class="flex flex-col items-center space-y-2">
                              <div
                                class="flex items-center justify-center w-12 h-12 border-2 rounded-full bg-gradient-to-r from-violet-400 to-purple-300"
                                :class="`border-${key}`">
                                <span class="text-lg font-bold">{{ value }}</span>
                              </div>
                              <span class="text-sm font-medium capitalize">{{ $t('home.' + key) }}</span>
                            </div>
                          </div>
                        </div>

                        <hr class="my-6 border-gray-300" />

                        <div class="flex flex-wrap gap-2 mt-2">
                          <button v-for="color in currentDeal?.colors" :key="color" @click="setSelectedColor(color)"
                            :class="{
                              'border-blue-600 bg-blue-50': selectedColor === color,
                              'border-gray-300': selectedColor !== color
                            }"
                            class="flex items-center justify-center w-auto px-2 py-1 text-sm transition-colors border h-11 hover:border-blue-600 shrink-0">
                            {{ color }}
                          </button>
                        </div>

                        <!-- Size selection -->
                        <div class="flex flex-wrap gap-2 mt-2">
                          <button v-for="size in currentDeal?.sizes" :key="size" @click="setSelectedSize(size)" :class="{
                            'border-blue-600 bg-blue-50': selectedSize === size,
                            'border-gray-300': selectedSize !== size
                          }"
                            class="flex items-center justify-center w-auto px-2 py-1 text-sm transition-colors border h-11 hover:border-blue-600 shrink-0">
                            {{ size }}
                          </button>
                        </div>

                        <!-- <div class="mt-4">
                          <h3 class="text-lg font-bold text-gray-800 dark:text-gray-200">{{ $t('home.color') }}</h3>
                          <div class="flex flex-wrap gap-2 mt-2">
                            <button type="button" v-for="color in currentDeal?.colors" :key="color"
                              class="flex items-center justify-center w-auto px-2 py-1 text-sm border border-gray-300 h-11 hover:border-blue-600 shrink-0">{{
                                color }}</button>
                          </div>
                        </div>

                        <div class="mt-4">
                          <h3 class="text-lg font-bold text-gray-800 dark:text-gray-200">{{ $t('home.size') }}</h3>
                          <div class="flex flex-wrap gap-2 mt-2">
                            <button type="button" v-for="size in currentDeal?.sizes" :key="size"
                              class="flex items-center justify-center w-auto px-2 py-1 text-sm border border-gray-300 h-11 hover:border-blue-600 shrink-0">{{
                                size }}</button>
                          </div>
                        </div> -->

                        <div class="mt-4">
                          <p class="text-sm">{{ $t('home.sku') }} <span class="font-semibold">{{ currentDeal?.sku
                              }}</span></p>
                        </div>

                        <div class="mt-4">
                          <div>
                            <h3 class="text-lg font-bold text-gray-800 dark:text-gray-200">{{ $t('home.quantity') }}
                            </h3>
                            <div class="flex mt-4 overflow-hidden border divide-x rounded w-max">
                              <button type="button" class="w-12 h-10 font-semibold bg-gray-100"
                                @click="decrementQuantity">
                                <icon name="ic:round-minus" class="w-4 h-4" />
                              </button>
                              <input type="number" placeholder="1"
                                class="flex items-center justify-center h-10 text-lg font-semibold text-gray-800 bg-transparent w-14"
                                v-model="quantity">
                              <button type="button" class="w-12 h-10 font-semibold text-white bg-gray-800"
                                @click="incrementQuantity">
                                <icon name="material-symbols:add" class="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <div class="flex flex-wrap gap-4 mt-4">
                            <!-- Add to Cart -->
                            <button class="flex items-center justify-center gap-2 px-6 py-2 btn-style w-[60%]"
                              @click="handleAddToCart(currentDeal)">
                              <div class="flex items-center justify-center" v-if="loading">
                                <span class="text-center">{{ $t('btn.adding_to_cart') }}...</span>
                                <icon name="svg-spinners:270-ring-with-bg" class="w-5 h-5" />
                              </div>
                              <span v-else class="flex items-center">
                                <icon name="material-symbols:add-shopping-cart-sharp" class="me-2" />
                                {{ $t('btn.add_to_cart') }}
                              </span>
                            </button>

                            <!-- Add to Wishlist -->
                            <button @click="toggleWishlist(currentDeal)"
                              class="flex items-center justify-center h-10 p-2 text-gray-700 border border-gray-300 dark:text-gray-200 w-11 hover:text-gray-50 hover:bg-black dark:hover:bg-gray-700">
                              <icon :name="isInWishlist ? 'clarity:heart-solid' : 'clarity:heart-line'" size="20px"
                                :class="isInWishlist ? 'bg-red-600' : ''" class="p-1 rounded-full" />
                            </button>

                            <!-- actions Message -->
                            <div v-if="wishlistAdded" class="font-medium text-green-700 dark:text-green-400">
                              {{ $t('toast.product_added_to_wishlist') }}
                            </div>
                            <div v-if="wishlistNotAdded" class="font-medium text-red-700 dark:text-red-400">
                              {{ $t('toast.failed_add_product_to_wishlist') }}
                            </div>
                            <div v-if="productAdded">
                              <p class="font-medium text-green-700 dark:text-green-400">{{
                                $t('toast.product_added_to_cart') }}</p>
                            </div>
                            <div v-if="notAuth">
                              <p class="font-medium text-red-700 dark:text-red-400">{{
                                $t('toast.please_log_in_first_to_add_to_cart') }}</p>
                            </div>
                            <div v-if="productNotAdded">
                              <p class="font-medium text-red-700 dark:text-red-400">{{ $t('toast.failed_to_add_to_cart')
                              }}</p>
                            </div>
                          </div>

                          <div class="max-w-2xl mt-12 custom-scroll max-h-32">
                            <div class="mt-6">
                              <h3 class="text-lg font-bold text-gray-800 dark:text-gray-200">{{ $t('home.description')
                              }}
                              </h3>
                              <p class="mt-4 text-sm text-gray-600 dark:text-gray-100">{{ $i18n.locale ===
                                'ar' ? currentDeal?.descriptionAr :
                                currentDeal?.description }}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
const todayDealStore = useTodayDealStore();

const currentDeal = computed(() => todayDealStore.currentDeal);

const nextDealStartTime = ref(null);

const currentDealTime = ref({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
});

const calculateRemainingTime = (timestamp) => {
  const now = new Date().getTime();
  const targetTime = new Date(timestamp.seconds * 1000).getTime();
  const diff = targetTime - now;
  if (diff <= 0) return null;
  const days = Math.floor(diff / (24 * 60 * 60 * 1000));
  const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((diff % (60 * 1000)) / 1000);
  return { days, hours, minutes, seconds };
};

const updateCurrentDealTime = () => {
  if (!currentDeal.value?.endTime) return;
  const remaining = calculateRemainingTime(currentDeal.value.endTime);
  if (remaining) {
    currentDealTime.value = remaining;
  } else {
    currentDealTime.value = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
};

let interval;

onMounted(() => {
  todayDealStore
    .fetchDeals()
    .then(() => {
      const firstImage = todayDealStore.currentDeal?.imageUrl1;
      if (firstImage) selectedImage.value = firstImage;
      interval = setInterval(() => {
        updateCurrentDealTime();
      }, 1000);
      updateCurrentDealTime();
    })
    .catch((error) => {
      console.error("Error fetching deals:", error);
    });
});

onBeforeUnmount(() => {
  if (interval) clearInterval(interval);
});

const formatRemainingTime = (timeObj) => {
  if (
    typeof timeObj === "object" &&
    timeObj.days !== undefined &&
    timeObj.hours !== undefined &&
    timeObj.minutes !== undefined &&
    timeObj.seconds !== undefined
  ) {
    return `${timeObj.days} days ${timeObj.hours} hrs ${timeObj.minutes} mins ${timeObj.seconds} secs`;
  }
  return "Invalid time";
};

const imageList = computed(() =>
  [
    todayDealStore.currentDeal?.imageUrl1,
    todayDealStore.currentDeal?.imageUrl2,
    todayDealStore.currentDeal?.imageUrl3,
    todayDealStore.currentDeal?.imageUrl4,
  ].filter(Boolean)
);

const selectedImage = ref('');

const setSelectedImage = (image) => {
  selectedImage.value = image;
};

const selectedColor = ref(null);
const selectedSize = ref(null);

const setSelectedColor = (color) => {
  selectedColor.value = color;
  console.log('selected color:', selectedColor.value)
};

const setSelectedSize = (size) => {
  selectedSize.value = size;
  console.log('selected size:', selectedSize.value)
};

const authStore = useAuthStore();
const wishlistStore = useWishlistStore();
const productAdded = ref('');
const notAuth = ref(false)
const productNotAdded = ref('')
const wishlistAdded = ref('');
const wishlistNotAdded = ref('');
const quantity = ref(1);
const loading = ref(false);

const handleAddToCart = (currentDeal) => {
  if (!currentDeal) return;
  loading.value = true;
  const itemData = {
    ...currentDeal,
    quantity: quantity.value || 1,
    selectedColor: selectedColor.value,
    selectedSize: selectedSize.value
  };
  todayDealStore
    .addToCart(itemData)
    .then(() => {
      setTimeout(() => {
        loading.value = false;
        productAdded.value = true;
        setTimeout(() => {
          productAdded.value = false;
        }, 3000);
      }, 3000);
    })
    .catch((error) => {
      if (error.message.includes("authenticated")) {
        notAuth.value = true;
        setTimeout(() => {
          notAuth.value = false;
          loading.value = false;
        }, 3000);
      } else {
        productNotAdded.value = true;
        setTimeout(() => {
          productNotAdded.value = false;
          loading.value = false;
        }, 3000);
      }
    });
};

const incrementQuantity = () => {
  quantity.value++;
};

const decrementQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

const toggleWishlist = async (currentDeal) => {
  if (!currentDeal) return;
  if (!authStore.isAuthenticated) {
    notAuth.value = true;
    setTimeout(() => {
      notAuth.value = false;
    }, 3000);
    return;
  }
  try {
    await wishlistStore.addToWishlist({
      id: currentDeal.id,
      title: currentDeal.title,
      titleAr: currentDeal.titleAr,
      discountedPrice: currentDeal.discountedPrice,
      originalPrice: currentDeal.originalPrice,
      brand: currentDeal.brand,
      brandAr: currentDeal.brandAr,
      imageUrl1: currentDeal.imageUrl1,
      selectedColor: selectedColor.value,
      selectedSize: selectedSize.value
    });
    wishlistAdded.value = true;
    setTimeout(() => {
      wishlistAdded.value = false;
    }, 3000);
  } catch (error) {
    setTimeout(() => {
      wishlistNotAdded.value = false;
    }, 3000);
  }
};

const isInWishlist = computed(() =>
  wishlistStore.isInWishlist(currentDeal.id)
);

const isDialogOpen = ref(false);

const openDialog = () => {
  isDialogOpen.value = true;
};

const closeDialog = () => {
  isDialogOpen.value = false;
};

//currency composable
const { currencyLocale } = useCurrencyLocale();
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active .bg-black\/50,
.fade-leave-active .bg-black\/50 {
  transition: opacity 0.3s ease;
}

.fade-enter-from .bg-black\/50,
.fade-leave-to .bg-black\/50 {
  opacity: 0;
}
</style>