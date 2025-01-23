<template>
  <div>
    <div class="max-w-2xl px-8 py-6 mx-auto my-8 bg-white border rounded-lg">
      <h2 class="mb-4 text-2xl font-medium text-center">{{ $t('form.add_product')
        }}</h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="main-category" class="block mb-2 font-medium text-gray-700">{{ $t('form.category') }}</label>
          <select id="main-category" name="main-category" v-model="selectedCategory"
            class="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-400">
            <option value="" disabled>{{ $t('form.select_category') }}</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.title }}</option>
          </select>
        </div>

        <div class="mb-4">
          <label for="brand" class="block mb-2 font-medium text-gray-700">Brand</label>
          <input type="text" id="brand" name="brand" v-model="product.brand"
            class="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-400">
        </div>

        <div class="mb-4">
          <div class="mx-auto overflow-hidden rounded-lg">
            <div class="md:flex">
              <div class="w-full">
                <div
                  class="relative flex items-center justify-center h-48 bg-gray-100 border-2 border-blue-700 border-dashed border-dotted rounded-lg">
                  <div class="absolute">
                    <div class="flex flex-col items-center">
                      <icon name="material-symbols:add-photo-alternate" class="w-20 h-20 text-blue-700" />
                      <span class="block font-normal text-gray-400">{{ $t('form.attach_your_files_here') }}</span>
                    </div>
                  </div>
                  <input type="file" class="w-full h-full opacity-0" @change="handleImageUpload" multiple>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-center mb-4 space-s-6" v-if="previewImages.length > 0">
          <div v-for="(image, index) in previewImages" :key="index" class="mr-4">
            <img :src="image" class="w-48 h-32 rounded-lg" />
          </div>
        </div>
        <!-- <div class="flex items-center justify-center mb-4 space-s-6" v-if="previewImage">
          <img :src="previewImage" class="w-48 h-32 rounded-lg">
        </div> -->

        <div class="flex items-center justify-center mb-4 space-s-6">
          <div v-if="product.imgOne" class="mt-4 border border-gray-200">
            <img :src="product.imgOne" class="w-48 h-32 rounded-lg">
          </div>
        </div>

        <div class="mb-4">
          <label for="title" class="block mb-2 font-medium text-gray-700">{{ $t('form.title') }}</label>
          <input type="text" id="title" name="title" v-model="product.title"
            class="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-400">
        </div>

        <div class="mb-4">
          <label for="description" class="block mb-2 font-medium text-gray-700">{{ $t('form.description') }}</label>
          <textarea id="description" rows="4" name="description" v-model="product.description"
            class="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-400" />
        </div>

        <div class="mb-4">
          <p class="block mb-2 font-medium text-gray-700">Product Type</p>
          <div class="grid grid-cols-3 gap-4">
            <label for="new-arrival" class="block mb-2 font-medium text-gray-700">
              <input type="checkbox" id="new-arrival" name="new-arrival" value="New_Arrival" class="me-2"
                v-model="product.productTypes">New Arrival
            </label>

            <label for="express-deals" class="block mb-2 font-medium text-gray-700">
              <input type="checkbox" id="express-deals" name="express-deals" value="Express_Deals" class="me-2"
                v-model="product.productTypes">Express Deals
            </label>

            <label for="sale" class="block mb-2 font-medium text-gray-700">
              <input type="checkbox" id="sale" name="sale" value="Sale" class="me-2" v-model="product.productTypes">Sale
            </label>

            <label for="bundle" class="block mb-2 font-medium text-gray-700">
              <input type="checkbox" id="bundle" name="bundle" value="Bundle" class="me-2"
                v-model="product.productTypes">Bundle
            </label>

            <label for="custom" class="block mb-2 font-medium text-gray-700">
              <input type="checkbox" id="custom" name="custom" value="Custom" class="me-2"
                v-model="product.productTypes">Custom
            </label>
          </div>
        </div>

        <div class="mb-4">
          <p class="block mb-2 font-medium text-gray-700">Size</p>
          <div class="grid grid-cols-4 gap-4 md:grid-cols-5 sm:grid-cols-4">
            <label for="size-choice" class="block mb-2 font-medium text-gray-700">
              <input type="checkbox" id="size-choice" name="size-choice" value="XXS" class="me-2"
                v-model="product.sizes">XXS
            </label>

            <label for="size-choice" class="block mb-2 font-medium text-gray-700">
              <input type="checkbox" id="size-choice" name="size-choice" value="XS" class="me-2"
                v-model="product.sizes">XS
            </label>

            <label for="size-choice" class="block mb-2 font-medium text-gray-700">
              <input type="checkbox" id="size-choice" name="size-choice" value="S" class="me-2"
                v-model="product.sizes">S
            </label>

            <label for="size-choice" class="block mb-2 font-medium text-gray-700">
              <input type="checkbox" id="size-choice" name="size-choice" value="M" class="me-2"
                v-model="product.sizes">M
            </label>

            <label for="size-choice" class="block mb-2 font-medium text-gray-700">
              <input type="checkbox" id="size-choice" name="size-choice" value="L" class="me-2"
                v-model="product.sizes">L
            </label>

            <label for="size-choice" class="block mb-2 font-medium text-gray-700">
              <input type="checkbox" id="size-choice" name="size-choice" value="XL" class="me-2"
                v-model="product.sizes">XL
            </label>

            <label for="size-choice" class="block mb-2 font-medium text-gray-700">
              <input type="checkbox" id="size-choice" name="size-choice" value="XXL" class="me-2"
                v-model="product.sizes">XXL
            </label>

            <label for="size-choice" class="block mb-2 font-medium text-gray-700">
              <input type="checkbox" id="size-choice" name="size-choice" value="XXXL" class="me-2"
                v-model="product.sizes">XXXL
            </label>

            <label for="size-choice" class="block mb-2 font-medium text-gray-700">
              <input type="checkbox" id="size-choice" name="size-choice" value="6XL" class="me-2"
                v-model="product.sizes">6XL
            </label>

            <label for="size-choice" class="block mb-2 font-medium text-gray-700">
              <input type="checkbox" id="size-choice" name="size-choice" value="0 to 3" class="me-2"
                v-model="product.sizes">0 to 3
            </label>

            <label for="size-choice" class="block mb-2 font-medium text-gray-700">
              <input type="checkbox" id="size-choice" name="size-choice" value="6M" class="me-2"
                v-model="product.sizes">6M
            </label>

            <label for="size-choice" class="block mb-2 font-medium text-gray-700">
              <input type="checkbox" id="size-choice" name="size-choice" value="3t" class="me-2"
                v-model="product.sizes">3t
            </label>

            <label for="size-choice" class="block mb-2 font-medium text-gray-700">
              <input type="checkbox" id="size-choice" name="size-choice" value="26W/32L" class="me-2"
                v-model="product.sizes">26W/32L
            </label>

            <label for="size-choice" class="block mb-2 font-medium text-gray-700">
              <input type="checkbox" id="size-choice" name="size-choice" value="40 EU" class="me-2"
                v-model="product.sizes">40 EU
            </label>

            <label for="size-choice" class="block mb-2 font-medium text-gray-700">
              <input type="checkbox" id="size-choice" name="size-choice" value="40" class="me-2"
                v-model="product.sizes">40
            </label>

            <label for="size-choice" class="block mb-2 font-medium text-gray-700">
              <input type="checkbox" id="size-choice" name="size-choice" value="Mid_Rise" class="me-2"
                v-model="product.sizes">Mid Rise
            </label>

            <label for="size-choice" class="block mb-2 font-medium text-gray-700">
              <input type="checkbox" id="size-choice" name="size-choice" value="10_Regular" class="me-2"
                v-model="product.sizes">10 Regular
            </label>
          </div>
        </div>

        <!-- don't delete it -->
        <div class="mb-4">
          <p class="block mb-2 font-medium text-gray-700">Color</p>
          <div class="grid grid-cols-3 gap-4">
            <label for="color-choice" class="block mb-2 font-medium text-gray-700">
              <input type="checkbox" id="color-choice" name="color-choice" value="Black" class="me-2"
                v-model="product.colors">Black
            </label>

            <label for="color-choice" class="block mb-2 font-medium text-gray-700">
              <input type="checkbox" id="color-choice" name="color-choice" value="White" class="me-2"
                v-model="product.colors">White
            </label>

            <label for="color-choice" class="block mb-2 font-medium text-gray-700">
              <input type="checkbox" id="color-choice" name="color-choice" value="Denim Light" class="me-2"
                v-model="product.colors">Denim Light
            </label>

            <label for="color-choice" class="block mb-2 font-medium text-gray-700">
              <input type="checkbox" id="color-choice" name="color-choice" value="Brown Windowpane" class="me-2"
                v-model="product.colors">Brown Windowpane
            </label>

            <label for="color-choice" class="block mb-2 font-medium text-gray-700">
              <input type="checkbox" id="color-choice" name="color-choice" value="Blue" class="me-2"
                v-model="product.colors">Blue
            </label>

            <label for="color-choice" class="block mb-2 font-medium text-gray-700">
              <input type="checkbox" id="color-choice" name="color-choice" value="Pink" class="me-2"
                v-model="product.colors">Pink
            </label>

            <label for="color-choice" class="block mb-2 font-medium text-gray-700">
              <input type="checkbox" id="color-choice" name="color-choice" value="Dark_Wash" class="me-2"
                v-model="product.colors">Dark Wash
            </label>

            <label for="color-choice" class="block mb-2 font-medium text-gray-700">
              <input type="checkbox" id="color-choice" name="color-choice" value="Maroon" class="me-2"
                v-model="product.colors">Maroon
            </label>

            <label for="color-choice" class="block mb-2 font-medium text-gray-700">
              <input type="checkbox" id="color-choice" name="color-choice" value="Khaki" class="me-2"
                v-model="product.colors">Khaki
            </label>

            <label for="color-choice" class="block mb-2 font-medium text-gray-700">
              <input type="checkbox" id="color-choice" name="color-choice" value="Luggage" class="me-2"
                v-model="product.colors">Luggage
            </label>
          </div>
        </div>

        <div class="mb-4">
          <label for="original-price" class="block mb-2 font-medium text-gray-700">{{ $t('form.original_price')
            }}</label>
          <input type="text" id="original-price" name="original-price" v-model="product.originalPrice"
            @input="(event) => handleInput(event, 'originalPrice')" @blur="() => handleBlur('originalPrice')"
            class="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-400">
        </div>

        <div class="mb-4">
          <label for="price" class="block mb-2 font-medium text-gray-700">{{ $t('form.discounted_price') }}</label>
          <input type="text" id="price" name="price" v-model="product.discountedPrice"
            @input="(event) => handleInput(event, 'discountedPrice')" @blur="() => handleBlur('discountedPrice')"
            class="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-400">
        </div>

        <div class="mb-4">
          <label for="discount" class="block mb-2 font-medium text-gray-700">{{ $t('form.discount') }}</label>
          <input type="text" id="discount" name="discount" v-model="product.discount"
            class="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-400">
        </div>

        <div class="mb-4">
          <label for="sku" class="block mb-2 font-medium text-gray-700">SKU</label>
          <input type="text" id="sku" name="sku" v-model="product.sku"
            class="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-400">
        </div>

        <div class="mb-4">
          <label for="availability" class="block mb-2 font-medium text-gray-700">{{ $t('form.availability') }}</label>
          <select id="availability" name="availability" v-model="product.availability"
            class="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-400">
            <option value="" disabled>{{ $t('form.select_availability') }}</option>
            <option>In stock</option>
            <option>Out of stock</option>
          </select>
        </div>

        <div class="mb-4" v-if="product.availability === 'In stock'">
          <label for="sku" class="block mb-2 font-medium text-gray-700">Stock</label>
          <input type="number" id="sku" name="sku" v-model="product.stock"
            class="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-400">
        </div>

        <div>
          <button type="submit" class="w-full px-4 py-2 btn-style">
            <div class="flex items-center justify-center" v-if="loading">
              <span class="text-center me-2">{{ $t('loading_btn.please_wait') }}...</span>
              <icon name="svg-spinners:270-ring-with-bg" />
            </div>
            <span v-else>{{ $t('btn.add_product') }}</span>
          </button>
        </div>
      </form>
    </div>

    <!-- dynamic-toast component -->
    <div class="fixed z-50 pointer-events-none bottom-5 start-5 w-96">
      <div class="pointer-events-auto">
        <dynamic-toast v-if="showToast" :title="toastTitle" :message="toastMessage" :toastType="toastType"
          :duration="5000" :toastIcon="toastIcon" @toastClosed="showToast = false" />
      </div>
    </div>
  </div>
