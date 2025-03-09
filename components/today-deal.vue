<template>
  <div>
    <!-- Button to open the dialog -->
    <div class="h-8 bg-[#4f46e5] text-white">
      <nuxt-link to="" type="button"
        class="flex items-center justify-center py-1 text-sm capitalize cursor-pointer sm:text-medium md:text-lg"
        @click="openDialog">{{
          $t('home.get_free_delivery_on_orders_over_egp1000') }}</nuxt-link>
    </div>

    <!-- Dialog Overlay and Container -->
    <transition name="fade">
      <div v-if="isDialogOpen"
        class="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-xl shadow-2xl border-double border-2 z-[1050] h-[80vh] w-max overflow-y-auto overflow-x-hidden outline-none custom-scroll max-w-full">
        <div class="bg-gray-50 dark:bg-[#181a1b] p-4">
          <div class="relative">
            <div class="font-sans tracking-wide max-md:mx-auto">
              <div class="font-[sans-serif]">
                <div class="max-w-xl mx-auto lg:max-w-6xl">
                  <!-- no deals available -->
                  <div v-if="!currentDeal">
                    <p class="text-3xl font-semibold text-center text-gray-600 dark:text-gray-100">No deals available
                      right now</p>
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
                          <img :src="selectedImage" class="w-full aspect-[11/8] object-cover object-center h-[450px]" />
                          <button @click="closeDialog"
                            class="absolute top-2 right-2 p-1.5 sm:hidden bg-white/80 dark:bg-gray-800/80 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors">
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
                            {{ currentDeal?.title }}
                          </h3>
                          <button @click="closeDialog"
                            class="flex items-center justify-center p-2 text-gray-600 border border-gray-300 rounded-full hover:text-gray-900 dark:text-gray-300 dark:hover:text-white max-sm:hidden">
                            <icon name="material-symbols:close-small" />
                          </button>
                        </div>
                        <p class="mt-3 mb-4 text-sm">{{ currentDeal?.brand }}</p>

                        <div class="flex flex-wrap items-center gap-2 mt-4">
                          <p class="text-base text-gray-500 line-through dark:text-gray-100">{{
                            currentDeal?.originalPrice }} egp</p>
                          <h4 class="text-2xl font-bold text-purple-800 sm:text-3xl">{{ currentDeal?.discountedPrice
                          }}
                            egp</h4>
                          <div class="flex py-1.5 px-2 bg-purple-600 font-semibold !ms-4 rounded-lg">
                            <span class="text-sm text-white">save {{ currentDeal?.discount }}%</span>
                          </div>
                        </div>

                        <div class="flex items-center justify-around gap-5 mt-5">
                          <div v-for="(value, key) in currentDealTime" :key="key"
                            class="flex flex-col items-center space-y-2">
                            <div class="flex items-center justify-center w-10 h-10 border-2 rounded-full"
                              :class="`border-${key}`">
                              <span class="text-lg font-bold">{{ value }}</span>
                            </div>
                            <span class="text-sm capitalize">{{ key }}</span>
                          </div>
                        </div>
                      </div>

                      <hr class="my-6 border-gray-300" />

                      <div class="mt-4">
                        <h3 class="text-lg font-bold text-gray-800 dark:text-gray-200">Color</h3>
                        <div class="flex flex-wrap gap-2 mt-2">
                          <button type="button" v-for="color in currentDeal?.colors" :key="color"
                            class="flex items-center justify-center w-auto px-2 py-1 text-sm border border-gray-300 h-11 hover:border-blue-600 shrink-0">{{
                              color }}</button>
                        </div>
                      </div>

                      <div class="mt-4">
                        <h3 class="text-lg font-bold text-gray-800 dark:text-gray-200">Size</h3>
                        <div class="flex flex-wrap gap-2 mt-2">
                          <button type="button" v-for="size in currentDeal?.sizes" :key="size"
                            class="flex items-center justify-center w-auto px-2 py-1 text-sm border border-gray-300 h-11 hover:border-blue-600 shrink-0">{{
                              size }}</button>
                        </div>
                      </div>

                      <div class="mt-4">
                        <p class="text-sm">SKU: <span class="font-semibold">{{ currentDeal?.sku }}</span></p>
                      </div>

                      <div class="mt-4">
                        <div class="flex gap-2 items-center border border-gray-300 px-3 py-2.5 w-max">
                          <button type="button" class="text-black border-none outline-none" @click="decrementQuantity">
                            <icon name="ic:round-minus" class="w-2.5 h-2.5" />
                          </button>
                          <input type="number" placeholder="1"
                            class="flex items-center justify-center h-10 text-lg font-semibold text-gray-800 bg-transparent w-14"
                            v-model="quantity">
                          <button type="button" class="text-black border-none outline-none" @click="incrementQuantity">
                            <icon name="material-symbols:add" class="w-2.5 h-2.5" />
                          </button>
                        </div>

                        <div class="flex flex-wrap gap-4 mt-4">
                          <!-- Add to Cart -->
                          <button class="flex items-center justify-center gap-2 px-6 py-2 btn-style w-[60%]"
                            @click="handleAddToCart(currentDeal)">
                            <icon name="material-symbols:add-shopping-cart-sharp" class="w-5 h-5" />
                            <div class="flex items-center justify-center" v-if="loading">
                              <span class="text-center">{{ $t('btn.adding_to_cart') }}...</span>
                              <icon name="svg-spinners:270-ring-with-bg" class="w-5 h-5" />
                            </div>
                            <span v-else>{{ $t('btn.add_to_cart') }}</span>
                          </button>

                          <!-- Add to Wishlist -->
                          <button @click="toggleWishlist(currentDeal)"
                            class="flex items-center justify-center h-10 p-2 text-gray-700 border border-gray-300 dark:text-gray-200 w-11 hover:text-gray-50 hover:bg-black dark:hover:bg-gray-700">
                            <icon :name="isInWishlist ? 'clarity:heart-solid' : 'clarity:heart-line'" size="20px"
                              :class="isInWishlist ? 'bg-red-600' : ''" class="p-1 rounded-full" />
                          </button>

                          <!-- Success Message -->
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
                            <h3 class="text-lg font-bold text-gray-800 dark:text-gray-200">Description</h3>
                            <p class="mt-4 text-sm text-gray-600 dark:text-gray-100">{{ currentDeal?.description }}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Upcoming Deals Section -->
                  <div class="mt-12 border-t-2" v-if="currentDeal">
                    <h3 class="mt-4 text-lg font-bold text-gray-800 dark:text-gray-200">Upcoming Deals</h3>
                    <div class="grid grid-cols-2 gap-4 md:grid-cols-2 max-sm:justify-center gap-y-8 sm:gap-x-6">
                      <div class="flex items-center gap-6 overflow-hidden cursor-pointer max-sm:flex-col"
                        v-for="(deal, index) in nextDeals" :key="index">
                        <div class="w-24 h-24 overflow-hidden rounded-lg shrink-0">
                          <img :src="deal.imageUrl1" class="object-contain w-full h-full" />
                        </div>
                        <div class="max-sm:text-center">
                          <h3 class="text-sm font-bold text-gray-800 truncate sm:text-base dark:text-gray-200">{{
                            deal.title }}</h3>
                          <h4 class="mt-2 text-xs font-bold text-gray-700 dark:text-gray-200">{{ deal.brand }}</h4>
                          <h4 class="mt-2 text-xs font-bold text-gray-700 dark:text-gray-200">Save {{ deal.discount
                          }}%
                          </h4>
                          <h4 class="mt-2 text-sm font-bold text-blue-600 dark:text-blue-400">{{ deal.discountedPrice
                          }}
                            egp
                          </h4>
                          <h4 class="mt-2 text-sm font-normal text-red-600 dark:text-red-400">{{
                            formatRemainingTime(deal.remainingTime)
                          }}
                          </h4>
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
const nextDeals = computed(() => todayDealStore.nextDeals);

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

