<template>
  <div>
    <div class="mt-4">
      <!-- breadcrumb component -->
      <breadcrumb />
    </div>

    <div class="max-w-4xl p-6 mx-auto my-10 bg-white dark:bg-[#181a1b] rounded-lg shadow-lg" id="Ship-IT">
      <!-- Skeleton Loader -->
      <div class="space-y-8 animate-pulse" v-if="loading">
        <div class="flex items-center justify-between mb-12">
          <div class="space-y-4">
            <div class="w-48 h-8 bg-gray-200 rounded dark:bg-gray-700"></div>
            <div class="w-64 h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
          </div>
          <div class="w-12 h-12 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div v-for="n in 2" :key="n" class="pb-6 mb-6 space-y-6 border-b">
          <div class="grid grid-cols-12 gap-6">
            <div class="col-span-2">
              <div class="w-full h-24 bg-gray-200 rounded-lg dark:bg-gray-700"></div>
            </div>
            <div class="col-span-10 space-y-4">
              <div class="w-3/4 h-6 bg-gray-200 rounded dark:bg-gray-700"></div>
              <div class="w-1/2 h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
              <div class="w-1/3 h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
            </div>
          </div>
        </div>
        <div v-for="n in 4" :key="n" class="grid grid-cols-12 gap-6 pb-6 mb-6 border-b">
          <div class="col-span-8">
            <div class="w-1/3 h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
          </div>
          <div class="col-span-4">
            <div class="float-right w-1/2 h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
          </div>
        </div>
      </div>

      <div class="p-4 rounded-lg shadow-md dark:border dark:border-gray-100" v-else>
        <!-- Order Number -->
        <div class="flex items-center justify-between mb-12">
          <div>
            <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-200">{{ $t('order_summary.order_summary') }}
            </h2>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-100">
              {{ $t('order_summary.order_number') }} <span class="font-semibold text-gray-900 dark:text-gray-200">{{
                orderId }}</span>
            </p>
          </div>

          <tooltip :text="$t('tooltip.download_pdf')" position="bottom">
            <button @click="downloadPDF"
              class="flex items-center px-4 py-4 text-blue-700 border border-blue-400 rounded-full dark:text-blue-700 dark:border-blue-400 hover:bg-blue-100">
              <icon name="svg-spinners:270-ring-with-bg" class="w-5 h-5" v-if="pdfLoading" />
              <icon name="icon-park:printer" class="w-5 h-5" v-else />
            </button>
          </tooltip>
        </div>

        <!-- Product Details -->
        <div class="grid grid-cols-12 gap-6 pb-6 mb-6 border-b" v-for="item in storedCart" :key="item">
          <div class="col-span-2">
            <img :src="item.imageUrl1" class="w-full h-auto rounded-lg shadow-md" />
          </div>
          <div class="col-span-10">
            <p class="text-lg font-semibold text-gray-900 dark:text-gray-200">{{ $i18n.locale ===
              'ar' ? item.titleAr :
              item.title }}</p>
            <p class="text-sm font-semibold text-gray-700 dark:text-gray-100"><span class="font-medium me-1">{{
              $t('order_summary.brand') }} </span>{{
                  $i18n.locale ===
                    'ar' ? item.brandAr :
                    item.brand }}</p>
            <p class="mt-8 text-sm font-semibold text-blue-700 dark:text-blue-400"><span
                class="text-gray-700 me-1 dark:text-gray-100">{{
                  $t('order_summary.quantity') }}
              </span>{{
                item.quantity }}</p>
          </div>
        </div>

        <!-- Subtotal Section -->
        <div class="grid grid-cols-12 gap-6 pb-6 mb-6 border-b">
          <div class="col-span-8">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-100">{{ $t('order_summary.subtotal') }}</dt>
          </div>
          <div class="col-span-4 text-end">
            <dd class="text-sm font-medium text-gray-900 dark:text-gray-200">{{ $n(parseFloat(subTotalAmount),
              'currency', currencyLocale) }}</dd>
          </div>
        </div>

        <!-- Savings Section -->
        <div class="grid grid-cols-12 gap-6 pb-6 mb-6 border-b">
          <div class="col-span-8">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-100">{{ $t('order_summary.savings') }}</dt>
          </div>
          <div class="col-span-4 text-end">
            <dd class="text-sm font-medium text-green-500 dark:text-gray-200">%{{ averageDiscount }}</dd>
          </div>
        </div>

        <!-- Store Pickup Section -->
        <div class="grid grid-cols-12 gap-6 pb-6 mb-6 border-b">
          <div class="col-span-8">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-100">{{ $t('order_summary.store_pickup') }}</dt>
          </div>
          <div class="col-span-4 text-end">
            <dd class="text-sm font-medium text-gray-900 dark:text-gray-200">{{ $t('products.15_00') }} {{
              $t('products.egp') }}</dd>
          </div>
        </div>

        <!-- Tax Section -->
        <div class="grid grid-cols-12 gap-6 pb-6 mb-6 border-b">
          <div class="col-span-8">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-100">{{ $t('order_summary.tax') }}</dt>
          </div>
          <div class="col-span-4 text-end">
            <dd class="text-sm font-medium text-gray-900 dark:text-gray-200">{{ $t('products.12_00') }} {{
              $t('products.egp') }}</dd>
          </div>
        </div>

        <!-- Total Section -->
        <div class="grid grid-cols-12 gap-6">
          <div class="col-span-8 font-semibold text-gray-900 dark:text-gray-200">
            <dt class="text-xl">{{ $t('order_summary.total') }}</dt>
          </div>
          <div class="col-span-4 text-end">
            <dd class="text-xl font-semibold text-gray-900 dark:text-gray-200">{{ $n(parseFloat(totalAmount),
              'currency', currencyLocale) }}</dd>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const checkoutStore = useCheckoutStore();
