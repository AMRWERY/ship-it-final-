<template>
  <div>
    <!-- breadcrumb component -->
    <breadcrumb />

    <section class="py-8 mx-auto bg-white dark:bg-[#181a1b] md:py-16 max-w-7xl">
      <div class="grid grid-cols-12 gap-6">
        <div class="col-span-12 md:col-span-8">
          <ol class="flex items-center w-full max-w-2xl text-sm font-medium text-center text-gray-500 sm:text-base">
            <li :class="step === 1 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-100'"
              class="after:border-1 flex items-center after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
              <span class="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] sm:after:hidden">
                <icon name="material-symbols:check-circle-outline-rounded" class="w-4 h-4 me-2 sm:h-5 sm:w-5"
                  aria-hidden="true" />
                <span class="whitespace-nowrap">
                  {{ $t('checkout.checkout') }}
                </span>
              </span>
            </li>
            <li class="flex items-center shrink-0 "
              :class="step === 2 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-100'">
              <span class="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] sm:after:hidden">
                <icon name="material-symbols:check-circle-outline-rounded" class="w-4 h-4 me-2 sm:h-5 sm:w-5"
                  aria-hidden="true" />
              </span>
              <span class="whitespace-nowrap">
                {{ $t('checkout.payment_details') }}
              </span>
            </li>
          </ol>

          <!-- Stepper Content -->
          <transition name="fade">
            <div v-if="step === 1">
              <!-- Checkout Form -->
              <div class="mt-2 lg:flex lg:items-start lg:gap-12 xl:gap-16">
                <div class="flex-1 min-w-0 space-y-8">
                  <div class="space-y-4">
                    <h2 class="text-xl font-semibold text-gray-900">{{ $t('checkout.delivery_details')
                      }}</h2>
                    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <dynamic-inputs :label="t('form.name')" :placeholder="t('form.enter_your_name')" type="text"
                        name="cvv" :rules="'required|alpha_spaces'" :required="true"
                        prefixIcon="material-symbols:person" v-model="checkoutStore.deliveryDetails.name" />

                      <dynamic-inputs :label="t('form.email')" :placeholder="t('form.enter_your_email')" type="email"
                        name="email" :rules="'required'" :required="true" prefixIcon="material-symbols:alternate-email"
                        v-model="checkoutStore.deliveryDetails.email" />

                      <div>
                        <div class="flex items-center gap-2 mb-1">
                          <label for="country"
                            class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-100">{{
                              $t('form.country') }}</label>
                        </div>
                        <select id="country" name="country" autocomplete="country-name" v-model="selectedCountry"
                          class="w-full px-3 py-2 transition duration-300 bg-transparent border rounded-md shadow-sm pe-16 placeholder:text-slate-400 text-slate-700 dark:text-slate-200 border-slate-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 focus:shadow dark:placeholder:text-slate-200 ps-9">
                          <option v-for="country in countriesData" :key="country.country" :value="country.country"
                            class="bg-white dark:bg-[#181a1b] text-slate-700 dark:text-slate-200">
                            {{ country.country }}</option>
                        </select>
                      </div>

                      <div>
                        <div class="flex items-center gap-2 mb-1">
                          <label for="city" class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-100">{{
                            $t('form.city') }}</label>
                        </div>
                        <select id="city" name="city" autocomplete="city-name"
                          v-model="checkoutStore.deliveryDetails.city"
                          class="w-full px-3 py-2 transition duration-300 bg-transparent border rounded-md shadow-sm pe-16 placeholder:text-slate-400 text-slate-700 dark:text-slate-200 border-slate-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 focus:shadow dark:placeholder:text-slate-200 ps-9">
                          <option v-for="city in getCitiesForSelectedCountry" :key="city" :value="city"
                            class="bg-white dark:bg-[#181a1b] text-slate-700 dark:text-slate-200">
                            {{ city }}</option>
                        </select>
                      </div>

                      <div>
                        <label for="phone-input-3"
                          class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-100">
                          {{ $t('form.phone_number') }}
                        </label>
                        <div class="flex items-center">
                          <button id="dropdown-phone-button-3"
                            class="z-10 inline-flex shrink-0 items-center rounded-s-lg border border-gray-300 bg-gray-100 dark:bg-[#181a1b] px-4 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100"
                            type="button">
                            <img v-if="selectedCountryFlag" :src="selectedCountryFlag"
                              class="w-[19.5px] h-[14px] me-2" />
                            <span class="text-slate-700 dark:text-slate-200" v-if="selectedCallingCode">+{{
                              selectedCallingCode }}</span>
                            <icon name="material-symbols:keyboard-arrow-down-rounded"
                              class="-me-0.5 ms-2 h-5 w-5 dark:text-white" />
                          </button>
                          <div class="relative w-full">
                            <input type="text" id="phone-input" v-model="checkoutStore.deliveryDetails.phoneNumber"
                              class="z-20 w-full px-3 py-2 transition duration-300 bg-transparent border rounded-md shadow-sm pe-16 placeholder:text-slate-400 text-slate-700 dark:text-slate-200 border-slate-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 focus:shadow dark:placeholder:text-slate-200 ps-9"
                              placeholder="123-456-7890" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex items-center justify-end mt-6 gap-x-6">
                <button type="button" @click="goToPaymentForm"
                  class="items-center justify-center px-5 py-2.5 btn-style">{{
                    $t('btn.next') }}</button>
              </div>
            </div>
          </transition>

          <transition name="fade">
            <div v-if="step === 2">
              <!-- Payment Form -->
              <div class="mt-2 lg:flex lg:items-start lg:gap-12 xl:gap-16">
                <div class="flex-1 min-w-0 space-y-8">
                  <div class="space-y-4">
                    <h2 class="text-xl font-semibold text-gray-900">{{ $t('checkout.payment_details') }}
                    </h2>
                    <div class="grid grid-cols-2 gap-4 mb-6">
                      <dynamic-inputs :label="t('form.full_name_as_displayed_on_card')"
                        :placeholder="t('form.enter_full_name_as_displayed_on_card')" type="text"
                        name="full name on card" :rules="'required|alpha_spaces'" :required="true"
                        prefixIcon="material-symbols:person" v-model="checkoutStore.paymentDetails.fullNameOnCard" />

                      <dynamic-inputs :label="t('form.card_number')" placeholder="xxxx-xxxx-xxxx-xxxx" type="text"
                        name="card number" :rules="{ regex: /^\d{4}-\d{4}-\d{4}-\d{4}$/ }" :required="true"
                        prefixIcon="material-symbols:person" v-model="checkoutStore.paymentDetails.cardNumber" />

                      <div>
                        <div class="mt-4 sm:col-span-full">
                          <span class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-100">{{
                            $t('form.card_expiration') }} <span class="text-red-600">*</span></span>
                          <!-- date-picker componenet -->
                          <date-picker v-model="checkoutStore.paymentDetails.cardExpiration" />
                        </div>
                      </div>

                      <dynamic-inputs :label="t('form.cvv')" :placeholder="t('form.enter_cvv')" type="text" name="cvv"
                        :rules="'required|max:3'" :required="true" prefixIcon="material-symbols:person"
                        v-model="checkoutStore.paymentDetails.cvv" />
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex justify-end mt-6 space-s-3">
                <button @click="goBackToCheckout" type="button" class="px-4 py-2 text-white bg-gray-500 rounded-md">{{
                  $t('btn.back') }}</button>
                <button type="submit" :disabled="loading" @click="submitCheckoutForm"
                  class="items-center justify-center px-5 py-2.5 btn-style">
                  <div class="flex items-center justify-center" v-if="loading">
                    <span class="text-center me-2">{{ $t('btn.please_wait') }}...</span>
                    <icon name="svg-spinners:270-ring-with-bg" />
                  </div>
                  <span v-else>{{ $t('btn.pay_now') }}</span>
                </button>
              </div>
            </div>
          </transition>
          <div>
            <label for="voucher" class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-100">{{
              $t('checkout.enter_a_gift_card_voucher_or_promotional_code') }} </label>
            <div class="flex items-center max-w-md gap-4">
              <input type="text" id="voucher"
                class="w-full px-3 py-2 transition duration-300 bg-transparent border rounded-md shadow-sm placeholder:text-slate-400 text-slate-700 dark:text-slate-200 border-slate-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 focus:shadow dark:placeholder:text-slate-200"
                :placeholder="$t('checkout.enter_your_a_gift_card_voucher_or_promotional_code')" />
              <button type="button" class="flex items-center justify-center px-5 py-2.5 btn-style">{{
                $t('btn.apply') }}</button>
            </div>
          </div>
        </div>

        <div class="col-span-12 md:col-span-4">
          <div class="w-full mt-6 space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
            <div class="flow-root">
              <div class="-my-3 divide-y divide-gray-200">
                <dl class="flex items-center justify-between gap-4 py-3">
                  <dt class="text-base font-normal text-gray-500 dark:text-gray-100">{{ $t('checkout.subtotal') }}</dt>
                  <dd class="text-base font-medium text-gray-900 dark:text-gray-200">{{ $n(parseFloat(subTotalAmount) ||
                    0,
                    'currency', currencyLocale) }}</dd>
                </dl>
                <dl class="flex items-center justify-between gap-4 py-3">
                  <dt class="text-base font-normal text-gray-500 dark:text-gray-100">{{ $t('checkout.savings') }}</dt>
                  <dd class="text-base font-medium text-green-500 dark:text-gray-200">%{{ averageDiscount }}</dd>
                </dl>
                <dl class="flex items-center justify-between gap-4 py-3">
                  <dt class="text-base font-normal text-gray-500 dark:text-gray-100">{{ $t('checkout.store_pickup') }}
                  </dt>
                  <dd class="text-base font-medium text-gray-900 dark:text-gray-200">{{ $t('products.15_00') }} {{
                    $t('products.egp') }}</dd>
                </dl>
                <dl class="flex items-center justify-between gap-4 py-3">
                  <dt class="text-base font-normal text-gray-500 dark:text-gray-100">{{ $t('checkout.tax') }}</dt>
                  <dd class="text-base font-medium text-gray-900 dark:text-gray-200">{{ $t('products.12_00') }} {{
                    $t('products.egp') }}</dd>
                </dl>
                <dl class="flex items-center justify-between gap-4 py-3">
                  <dt class="text-base font-bold text-gray-900 dark:text-gray-200">{{ $t('checkout.total') }}</dt>
                  <dd class="text-base font-bold text-gray-900 dark:text-gray-200">{{ $n(parseFloat(totalAmount) || 0,
                    'currency', currencyLocale) }}</dd>
                </dl>
              </div>
            </div>

            <div class="space-y-3">
              <nuxt-link to="/order-summary" class="flex w-full items-center justify-center px-5 py-2.5 btn-style">{{
                $t('btn.place_order') }}</nuxt-link>
            </div>
          </div>

          <!-- <div class="flex items-center justify-center gap-8 mt-6">
              <img class="w-auto h-8"
                src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal.svg" />
              <img class="hidden w-auto h-8"
                src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal-dark.svg" />
              <img class="w-auto h-8"
                src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg" />
              <img class="hidden w-auto h-8"
                src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa-dark.svg" />
              <img class="w-auto h-8"
                src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard.svg" />
              <img class="hidden w-auto h-8"
                src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard-dark.svg" />
            </div> -->
        </div>
      </div>
    </section>

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
import dataBase from "@/assets/countries.json";

