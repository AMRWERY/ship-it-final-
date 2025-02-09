<template>
  <div>
    <div class="lg:col-span-3">
      <p class="py-4 text-xl font-semibold text-gray-900 capitalize hover:text-gray-800">You may also like</p>
      <div class="flow-root mt-8">
        <div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 sm:gap-6">
          <nuxt-link v-for="product in recommendedProducts" :key="product.id" :to="`/products/${product.id}`"
            class="relative z-50 p-3 overflow-hidden bg-gray-100 rounded-lg cursor-pointer group hover:before:bg-black before:absolute before:inset-0 before:opacity-20 before:transition-all">
            <div class="w-full h-[200px] sm:h-[300px] overflow-hidden mx-auto">
              <img :src="product.imageUrl1" alt="product1" class="object-contain w-full h-full" />
            </div>

            <div
              class="absolute left-0 right-0 w-11/12 p-2 mx-auto transition-all duration-300 rounded-lg bottom-2 lg:-bottom-80 lg:group-hover:bottom-2 bg-black/60 lg:bg-white lg:p-3">
              <div class="text-center">
                <h3 class="text-sm font-bold text-white lg:text-base lg:text-gray-800">{{ product.title }}</h3>
                <h4 class="mt-2 text-sm font-bold text-blue-600 lg:text-base">{{ product.discountedPrice }} egp</h4>
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const productsStore = useProductsStore();

const recommendedProducts = computed(() => {
  const selected = productsStore.selectedProduct;
  if (selected && selected.brand) {
    return productsStore.products
      .filter(
        product =>
          product.brand === selected.brand &&
          product.id !== selected.id
      )
      .slice(0, 4);
  }
  return [];
});
</script>