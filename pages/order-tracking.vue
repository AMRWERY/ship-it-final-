<template>
  <div>
    <div class="max-w-xl p-2">
      <h1 class="text-3xl font-semibold text-center">Order history</h1>
    </div>
    
    <div class="flex items-center flex-1 h-full">
      <div class="flex-1 w-full mt-5 text-center" v-if="!showOrders">
        <icon name="streamline:interface-file-clipboard-work-plain-clipboard-task-list-company-office"
          class="w-12 h-12 mx-auto text-gray-400 dark:text-gray-100" />
        <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-gray-200">You do not have any orders yet!</h3>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-100">What are you waiting for? </p>
        <div class="mt-6">
          <nuxt-link to="/products" type="button"
            class="inline-flex items-center justify-center px-4 py-2 btn-style">Start
            Shopping</nuxt-link>
        </div>
      </div>
    </div>

    <div class="max-w-6xl px-4 py-12 mx-auto sm:px-6 lg:px-8" v-if="showOrders" v-for="order in checkoutStore.orders"
      :key="order">
      <!-- Order Details -->
      <div class="p-6 mb-8 rounded-lg shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-100">Order Number</p>
            <p class="text-lg font-semibold text-gray-800 dark:text-gray-200">{{ order.orderId }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-100">Order Date</p>
            <p class="text-lg font-semibold text-gray-800 dark:text-gray-200">{{ order.date }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-100">Estimated Delivery</p>
            <p class="text-lg font-semibold text-gray-800 dark:text-gray-200">{{ order.estimatedDelivery }}</p>
          </div>
        </div>
      </div>

      <!-- Progress Tracker -->
      <div class="p-6 rounded-lg shadow">
        <h2 class="mb-6 text-xl font-semibold text-gray-800 dark:text-gray-200">Order Status</h2>
        <div v-if="isOrderCompleted(order.statusId)" class="p-4 mb-8 bg-green-100 rounded">
          <p class="text-lg font-semibold text-green-800 dark:text-green-500">This order is completed.</p>
        </div>

        <div class="relative">
          <div class="absolute inset-0 flex items-center justify-between h-2 bg-gray-200 rounded-full">
            <div v-for="(status, index) in checkoutStore.status" :key="status.id" :class="[
              calculateWidthClass(order.statusId, index),
              'h-2',
              'bg-black',
              'rounded-full',
            ]">
            </div>
          </div>

          <div class="relative z-10 flex justify-between">
            <div v-for="(status, index) in checkoutStore.status" :key="status.id" class="relative text-center">
              <!-- Icon for each step -->
              <div
                class="absolute flex items-center justify-center w-8 h-8 mx-auto font-bold text-white transform -translate-x-1/2 bg-black rounded-full left-1/2 -top-4"
                :class="{
                  'bg-black': order.statusId === status.id,
                  'bg-gray-300 text-gray-600 dark:bg-gray-100 dark:text-black': order.statusId !== status.id
                }">
                <icon :name="currentStatusIcon(status.id)" />
              </div>

              <!-- Status Name -->
              <div class="mt-6">
                <p class="mt-2 text-sm text-gray-800 dark:text-gray-200">{{ status.status }}</p>
                <p v-if="order.statusId === status.id" class="text-xs text-gray-500 dark:text-gray-100">{{ order.date }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Order Items -->
      <div class="p-6 mt-8 rounded-lg shadow">
        <h2 class="mb-6 text-xl font-semibold text-gray-800 dark:text-gray-200">Order Items</h2>
        <div class="space-y-8" v-if="order.cart && Array.isArray(order.cart) && order.cart.length > 0">
          <div class="flex items-center" v-for="item in order.cart" :key="item">
            <div class="w-20 h-20 overflow-hidden bg-gray-100 rounded-lg">
              <img :src="item.imageUrl1" alt="placeholder" class="object-cover w-full h-full">
            </div>
            <div class="ms-5">
              <p class="text-lg font-medium text-gray-800 dark:text-gray-200">{{ item.title }}</p>
              <p class="mt-1 text-sm text-gray-600 dark:text-gray-100">Brand: {{ item.brand }}</p>
              <p class="mt-1 text-sm text-gray-600 dark:text-gray-100">Discount: {{ item.discount }}%</p>
              <p class="text-sm text-gray-600 dark:text-gray-100">Qty: {{ item.quantity }}</p>
            </div>
            <div class="mt-1 text-lg font-medium text-gray-800 dark:text-gray-200 ms-auto">${{ item.discountedPrice }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const checkoutStore = useCheckoutStore();
const showOrders = ref(false);

onMounted(() => {
  checkoutStore.fetchUserOrders();
  showOrders.value = checkoutStore.orders.length > 0;
  if (checkoutStore.status.length === 0) {
    checkoutStore.fetchStatus();
  }
});

const currentStatusIcon = (statusId) => {
  switch (statusId) {
    case checkoutStore.status[0]?.id:
      return "material-symbols:shopping-basket-sharp";
    case checkoutStore.status[1]?.id:
      return "ic:baseline-access-time-filled";
    case checkoutStore.status[2]?.id:
      return "tabler:ship";
    case checkoutStore.status[3]?.id:
      return "material-symbols:local-shipping-rounded";
    case checkoutStore.status[4]?.id:
      return "hugeicons:package-delivered";
    default:
      return "mdi:alert-circle";
  }
};

const calculateWidthClass = (statusId, index) => {
  const progressLevels = ['w-full', 'w-4/5', 'w-3/5', 'w-2/5', 'w-1/5', 'w-1/12'];
  const currentIndex = checkoutStore.status.findIndex((s) => s.id === statusId);
  return currentIndex >= index ? progressLevels[index] : 'w-1/12';
};

const isOrderCompleted = (statusId) => {
  const deliveredStatus = checkoutStore.status.find((s) => s.status === "Delivered")?.id;
  return statusId === deliveredStatus;
};
</script>