const countriesData = ref(dataBase);
const selectedCountry = ref(null);
const selectedCity = ref(null);
const selectedCallingCode = ref(null);
const selectedCountryFlag = ref(null);

watch(selectedCountry, (newCountry) => {
  const selected = countriesData.value.find(
    (country) => country.country === newCountry
  );
  selectedCallingCode.value = selected ? selected.calling_code : null;
  selectedCountryFlag.value = selected ? selected.flag_base64 : null;
  checkoutStore.deliveryDetails.country = newCountry;
  selectedCity.value = null;
});

const getCitiesForSelectedCountry = computed(() => {
  const selected = countriesData.value.find(
    (country) => country.country === selectedCountry.value
  );
  return selected ? selected.cities : [];
});

const cartStore = useCartStore();

const subTotalAmount = computed(() => {
  return cartStore.cart.reduce((total, item) => {
    return total + (parseFloat(item.discountedPrice) * item.quantity);
  }, 0).toFixed(2);
});

const totalDiscount = computed(() => {
  return cartStore.cart.reduce((total, item) => {
    return total + (parseFloat(item.discount) * item.quantity);
  }, 0);
});

const averageDiscount = computed(() => {
  const totalItems = cartStore.cart.reduce((total, item) => total + item.quantity, 0);
  return totalItems > 0 ? (totalDiscount.value / totalItems).toFixed(2) : 0;
});

