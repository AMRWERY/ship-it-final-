<template>
  <div>
    <div class="mb-6">
      <!-- breadcrumb component -->
      <breadcrumb />
    </div>

    <div class="max-w-xl p-2">
      <h1 class="text-3xl font-semibold text-center">{{ $t('profile.order_history') }}</h1>
    </div>

    <div class="flex items-center flex-1 h-full">
      <div class="flex-1 w-full mt-5 text-center" v-if="showOrders">
        <icon name="streamline:interface-file-clipboard-work-plain-clipboard-task-list-company-office"
          class="w-12 h-12 mx-auto text-gray-400 dark:text-gray-100" />
        <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-gray-200">{{
          $t('profile.you_do_not_have_any_orders_yet') }}</h3>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-100">{{ $t('profile.what_are_you_waiting_for') }}</p>
        <div class="mt-6">
          <nuxt-link-locale to="/products" type="button"
            class="inline-flex items-center justify-center px-4 py-2 btn-style">{{ $t('btn.start_shopping')
            }}</nuxt-link-locale>
        </div>
      </div>
    </div>

    <div class="max-w-6xl px-4 py-6 mx-auto border-b sm:px-6 lg:px-8 border-b-gray-400 dark:border-b-gray-50" v-if="!showOrders" v-for="order in checkoutStore.orders"
      :key="order">
      <!-- Order Details -->
      <div class="p-6 mb-8 rounded-lg bg-gradient-to-r from-gray-100 to-gray-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">{{ $t('profile.order_number') }}</p>
            <p class="text-lg font-semibold text-gray-800">{{ order.orderId }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-600">{{ $t('profile.order_date') }}</p>
            <p class="text-lg font-semibold text-gray-800">{{ order.date }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-600">{{ $t('profile.estimated_delivery') }}</p>
            <p class="text-lg font-semibold text-gray-800">{{ order.estimatedDelivery }}</p>
          </div>
        </div>
      </div>

      <!-- Progress Tracker -->
      <div class="p-6 rounded-lg shadow">
        <h2 class="mb-6 text-xl font-semibold text-gray-800 dark:text-gray-200">{{ $t('profile.order_status') }}</h2>
        <div v-if="isOrderCompleted(order.statusId)" class="p-4 mb-8 bg-green-100 rounded">
          <p class="text-lg font-semibold text-green-800 dark:text-green-500">{{ $t('profile.this_order_is_completed')
          }}</p>
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
                <p class="mt-2 text-sm text-gray-800 dark:text-gray-200">{{ $i18n.locale ===
                  'ar' ? status.statusAr : status.status }}</p>
                <p v-if="order.statusId === status.id" class="text-xs text-gray-500 dark:text-gray-100">{{ order.date }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Order Items -->
      <div class="p-6 mt-8 rounded-lg dark:shadow-lg dark:border-gray-100 dark:border">
        <h2 class="mb-6 text-xl font-semibold text-gray-800 dark:text-gray-200">{{ $t('profile.order_items') }}</h2>
        <div class="space-y-8" v-if="order.cart && Array.isArray(order.cart) && order.cart.length > 0">
          <div class="flex items-center" v-for="item in order.cart" :key="item">
            <div class="w-20 h-20 overflow-hidden bg-gray-100 rounded-lg">
              <img :src="item.imageUrl1" alt="placeholder" class="object-cover w-full h-full">
            </div>
            <div class="ms-5">
              <p class="text-lg font-medium text-gray-800 dark:text-gray-200">{{
                $i18n.locale === 'ar' ? item.titleAr : item.title }}</p>
              <p class="mt-1 text-sm text-gray-600 dark:text-gray-100">{{ $t('profile.brand') }} {{ $i18n.locale ===
                'ar' ? item.brandAr : item.brand }}</p>
              <p class="mt-1 text-sm text-gray-600 dark:text-gray-100">{{ $t('profile.discount') }} {{ item.discount }}%
              </p>
              <p class="text-sm text-gray-600 dark:text-gray-100">{{ $t('profile.qty') }} {{ item.quantity }}</p>
            </div>
            <div class="mt-1 text-lg font-medium text-gray-800 dark:text-gray-200 ms-auto">{{
              $n(parseFloat(item.discountedPrice) || 0, 'currency', currencyLocale) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n()
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

//currency composable
const { currencyLocale } = useCurrencyLocale();

useHead({
  titleTemplate: () => t("head.order_tracking"),
});
</script>