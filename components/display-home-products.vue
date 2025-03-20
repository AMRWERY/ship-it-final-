<template>
  <div>
    <div class="max-w-full py-0 mx-auto sm:px-6 lg:px-8 md:py-5">

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
    200: { itemsToShow: 1, snapAlign: 'center', wrapAround: true, transition: 400, breakpointMode: 'carousel' },
    400: { itemsToShow: 2, snapAlign: 'start', wrapAround: true, transition: 400, breakpointMode: 'carousel' },
    700: { itemsToShow: 2.5, snapAlign: 'center', wrapAround: true, transition: 400, breakpointMode: 'carousel' },
    1024: { itemsToShow: 3.5, snapAlign: 'start', wrapAround: true, transition: 400, breakpointMode: 'carousel' },
    1280: { itemsToShow: 4, snapAlign: 'start', wrapAround: true, transition: 400, breakpointMode: 'carousel' },
  },
};

const { t } = useI18n()

const cardsOne = computed(() => [
  { title: t('home.browse_this_extraordinary_womens_dresses_assortment'), subtitle: t('home.from_this_exceptional_assortment_choose_your_ideal_dress_and_be_whatever_you_desire'), brand: 'Ajooni', img: 'https://justfields.com/storage/projects/7M5rV059/035.jpg' },
  { title: t('home.shop_stylish_winter_wear_with_no_wallet_worries'), subtitle: t('home.find_great_winter_season_looks_without_worrying_about_your_wallet_all_within_your_budget'), brand: 'Inc', img: 'https://justfields.com/storage/projects/7M5rV059/036.jpg' },
]);

const cardsTwo = computed(() => [
  { title: t('home.unleash_the_fashionista_side_of_you_with_shein_products'), subtitle: t('home.explore_an_incredible_collection_of_trendy_clothing_at_amazing_prices'), brand: 'Shein', img: 'https://justfields.com/storage/projects/7M5rV059/01201.jpg' },
  { title: t('home.find_the_best_womens_Winter_boots_around'), subtitle: t('home.make_a_statement_with_our_stunning_selection_of_womens_boots_they_re_the_best'), brand: 'Michael_kors', img: 'https://justfields.com/storage/projects/7M5rV059/045454.jpg' },
]);
</script>