const loading = ref(true)

const orderId = checkoutStore.generateOrderId();

const subTotalAmount = computed(() => {
  return storedCart.value.reduce((total, item) => {
    return total + (parseFloat(item.discountedPrice) * item.quantity);
  }, 0).toFixed(2);
});

const totalDiscount = computed(() => {
  return storedCart.value.reduce((total, item) => {
    const discount = parseFloat(item.discount);
    const quantity = item.quantity;
    if (isNaN(discount) || isNaN(quantity)) {
      // console.error('Invalid discount or quantity', item);
      return total;
    }
    return total + (discount * quantity);
  }, 0);
});

const averageDiscount = computed(() => {
  const totalItems = storedCart.value.reduce((total, item) => total + item.quantity, 0);
  if (totalItems > 0) {
    return (totalDiscount.value / totalItems).toFixed(2);
  } else {
    return 0;
  }
});

const totalAmount = computed(() => {
  const subtotal = parseFloat(subTotalAmount.value);
  const discount = parseFloat(averageDiscount.value) || 0;
  const savingsAmount = (subtotal * (discount / 100));
  const storePickup = 25;
  const tax = 18;
  const total = subtotal - savingsAmount + storePickup + tax;
  return total.toFixed(2);
});

const storedCart = ref([]);

onMounted(() => {
  const savedCart = localStorage.getItem('order-summary');
  if (savedCart) {
    storedCart.value = JSON.parse(savedCart);
    // console.log('cart data', storedCart.value)
  }
  setTimeout(() => {
    loading.value = false
  }, 3000)
});

// pdf file
const pdfLoading = ref(false);

const downloadPDF = async () => {
  const html2pdf = useNuxtApp().$html2pdf;
  if (html2pdf) {
    pdfLoading.value = true;
    await preloadImages();
    setTimeout(() => {
      const orderSummary = document.getElementById('Ship-IT');
      const pdfContent = orderSummary.cloneNode(true);
      // Replace Firebase URLs with data URLs
      replaceFirebaseUrlsWithDataUrls(pdfContent);
      const downloadButton = pdfContent.querySelector('button');
      if (downloadButton) {
        downloadButton.remove();
      }
      const titleElement = document.createElement('h1');
      titleElement.textContent = 'Ship-IT';
      titleElement.className = 'text-5xl font-bold text-blue-700 text-center mb-10';
      pdfContent.prepend(titleElement);
      const options = {
        margin: 10,
        filename: 'Ship-IT.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 4,
          useCORS: true,
          logging: true
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      };
      html2pdf().from(pdfContent).set(options).save();
      pdfLoading.value = false;
    }, 3000)
  }
};

const preloadImages = () => {
  return Promise.all(
    Array.from(document.querySelectorAll('img'))
      .map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });
      })
  );
};

const replaceFirebaseUrlsWithDataUrls = async (element) => {
  const images = element.querySelectorAll('img');
  return Promise.all(Array.from(images).map(async (img) => {
    try {
      const response = await fetch(img.src);
      const blob = await response.blob();
      const dataUrl = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
      img.src = dataUrl;
    } catch (error) {
      console.error('Error converting image:', error);
      img.remove();
    }
  }));
};

//currency composable
const { currencyLocale } = useCurrencyLocale();

const { t } = useI18n()

useHead({
  titleTemplate: () => t("head.order_summary"),
});
</script>