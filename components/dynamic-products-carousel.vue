<template>
  <div>
    <section class="max-w-full mx-auto">
      <div class="flex items-center justify-center mb-0 md:mb-3">
        <div class="w-1/12 h-1 border-t-2 border-gray-700 dark:border-gray-100"></div>
        <span class="mx-4 title title-font">{{ title }}</span>
        <div class="w-1/12 h-1 border-t-2 border-gray-700 dark:border-gray-100"></div>
      </div>

      <ClientOnly>
        <!-- skeleton-loader -->
        <Carousel v-if="loading || filteredProducts.length === 0" v-bind="config">
          <Slide v-for="i in 5" :key="i">
            <div class="px-2 carousel__item">
              <skeleton-loader type="rectangle" :css-class="'w-full bg-gray-200 dark:bg-gray-700 rounded-lg'">
                <div class="relative p-2 space-y-4">
                  <div class="w-full h-[200px] sm:h-[300px] bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse">
                  </div>

                  <div class="absolute w-11/12 mx-auto space-y-3 end-0 start-0 bottom-2">
                    <div class="w-3/4 h-4 mx-auto bg-gray-400 rounded dark:bg-gray-500"></div>
                    <div class="flex items-center justify-center space-x-2">
                      <div class="w-1/4 h-4 bg-gray-400 rounded dark:bg-gray-500"></div>
                      <div class="w-1/5 h-3 bg-gray-400 rounded dark:bg-gray-500"></div>
                    </div>
                    <div class="flex justify-center mt-4 space-x-1 max-sm:hidden">
                      <div class="w-4 h-4 bg-gray-400 rounded-full dark:bg-gray-500"></div>
                      <div class="w-4 h-4 bg-gray-400 rounded-full dark:bg-gray-500"></div>
                      <div class="w-4 h-4 bg-gray-400 rounded-full dark:bg-gray-500"></div>
                    </div>
                  </div>
                </div>
              </skeleton-loader>
            </div>
          </Slide>
          <template #addons>
            <Navigation />
          </template>
        </Carousel>

        <Carousel v-bind="config" v-else>
          <Slide v-for="card in filteredProducts" :key="card.id">
            <div class="carousel__item">
              <nuxt-link-locale :to="`/products/${card.id}`">
                <div
                  class="relative z-50 p-2 overflow-hidden bg-gray-100 rounded-lg cursor-pointer group hover:before:bg-black before:absolute before:inset-0 before:opacity-20 before:transition-all dark:bg-gray-800">
                  <div class="w-full h-[200px] sm:h-[300px] overflow-hidden mx-auto">
                    <img :src="card.imageUrl1" alt="product-card" class="object-cover object-center w-full h-full" />
                  </div>
                  <div
                    class="absolute w-11/12 p-2 mx-auto transition-all duration-300 rounded-lg end-0 start-0 bottom-2 lg:-bottom-80 lg:group-hover:bottom-2 bg-black/60 lg:bg-white lg:p-3 dark:bg-gray-600">
                    <div class="text-center">
                      <h3
                        class="text-sm font-bold text-white lg:text-base lg:text-gray-800 dark:text-gray-200 dark:lg:text-gray-300 sm:truncate md:text-ellipsis">
                        {{ $i18n.locale === 'ar' ? card.titleAr :
                          card.title }}</h3>
                      <div class="flex items-center justify-center mt-2 space-s-2">
                        <h4 class="font-bold text-red-700 sm:text-base dark:text-red-400 lg:text-2xl">{{
                          $n(parseFloat(card.discountedPrice), 'currency', currencyLocale) }}</h4>
                        <h4
                          class="text-gray-500 line-through sm:text-base dark:text-gray-100 mt-0.5 decoration-from-font"
                          v-if="card.originalPrice">{{ $n(parseFloat(card.originalPrice), 'currency', currencyLocale) }}
                        </h4>
                      </div>
                    </div>
                    <div class="flex justify-center mt-4 max-sm:hidden">
                      <!-- ratings component -->
                      <ratings @ratingSelected="handleRating" :productId="card.id" />
                    </div>
                  </div>
                </div>
              </nuxt-link-locale>
            </div>
          </Slide>

          <template #addons>
            <Navigation />
          </template>
        </Carousel>
      </ClientOnly>

      <div class="flex flex-col items-center pb-2 mt-4 space-y-2 bg-home/40 md:pb-4 md:space-y-4 sm:mt-5 md:mt-7"
        v-if="imageSrc">
        <div class="relative w-full">
          <div class="w-full h-auto overflow-hidden shadow-md aspect-video">
            <img :src="imageSrc" alt="img" loading="lazy"
              class="object-cover object-center w-full h-full transition-transform duration-300 hover:scale-105">
          </div>
        </div>
      </div>

      <div class="max-w-2xl mx-auto my-2 lg:max-w-full sm:my-5 md:my-7">
        <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 lg:grid-cols-2 xl:gap-x-8">
          <nuxt-link-locale v-for="card in cardsOne" :key="card"
            :to="{ path: '/products', query: { brand: card.brand } }"
            class="relative h-full transition-transform duration-300 border shadow-md group hover:scale-105 dark:border-none">
            <div
              class="block max-w-full bg-white xs:min-w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[600px]">
              <img :src="card.img" class="object-cover w-full h-full" />
            </div>
            <div
              class="absolute bottom-0 w-full p-4 text-center transform -translate-x-1/2 translate-y-0 bg-black bg-opacity-50 left-1/2">
              <h2 class="mt-2 mb-4 text-xl font-semibold text-white">{{ card.title }}</h2>
              <p class="text-base font-semibold text-gray-200">{{ card.subtitle }}</p>
            </div>
          </nuxt-link-locale>
        </div>
      </div>
    </section>
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
  },
  productId: String,
});

const productsStore = useProductsStore()
const products = ref([])
const filteredProducts = ref([])
const loading = ref(true)

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
  setTimeout(() => {
    loading.value = false
  }, 3000)
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

//ratings
const productStore = useProductsStore()

const handleRating = (rating) => {
  productStore.updateProductRating(props.productId, rating);
};

//currency composable
const { currencyLocale } = useCurrencyLocale();
</script>