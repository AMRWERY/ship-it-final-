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
const route = useRoute();

const brandBanner = {
  Nike: {
    image: 'https://justfields.com/storage/projects/7M5rV059/active-wear.jpg',
    description: 'Browse a large selection of activewear and workout clothes. Find the best deals from top brands in the market. Explore the outside with confidence.',
  },
  Levis: {
    image: 'https://justfields.com/storage/projects/7M5rV059/kids-clothes.jpg',
    description: "Explore our best selection of kids' clothes. Buy fashionable fun baby wear from top brands. We believe that every kid needs this cool items list...",
  },
  New_Look: {
    image: 'https://justfields.com/storage/projects/7M5rV059/SunglassesSeason.jpg',
    description: "We have got a perfect pair of sunglasses for everyone's style. Getting your hands on the frame looks good on you has never been easier. See Your options...",
  },
  XD_Design: {
    image: 'https://justfields.com/storage/projects/7M5rV059/Accessories-and-Bags.jpg',
    description: "Complete your outfits with these extra-unique pieces from Top brands. Express yourself loud with your favorite one having all selection varieties and don’t forget to elevate your look with accessories.",
  },
  Ajooni: {
    image: 'https://justfields.com/storage/projects/7M5rV059/women-dresses-cover.jpg',
    description: "Make a fashion statement no matter the occasion by wearing one of these stylish dresses from our women's dresses collection - whether you're aiming for femininity, classiness, casualness, or extra chic-ness!",
  },
  Inc: {
    image: 'https://justfields.com/storage/projects/7M5rV059/Inc.jpg',
    description: "Equip yourself for winter with these coats, winter jackets, jumpers, leggings, pullovers, and other must-have cold-weather items to stay snug - and on a budget! Great Deal? OF COURSE YES.",
  },
  Shein: {
    image: 'https://justfields.com/storage/projects/7M5rV059/shein-collection-cover.jpg',
    description: "Explore an extensive selection of SHEIN clothing, shoes, bags, jewelry, and swimwear. Find your favorite looks and show the world your trendsetting style.",
  },
  Michael_kors: {
    image: 'https://justfields.com/storage/projects/7M5rV059/Michael_kors.jpg',
    description: "Boots have no limits! Whether you're looking for high or low, leather or rubber, chunky or sleek, We have it all. Look no further than Here! Find our stunning collection of women’s boots from the best brands around the world.",
  },
};

const currentBrand = computed(() => route.query.brand)
const brandName = ref("");

onMounted(() => {
  brandName.value = route.query.brand;
  if (brandName.value) {
    productStore.fetchProductsByBrand(brandName.value);
  } else {
    productStore.fetchProducts();
  }
})
</script>