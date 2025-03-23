<template>
  <div>
    <!-- dynamic banner -->
    <div class="flex flex-col items-center pb-2 space-y-2 shadow-md bg-home/40 md:pb-4 md:space-y-4"
      v-if="brandBanner[currentBrand]">
      <div class="relative w-full h-[100px] md:h-[180px] lg:h-[260px]">
        <canvas width="10" height="10"
          class="inset-0 object-contain object-center !absolute !object-cover !object-top w-full h-full">
        </canvas>
        <img :src="brandBanner[currentBrand].image" decoding="async" data-nimg="future-fill"
          class="!object-contain !object-center !w-full !h-full !object-cover !object-top w-full h-full img"
          loading="lazy" style="">
      </div>
      <p class="max-w-screen-lg px-4 text-center text-gray-900">{{ brandBanner[currentBrand].description }}</p>
    </div>

    <div class="mx-auto my-6 max-w-8xl">
      <div class="flex justify-between px-6">
        <p class="font-medium text-gray-700 dark:text-gray-200">1 - 1 {{ $t('products.pages_over_2_items_for') }} <span
            class="font-semibold text-blue-700 dark:text-blue-400">{{
              brandName }}</span></p>
        <div class="flex space-s-4">
          <icon name="mdi:square-rounded" class="text-gray-500 dark:text-gray-100" />
          <!-- Button to trigger the sidebar (Only visible on small screens) -->
          <icon name="material-symbols:filter-alt" class="text-gray-500 cursor-pointer dark:text-gray-100 lg:hidden"
            @click="openSidebar" />
        </div>
      </div>
      <!-- Row with 2 columns -->
      <div class="grid grid-cols-12 gap-6 px-6">
        <!-- First column (3/12) - Hidden on small screens, now contains filter options -->
        <div class="hidden col-span-12 lg:col-span-3 lg:block">
          <!-- Filter Options in the Sidebar (for large screens) -->
          <div class="p-6">
            <h3 class="mb-4 font-semibold text-gray-700 dark:text-gray-200">{{ $t('products.filter_options') }}</h3>
            <div class="space-y-5">
              <!-- Categories -->
              <div>
                <div class="flex items-center justify-between">
                  <h4 class="font-semibold text-gray-600 dark:text-gray-100">{{ $t('products.categories') }}</h4>
                  <button @click="toggleSection('categories')" class="text-gray-500 dark:text-gray-100">
                    <icon name="ic:baseline-minus" size="18px" v-if="isSectionOpen.categories" />
                    <icon name="material-symbols:add" size="18px" v-else />
                  </button>
                </div>
                <ul v-show="isSectionOpen.categories" class="mt-5 space-y-4 text-sm text-gray-600 dark:text-gray-100">
                  <li class="flex items-center space-s-2">
                    <input type="checkbox" id="totes" v-model="filters.categories" value="Totes"
                      class="text-gray-500 transition duration-150 ease-in-out form-checkbox checked:bg-gray-700 checked:border-transparent">
                    <label for="totes" class="cursor-pointer">Totes</label>
                  </li>
                  <li class="flex items-center space-s-2">
                    <input type="checkbox" id="backpacks" v-model="filters.categories" value="Backpacks"
                      class="text-gray-500 transition duration-150 ease-in-out form-checkbox checked:bg-gray-700 checked:border-transparent">
                    <label for="backpacks" class="cursor-pointer">Backpacks</label>
                  </li>
                  <li class="flex items-center space-s-2">
                    <input type="checkbox" id="travel-bags" v-model="filters.categories" value="Travel Bags"
                      class="text-gray-500 transition duration-150 ease-in-out form-checkbox checked:bg-gray-700 checked:border-transparent">
                    <label for="travel-bags" class="cursor-pointer">Travel Bags</label>
                  </li>
                  <li class="flex items-center space-s-2">
                    <input type="checkbox" id="hip-bags" v-model="filters.categories" value="Hip Bags"
                      class="text-gray-500 transition duration-150 ease-in-out form-checkbox checked:bg-gray-700 checked:border-transparent">
                    <label for="hip-bags" class="cursor-pointer">Hip Bags</label>
                  </li>
                  <li class="flex items-center space-s-2">
                    <input type="checkbox" id="laptop-sleeves" v-model="filters.categories" value="Laptop Sleeves"
                      class="text-gray-500 transition duration-150 ease-in-out form-checkbox checked:bg-gray-700 checked:border-transparent">
                    <label for="laptop-sleeves" class="cursor-pointer">Laptop Sleeves</label>
                  </li>
                </ul>
              </div>

              <!-- Color Filter -->
              <div>
                <div class="flex items-center justify-between">
                  <h4 class="font-semibold text-gray-600 dark:text-gray-100">{{ $t('products.color') }}</h4>
                  <button @click="toggleSection('colors')" class="text-gray-500 dark:text-gray-100">
                    <icon name="ic:baseline-minus" size="18px" v-if="isSectionOpen.colors" />
                    <icon name="material-symbols:add" size="18px" v-else />
                  </button>
                </div>
                <ul v-show="isSectionOpen.colors" class="mt-5 space-y-4 text-sm text-gray-600 dark:text-gray-100">
                  <li class="flex items-center space-s-2">
                    <input type="checkbox" id="red" v-model="filters.colors" value="Red"
                      class="text-gray-500 transition duration-150 ease-in-out form-checkbox checked:bg-gray-700 checked:border-transparent">
                    <label for="red" class="cursor-pointer">Red</label>
                  </li>
                  <li class="flex items-center space-s-2">
                    <input type="checkbox" id="blue" v-model="filters.colors" value="Blue"
                      class="text-gray-500 transition duration-150 ease-in-out form-checkbox checked:bg-gray-700 checked:border-transparent">
                    <label for="blue" class="cursor-pointer">Blue</label>
                  </li>
                  <li class="flex items-center space-s-2">
                    <input type="checkbox" id="green" v-model="filters.colors" value="Green"
                      class="text-gray-500 transition duration-150 ease-in-out form-checkbox checked:bg-gray-700 checked:border-transparent">
                    <label for="green" class="cursor-pointer">Green</label>
                  </li>
                  <li class="flex items-center space-s-2">
                    <input type="checkbox" id="black" v-model="filters.colors" value="Black"
                      class="text-gray-500 transition duration-150 ease-in-out form-checkbox checked:bg-gray-700 checked:border-transparent">
                    <label for="black" class="cursor-pointer">Black</label>
                  </li>
                </ul>
              </div>

              <!-- Size Filter -->
              <div>
                <div class="flex items-center justify-between">
                  <h4 class="font-semibold text-gray-600 dark:text-gray-100">{{ $t('products.size') }}</h4>
                  <button @click="toggleSection('sizes')" class="text-gray-500 dark:text-gray-100">
                    <icon name="ic:baseline-minus" size="18px" v-if="isSectionOpen.sizes" />
                    <icon name="material-symbols:add" size="18px" v-else />
                  </button>
                </div>
                <ul v-show="isSectionOpen.sizes" class="mt-5 space-y-4 text-sm text-gray-600 dark:text-gray-100">
                  <li class="flex items-center space-s-2">
                    <input type="checkbox" id="small" v-model="filters.sizes" value="Small"
                      class="text-gray-500 transition duration-150 ease-in-out form-checkbox checked:bg-gray-700 checked:border-transparent">
                    <label for="small" class="cursor-pointer">Small</label>
                  </li>
                  <li class="flex items-center space-s-2">
                    <input type="checkbox" id="medium" v-model="filters.sizes" value="Medium"
                      class="text-gray-500 transition duration-150 ease-in-out form-checkbox checked:bg-gray-700 checked:border-transparent">
                    <label for="medium" class="cursor-pointer">Medium</label>
                  </li>
                  <li class="flex items-center space-s-2">
                    <input type="checkbox" id="large" v-model="filters.sizes" value="Large"
                      class="text-gray-500 transition duration-150 ease-in-out form-checkbox checked:bg-gray-700 checked:border-transparent">
                    <label for="large" class="cursor-pointer">Large</label>
                  </li>
                  <li class="flex items-center space-s-2">
                    <input type="checkbox" id="extra-large" v-model="filters.sizes" value="Extra Large"
                      class="text-gray-500 transition duration-150 ease-in-out form-checkbox checked:bg-gray-700 checked:border-transparent">
                    <label for="extra-large" class="cursor-pointer">Extra Large</label>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Second column (9/12) -->
        <div class="col-span-12 lg:col-span-9">
          <!-- product-cards component -->
          <product-cards />

          <!-- pagination component -->
          <pagination-component />
        </div>
      </div>

      <!-- Sidebar that will slide in from the right on small screens -->
      <div v-if="isSidebarVisible"
        class="fixed inset-0 z-50 transition-all duration-300 ease-in-out bg-gray-600 bg-opacity-50">
        <div class="fixed top-0 w-64 h-full transition-transform transform bg-white shadow-lg dark:bg-[#181a1b] end-0"
          :class="isSidebarVisible ? 'translate-x-0' : 'translate-x-full'">
          <div class="p-4 space-y-5">
            <div class="flex justify-between">
              <h3 class="mb-4 font-semibold text-gray-700 dark:text-gray-200">{{ $t('products.filter_options') }}</h3>
              <icon name="material-symbols:close-small-outline" class="text-gray-500 cursor-pointer dark:text-gray-200"
                @click="closeSidebar" />
            </div>
            <!-- Categories -->
            <div>
              <div class="flex items-center justify-between">
                <h4 class="font-semibold text-gray-600 dark:text-gray-100">{{ $t('products.categories') }}</h4>
                <button @click="toggleSection('categories')" class="text-gray-500 dark:text-gray-100">
                  <icon name="ic:baseline-minus" size="18px" v-if="isSectionOpen.categories" />
                  <icon name="material-symbols:add" size="18px" v-else />
                </button>
              </div>
              <ul v-show="isSectionOpen.categories" class="mt-5 space-y-4 text-sm text-gray-600 dark:text-gray-100">
                <li class="flex items-center space-s-2">
                  <input type="checkbox" id="totes" v-model="filters.categories" value="Totes"
                    class="text-gray-500 transition duration-150 ease-in-out form-checkbox checked:bg-gray-700 checked:border-transparent">
                  <label for="totes" class="cursor-pointer">Totes</label>
                </li>
                <li class="flex items-center space-s-2">
                  <input type="checkbox" id="backpacks" v-model="filters.categories" value="Backpacks"
                    class="text-gray-500 transition duration-150 ease-in-out form-checkbox checked:bg-gray-700 checked:border-transparent">
                  <label for="backpacks" class="cursor-pointer">Backpacks</label>
                </li>
                <li class="flex items-center space-s-2">
                  <input type="checkbox" id="travel-bags" v-model="filters.categories" value="Travel Bags"
                    class="text-gray-500 transition duration-150 ease-in-out form-checkbox checked:bg-gray-700 checked:border-transparent">
                  <label for="travel-bags" class="cursor-pointer">Travel Bags</label>
                </li>
                <li class="flex items-center space-s-2">
                  <input type="checkbox" id="hip-bags" v-model="filters.categories" value="Hip Bags"
                    class="text-gray-500 transition duration-150 ease-in-out form-checkbox checked:bg-gray-700 checked:border-transparent">
                  <label for="hip-bags" class="cursor-pointer">Hip Bags</label>
                </li>
                <li class="flex items-center space-s-2">
                  <input type="checkbox" id="laptop-sleeves" v-model="filters.categories" value="Laptop Sleeves"
                    class="text-gray-500 transition duration-150 ease-in-out form-checkbox checked:bg-gray-700 checked:border-transparent">
                  <label for="laptop-sleeves" class="cursor-pointer">Laptop Sleeves</label>
                </li>
              </ul>
            </div>

            <!-- Color Filter -->
            <div>
              <div class="flex items-center justify-between">
                <h4 class="font-semibold text-gray-600 dark:text-gray-100">{{ $t('products.color') }}</h4>
                <button @click="toggleSection('colors')" class="text-gray-500 dark:text-gray-100">
                  <icon name="ic:baseline-minus" size="18px" v-if="isSectionOpen.colors" />
                  <icon name="material-symbols:add" size="18px" v-else />
                </button>
              </div>
              <ul v-show="isSectionOpen.colors" class="mt-5 space-y-4 text-sm text-gray-600 dark:text-gray-100">
                <li class="flex items-center space-s-2">
                  <input type="checkbox" id="red" v-model="filters.colors" value="Red"
                    class="text-gray-500 transition duration-150 ease-in-out form-checkbox checked:bg-gray-700 checked:border-transparent">
                  <label for="red" class="cursor-pointer">Red</label>
                </li>
                <li class="flex items-center space-s-2">
                  <input type="checkbox" id="blue" v-model="filters.colors" value="Blue"
                    class="text-gray-500 transition duration-150 ease-in-out form-checkbox checked:bg-gray-700 checked:border-transparent">
                  <label for="blue" class="cursor-pointer">Blue</label>
                </li>
                <li class="flex items-center space-s-2">
                  <input type="checkbox" id="green" v-model="filters.colors" value="Green"
                    class="text-gray-500 transition duration-150 ease-in-out form-checkbox checked:bg-gray-700 checked:border-transparent">
                  <label for="green" class="cursor-pointer">Green</label>
                </li>
                <li class="flex items-center space-s-2">
                  <input type="checkbox" id="black" v-model="filters.colors" value="Black"
                    class="text-gray-500 transition duration-150 ease-in-out form-checkbox checked:bg-gray-700 checked:border-transparent">
                  <label for="black" class="cursor-pointer">Black</label>
                </li>
              </ul>
            </div>

            <!-- Size Filter -->
            <div>
              <div class="flex items-center justify-between">
                <h4 class="font-semibold text-gray-600 dark:text-gray-100">{{ $t('products.size') }}</h4>
                <button @click="toggleSection('sizes')" class="text-gray-500 dark:text-gray-100">
                  <icon name="ic:baseline-minus" size="18px" v-if="isSectionOpen.sizes" />
                  <icon name="material-symbols:add" size="18px" v-else />
                </button>
              </div>
              <ul v-show="isSectionOpen.sizes" class="mt-5 space-y-4 text-sm text-gray-600 dark:text-gray-100">
                <li class="flex items-center space-s-2">
                  <input type="checkbox" id="small" v-model="filters.sizes" value="Small"
                    class="text-gray-500 transition duration-150 ease-in-out form-checkbox checked:bg-gray-700 checked:border-transparent">
                  <label for="small" class="cursor-pointer">Small</label>
                </li>
                <li class="flex items-center space-s-2">
                  <input type="checkbox" id="medium" v-model="filters.sizes" value="Medium"
                    class="text-gray-500 transition duration-150 ease-in-out form-checkbox checked:bg-gray-700 checked:border-transparent">
                  <label for="medium" class="cursor-pointer">Medium</label>
                </li>
                <li class="flex items-center space-s-2">
                  <input type="checkbox" id="large" v-model="filters.sizes" value="Large"
                    class="text-gray-500 transition duration-150 ease-in-out form-checkbox checked:bg-gray-700 checked:border-transparent">
                  <label for="large" class="cursor-pointer">Large</label>
                </li>
                <li class="flex items-center space-s-2">
                  <input type="checkbox" id="extra-large" v-model="filters.sizes" value="Extra Large"
                    class="text-gray-500 transition duration-150 ease-in-out form-checkbox checked:bg-gray-700 checked:border-transparent">
                  <label for="extra-large" class="cursor-pointer">Extra Large</label>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { t, locale } = useI18n()