</template>

<script setup>
// import { useProductsStore } from '@/stores/productsStore';

const store = useProductsStore()
const loading = ref(false);
const categories = ref([])
const selectedCategory = ref('')
const product = ref({ brand: '', title: '', description: '', discountedPrice: '', originalPrice: '', discount: '', sku: '', stock: '', productTypes: [], sizes: [], colors: [] })
const selectedFiles = ref([]);
const previewImages = ref([])

const handleImageUpload = (event) => {
  const files = event.target.files;
  if (files.length > 0) {
    selectedFiles.value = Array.from(files);
    previewImages.value = [];
    selectedFiles.value.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        previewImages.value.push(e.target.result);
      };
      reader.readAsDataURL(file);
    });
  } else {
    selectedFiles.value = [];
    previewImages.value = [];
  }
};

const { showToast, toastTitle, toastMessage, toastType, toastIcon, triggerToast } = useToast();
const { t } = useI18n();

const handleSubmit = () => {
  loading.value = true;
  const category = categories.value.find(cat => cat.id === selectedCategory.value);
  if (!product.value.title || !selectedCategory.value || !selectedFiles.value) {
    triggerToast({
      title: t('toast.error'),
      message: t('toast.please_fill_all_required_fields'),
      type: 'error',
      icon: 'mdi-alert-circle',
    });
    loading.value = false;
    return;
  }
  const filteredProductData = Object.fromEntries(
    Object.entries(product.value).filter(([key, value]) => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return value !== "" && value !== null && value !== undefined;
    })
  );
  const productData = {
    ...filteredProductData,
    categoryId: selectedCategory.value,
  };
  store.createProduct(productData, selectedFiles.value)
    .then(() => {
      triggerToast({
        title: t('toast.success'),
        message: t('toast.product_added_successfully'),
        type: 'success',
        icon: 'mdi-check-circle',
      });
      resetForm();
    })
    .catch((error) => {
      console.error("Error submitting product:", error);
      triggerToast({
        title: t('toast.error'),
        message: t('toast.something_went_wrong_please_try_again'),
        type: 'error',
        icon: 'mdi-alert-circle',
      });
    })
    .finally(() => {
      loading.value = false;
    });
};

