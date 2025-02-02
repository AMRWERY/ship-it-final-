<template>
  <div>
    <div class="flex">
      <span v-for="star in 5" :key="star" @click="rateProduct(star)" class="cursor-pointer">
        <icon name="material-symbols:kid-star" aria-hidden="true" class="w-4 h-4" :class="{
          'text-yellow-300': star <= productRating,
          'text-gray-300': star > productRating
        }" />
      </span>
      <div class="flex space-s-2 ms-2">
        <span class="text-sm font-medium text-gray-900 dark:text-gray-200">
          {{ productRating }}
        </span>
        <span class="text-sm font-medium text-gray-500 dark:text-gray-100">
          ({{ productVotes }} votes)
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  productId: String,
});

const productsStore = useProductsStore();

watchEffect(() => {
  if (props.productId) {
    productsStore.fetchProductRating(props.productId);
  }
});

const productRating = computed(() => {
  const rating = Number(productsStore.productRatings[props.productId]?.rating || 0);
  return rating.toFixed(2);
});

const productVotes = computed(() =>
  productsStore.productRatings[props.productId]?.totalVotes || 0
);

const rateProduct = (rating) => {
  if (props.productId) {
    productsStore.updateProductRating(props.productId, rating);
  }
};
</script>