const isSectionOpen = ref({
  categories: true,
  colors: false,
  sizes: false,
});

// Filters state
const filters = ref({
  categories: [],
  colors: [],
  sizes: []
});

// Sidebar visibility
const isSidebarVisible = ref(false);

// Toggle section visibility
const toggleSection = (section) => {
  isSectionOpen.value[section] = !isSectionOpen.value[section];
};

// Open sidebar
const openSidebar = () => {
  isSidebarVisible.value = true;
};

// Close sidebar
const closeSidebar = () => {
  isSidebarVisible.value = false;
};

const productStore = useProductsStore()
const categoriesStore = useCategoriesStore()
const route = useRoute();

const brandBanner = computed(() => ({
  Nike: {
    image: 'https://justfields.com/storage/projects/7M5rV059/active-wear.jpg',
    description: t('products.browse_a_large_selection_of_activewear_and_workout_clothes_find_the_best_deals_from_top_brands_in_the_market_explore_the_outside_with_confidence'),
  },
  Levis: {
    image: 'https://justfields.com/storage/projects/7M5rV059/kids-clothes.jpg',
    description: t('products.explore_our_best_selection_of_kids_clothes_buy_fashionable_fun_baby_wear_from_top_brands_we_believe_that_every_kid_needs_this_cool_items_list'),
  },
  New_Look: {
    image: 'https://justfields.com/storage/projects/7M5rV059/SunglassesSeason.jpg',
    description: t('products.we_have_got_a_perfect_pair_of_sunglasses_for_everyones_style_getting_your_hands_on_the_frame_looks_good_on_you_has_never_been_easier_see_your_options'),
  },
  XD_Design: {
    image: 'https://justfields.com/storage/projects/7M5rV059/Accessories-and-Bags.jpg',
    description: t('products.complete_your_outfits_with_these_extra_unique_pieces_from_top_brands_express_yourself_loud_with_your_favorite_one_having_all_selection_varieties_and_do_not_forget_to_elevate_your_look_with_accessories'),
  },
  Ajooni: {
    image: 'https://justfields.com/storage/projects/7M5rV059/women-dresses-cover.jpg',
    description: t('products.make_a_fashion_statement_no_matter_the_occasion_by_wearing_one_of_these_stylish_dresses_from_our_women_dresses_collection—whether_you_are_aiming_for_femininity_classiness_casualness_or_extra_chic_ness'),
  },
  Inc: {
    image: 'https://justfields.com/storage/projects/7M5rV059/Inc.jpg',
    description: t('products.equip_yourself_for_winter_with_these_coats_winter_jackets_jumpers_leggings_pullovers_and_other_must_have_cold_weather_items_to_stay_snug_and_on_a_budget_great_deal_oF_course_yes'),
  },
  Shein: {
    image: 'https://justfields.com/storage/projects/7M5rV059/shein-collection-cover.jpg',
    description: t('products.explore_an_extensive_selection_of_shein_clothing_shoes_bags_jewelry_and_swimwear_find_your_favorite_looks_and_show_the_world_your_trendsetting_style'),
  },
  Michael_kors: {
    image: 'https://justfields.com/storage/projects/7M5rV059/Michael_kors.jpg',
    description: t('products.boots_have_no_limits_Whether_you_are_looking_for_high_or_low_leather_or_rubber_chunky_or_sleek_we_have_it_all_look_no_further_than_here_find_our_stunning_collection_of_women_boots_from_the_best_brands_around_the_world'),
  },
}));

const currentBrand = computed(() => route.query.brand)

const brandName = computed(() => {
  if (route.query.brand) {
    return route.query.brand.replace(/_/g, ' ');
  }

  if (route.query.categoryId) return locale.value === 'ar'
    ? route.query.titleAr
    : route.query.title;;
  return '';
});

onMounted(() => {
  if (route.query.brand) {
    productStore.fetchProductsByBrand(route.query.brand);
  }
  else if (route.query.catId) {
    categoriesStore.fetchCategoryById(route.query.catId);
    productStore.fetchProductsByCategory(route.query.catId);
  } else {
    productStore.fetchProducts();
  }
})

useHead({
  titleTemplate: () => brandName.value,
});
</script>