// const handleSubmit = async () => {
//   loading.value = true;
//   const category = categories.value.find(cat => cat.id === selectedCategory.value);
//   try {
//     if (!product.value.title || !selectedCategory.value || !selectedFiles.value) {
//       triggerToast({
//         title: t('toast.error'),
//         message: t('toast.please_fill_all_required_fields'),
//         type: 'error',
//         icon: 'mdi-alert-circle',
//       });
//       return;
//     }
//     const filteredProductData = Object.fromEntries(
//       Object.entries(product.value).filter(([key, value]) => {
//         if (Array.isArray(value)) {
//           return value.length > 0;
//         }
//         return value !== "" && value !== null && value !== undefined;
//       })
//     );
//     const productData = {
//       ...filteredProductData,
//       categoryId: selectedCategory.value,
//     };
//     await store.createProduct(productData, selectedFiles.value);
//     triggerToast({
//       title: t('toast.success'),
//       message: t('toast.product_added_successfully'),
//       type: 'success',
//       icon: 'mdi-check-circle',
//     });
//     resetForm();
//   } catch (error) {
//     console.error("Error submitting product:", error);
//     triggerToast({
//       title: t('toast.error'),
//       message: t('toast.something_went_wrong_please_try_again'),
//       type: 'error',
//       icon: 'mdi-alert-circle',
//     });
//   } finally {
//     loading.value = false;
//   }
// };

const resetForm = () => {
  product.value = { brand: '', title: '', description: '', discountedPrice: '', originalPrice: '', discount: '', sku: '', stock: '' };
  selectedCategory.value = '';
  selectedFiles.value = [];
  previewImages.value = [];
};

const categoryStore = useCategoriesStore()

onMounted(() => {
  categoryStore.fetchCategories();
  categories.value = categoryStore.categories;
});

const { formatDecimal, enforceTwoDecimalPlaces } = useFormatter();

const handleInput = (event, key) => {
  const inputElement = event.target;
  const cursorPosition = inputElement.selectionStart;
  const formattedValue = formatDecimal(inputElement.value);
  product.value[key] = formattedValue;
  nextTick(() => {
    inputElement.setSelectionRange(cursorPosition, cursorPosition);
  });
};

const handleBlur = (key) => {
  product.value[key] = enforceTwoDecimalPlaces(product.value[key]);
};

definePageMeta({
  layout: "dashboard",
});

useHead({
  titleTemplate: () => t('head.add_product'),
});
</script>