const totalAmount = computed(() => {
  const subtotal = parseFloat(subTotalAmount.value);
  const savingsAmount = (subtotal * (parseFloat(averageDiscount.value) / 100));
  const storePickup = 25;
  const tax = 18;
  const total = subtotal - savingsAmount + storePickup + tax;
  return total.toFixed(2);
});

onMounted(() => {
  cartStore.fetchCart();
});

const { t } = useI18n()
const { showToast, toastMessage, toastType, toastIcon, triggerToast } = useToast();

const step = ref(1);
const loading = ref(false);

const checkoutStore = useCheckoutStore();

const goToPaymentForm = () => {
  step.value = 2;
};

const goBackToCheckout = () => {
  step.value = 1;
};

const submitCheckoutForm = () => {
  loading.value = true;
  const cartData = [...cartStore.cart];
  if (!cartData || cartData.length === 0) {
    loading.value = false;
    return;
  }
  new Promise(resolve => setTimeout(resolve, 3000))
    .then(() => {
      return checkoutStore.saveCheckoutData(cartData);
    })
    .then(() => {
      localStorage.setItem("order-summary", JSON.stringify(cartData));
      cartStore.clearCart();
    })
    .then(() => {
      triggerToast({
        message: t('toast.payment_successful'),
        type: 'success',
        icon: 'mdi-check-circle',
      });
    })
    .catch((error) => {
      console.error("Error during checkout:", error);
    })
    .finally(() => {
      loading.value = false;
    });
};

//currency composable
const { currencyLocale } = useCurrencyLocale();

useHead({
  titleTemplate: () => t("head.checkout"),
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

select {
  scrollbar-width: none;
}

select::-webkit-scrollbar {
  display: none;
}
</style>