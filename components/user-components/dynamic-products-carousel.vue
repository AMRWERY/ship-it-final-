<template>
  <div>
    <section class="max-w-full mx-auto">
      <div class="flex items-center justify-center mt-8 mb-3">
        <div class="w-1/12 h-1 border-t-2 border-gray-700 dark:border-gray-100"></div>
        <span class="mx-4 title title-font">{{ title }}</span>
        <div class="w-1/12 h-1 border-t-2 border-gray-700 dark:border-gray-100"></div>
      </div>

      <!-- skeleton-loader component -->
      <skeleton-loader v-if="filteredProducts.length === 0" />

      <ClientOnly>
        <Carousel v-bind="config">
          <Slide v-for="card in filteredProducts" :key="card.id">
            <div class="carousel__item">
              <nuxt-link :to="`/products/${card.id}`">
                <div
                  class="relative z-50 p-2 overflow-hidden bg-gray-100 rounded-lg cursor-pointer group hover:before:bg-black before:absolute before:inset-0 before:opacity-20 before:transition-all dark:bg-gray-800">
                  <div class="w-full h-[200px] sm:h-[300px] overflow-hidden mx-auto">
                    <img :src="card.imageUrl1" alt="product-card" class="object-contain w-full h-full" />
                  </div>
                  <div
                    class="absolute w-11/12 p-2 mx-auto transition-all duration-300 rounded-lg end-0 start-0 bottom-2 lg:-bottom-80 lg:group-hover:bottom-2 bg-black/60 lg:bg-white lg:p-3 dark:bg-gray-600">
                    <div class="text-center">
                      <h3
                        class="text-sm font-bold text-white lg:text-base lg:text-gray-800 dark:text-gray-200 dark:lg:text-gray-300">
                        {{ card.title }}</h3>
                      <div class="flex items-center justify-center mt-2 space-s-2">
                        <h4 class="text-lg font-bold text-red-700 sm:text-base dark:text-red-400 lg:text-2xl">{{
                          card.discountedPrice }} egp</h4>
                        <h4 class="text-sm text-gray-500 line-through sm:text-base dark:text-gray-100 mt-0.5"
                          v-if="card.originalPrice">{{ card.originalPrice }} egp</h4>
                      </div>
                    </div>
                    <div class="flex justify-center mt-4 max-sm:hidden">
                      <!-- ratings component -->
                      <ratings @ratingSelected="handleRating" :productId="card.id" />
                    </div>
                  </div>
                </div>
              </nuxt-link>
            </div>
          </Slide>

          <template #addons>
            <Navigation />
          </template>
        </Carousel>
      </ClientOnly>

      <div class="flex flex-col items-center pb-2 mt-16 space-y-2 bg-home/40 md:pb-4 md:space-y-4" v-if="imageSrc">
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
            class="relative transition-transform duration-300 border rounded-lg shadow-md group hover:scale-105 dark:border-none">
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

//ratings
const productStore = useProductsStore()

const handleRating = (rating) => {
  productStore.updateProductRating(props.productId, rating);
};
</script>