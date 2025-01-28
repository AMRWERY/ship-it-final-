<template>
  <div>
    <div class="max-w-full py-6 mx-auto space-y-6 sm:px-6 lg:px-8">

      <!-- dynamic-products-carousel component -->
      <dynamic-products-carousel :config="config" :productTypes="['Express_Deals']" :title="$t('home.express_deals')"
        :imageSrc="'https://justfields.com/storage/projects/7M5rV059/ck_banner.webp'" />

      <!-- dynamic-products-carousel component -->
      <dynamic-products-carousel :config="config" :productTypes="['New_Arrival']" :title="$t('home.new_arrival')"
        :imageSrc="'https://justfields.com/storage/projects/7M5rV059/tommy.webp'" />

      <!-- dynamic-products-carousel component -->
      <dynamic-products-carousel :config="config" :productTypes="['Bundle']" :title="$t('home.wallet')"
        :cardsOne="cardsOne" />

      <!-- dynamic-products-carousel component -->
      <dynamic-products-carousel :config="config" :productTypes="['Sale']" :title="$t('home.kids_clothing')"
        :imageSrc="'https://justfields.com/storage/projects/7M5rV059/six-shop.jpg'" />

      <!-- dynamic-products-carousel component -->
      <dynamic-products-carousel :config="config" :productTypes="['Custom']" :title="$t('home.shoes')"
        :cardsOne="cardsTwo" />
    </div>
  </div>
</template>

<script setup>
const config = {
  itemsToShow: 5,
  gap: 5,
  breakpoints: {
    200: { itemsToShow: 1.5, snapAlign: 'center', wrapAround: true, transition: 400, breakpointMode: 'carousel' },
    400: { itemsToShow: 1.5, snapAlign: 'start', wrapAround: true, transition: 400, breakpointMode: 'carousel' },
    700: { itemsToShow: 2, snapAlign: 'center', wrapAround: true, transition: 400, breakpointMode: 'carousel' },
    1024: { itemsToShow: 2.5, snapAlign: 'start', wrapAround: true, transition: 400, breakpointMode: 'carousel' },
    1280: { itemsToShow: 4, snapAlign: 'start', wrapAround: true, transition: 400, breakpointMode: 'carousel' },
  },
};

const cardsOne = ref([
  { title: 'Browse this extraordinary Women’s dresses assortment', subtitle: 'From this exceptional assortment, choose your ideal dress and be whatever you desire!', brand: 'Ajooni', img: 'https://justfields.com/storage/projects/7M5rV059/035.jpg' },
  { title: 'Shop stylish winter wear with No wallet-worries', subtitle: 'Find great winter season looks without worrying about your wallet - All within your budget.', brand: 'Inc', img: 'https://justfields.com/storage/projects/7M5rV059/036.jpg' },
])

const cardsTwo = ref([
  { title: 'Unleash the fashionista side of you with SHEIN products', subtitle: 'Explore an incredible collection of trendy clothing at amazing prices', brand: 'Shein', img: 'https://justfields.com/storage/projects/7M5rV059/01201.jpg' },
  { title: "Find the Best Women's Winter Boots around", subtitle: "Make a statement with our stunning selection of women's boots, they're the best!", brand: 'Michael_kors', img: 'https://justfields.com/storage/projects/7M5rV059/045454.jpg' },
])
</script>