const updateNextDealsTimes = () => {
  nextDeals.value.forEach((deal) => {
    deal.remainingTime = calculateRemainingTime(deal.startTime);
  });
};

const updateNextDealStartTime = () => {
  if (!nextDeals.value || nextDeals.value.length === 0) {
    nextDealStartTime.value = null;
    return;
  }
  const nextDeal = nextDeals.value.find(
    (deal) => new Date(deal.startTime.seconds * 1000) > new Date()
  );
  nextDealStartTime.value = nextDeal
    ? calculateRemainingTime(nextDeal.startTime)
    : null;
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
        updateNextDealsTimes();
      }, 1000);
      updateCurrentDealTime();
      updateNextDealsTimes();
      updateNextDealStartTime();
      setInterval(() => {
        updateNextDealStartTime();
      }, 1000);
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

const cartStore = useCartStore();
const authStore = useAuthStore();
const wishlistStore = useWishlistStore();
const productAdded = ref('');
const notAuth = ref(false)
const productNotAdded = ref('')
const quantity = ref(1);
const loading = ref(false);

const handleAddToCart = async (currentDeal) => {
  if (!currentDeal) return;
  try {
    loading.value = true;
    await todayDealStore.addToCart(currentDeal, quantity.value || 1);
    productAdded.value = true;
    setTimeout(() => {
      productAdded.value = false;
    }, 3000);
  } catch (error) {
    if (error.message.includes('authenticated')) {
      notAuth.value = true;
      setTimeout(() => {
        notAuth.value = false;
      }, 3000);
    } else {
      productNotAdded.value = true;
      setTimeout(() => {
        productNotAdded.value = false;
      }, 3000);
    }
  } finally {
    loading.value = false;
  }
};

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
    wishlistStore.addToWishlist(
      currentDeal.id,
      currentDeal.title,
      currentDeal.discountedPrice,
      currentDeal.originalPrice,
      currentDeal.brand,
      currentDeal.imageUrl1,
    );
    setTimeout(() => {
      productAdded.value = "Product added to wishlist!";
    }, 3000);
  } catch (error) {
    setTimeout(() => {
      productNotAdded.value = "Failed add Product to wishlist!";
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