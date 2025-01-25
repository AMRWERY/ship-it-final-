<template>
  <div>
    <div class="max-w-2xl p-6 mx-auto mt-5 bg-white border rounded-lg">
      <h2 class="mb-4 text-xl font-bold">{{ $t('form.add_new_deal') }}</h2>
      <form @submit.prevent="handleAddDeal">
        <div class="mb-4">
          <label for="main-category" class="block mb-2 font-medium text-gray-700">{{ $t('form.category') }}</label>
          <select id="main-category" name="main-category" v-model="selectedCategory"
            class="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-400">
            <option value="" disabled>{{ $t('form.select_category') }}</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.title }}</option>
          </select>
        </div>

        <div class="mb-4">
          <label for="category-title" class="block text-sm font-medium text-gray-700">{{ $t('form.brand')
            }}</label>
          <input id="category-title" type="text" v-model="product.brand"
            class="w-full p-2 mt-1 border rounded-lg focus:ring focus:ring-blue-300"
            :placeholder="$t('form.enter_brand')" required />
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

        <div class="mb-4">
          <label for="category-title" class="block text-sm font-medium text-gray-700">{{ $t('form.product_title')
            }}</label>
          <input id="category-title" type="text" v-model="product.title"
            class="w-full p-2 mt-1 border rounded-lg focus:ring focus:ring-blue-300"
            :placeholder="$t('form.enter_product_title')" required />
        </div>

        <div class="mb-4">
          <label for="description" class="block mb-2 font-medium text-gray-700">{{ $t('form.product_description')
            }}</label>
          <textarea id="description" rows="4" name="description" :placeholder="$t('form.enter_product_description')"
            v-model="product.description"
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
          <label for="category-title" class="block text-sm font-medium text-gray-700">{{ $t('form.original_price')
            }}</label>
          <input id="category-title" type="text" :placeholder="$t('form.enter_original_price')"
            v-model="product.originalPrice" @input="(event) => handleInput(event, 'originalPrice')"
            @blur="() => handleBlur('originalPrice')"
            class="w-full p-2 mt-1 border rounded-lg focus:ring focus:ring-blue-300" required />
        </div>

        <div class="mb-4">
          <label for="category-title" class="block text-sm font-medium text-gray-700">{{ $t('form.price')
            }}</label>
          <input id="category-title" type="text" v-model="product.discountedPrice"
            @input="(event) => handleInput(event, 'discountedPrice')" @blur="() => handleBlur('discountedPrice')"
            class="w-full p-2 mt-1 border rounded-lg focus:ring focus:ring-blue-300"
            :placeholder="$t('form.enter_price')" required />
        </div>

        <div class="mb-4">
          <label for="category-title" class="block text-sm font-medium text-gray-700">{{ $t('form.discount')
            }}</label>
          <input id="category-title" type="text" v-model="product.discount"
            class="w-full p-2 mt-1 border rounded-lg focus:ring focus:ring-blue-300"
            :placeholder="$t('form.enter_the_discount_percentage')" required />
        </div>

        <div class="mb-4">
          <label for="category-title" class="block text-sm font-medium text-gray-700">{{ $t('form.sku')
            }}</label>
          <input id="category-title" type="text" v-model="product.sku"
            class="w-full p-2 mt-1 border rounded-lg focus:ring focus:ring-blue-300" :placeholder="$t('form.enter_sku')"
            required />
        </div>

        <div class="mb-4">
          <label for="category-title" class="block text-sm font-medium text-gray-700">{{ $t('form.start_time')
            }}</label>
          <VueDatePicker v-model="product.startTime" range />
        </div>

        <div class="mb-4">
          <label for="category-title" class="block text-sm font-medium text-gray-700">{{ $t('form.end_time')
            }}</label>
          <VueDatePicker v-model="product.endTime" range />
        </div>

        <button type="submit" class="w-full px-4 py-2 btn-style">
          <div class="flex items-center justify-center" v-if="loading">
            <span class="text-center me-2">{{ $t('btn.please_wait') }}...</span>
            <icon name="svg-spinners:270-ring-with-bg" />
          </div>
          <span v-else>{{ $t('btn.add_deal') }}</span>
        </button>
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
import { Timestamp } from 'firebase/firestore';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const todayDealStore = useTodayDealStore();
const categoryStore = useCategoriesStore()
const categories = ref([])
const selectedCategory = ref('')
const selectedFiles = ref([]);
const previewImages = ref([])
const { showToast, toastTitle, toastMessage, toastType, toastIcon, triggerToast } = useToast();
const { t } = useI18n();
const loading = ref(false);
const product = ref({ brand: '', title: '', description: '', discountedPrice: '', originalPrice: '', discount: '', sku: '', productTypes: [], sizes: [], colors: [] })

const resetForm = () => {
  product.value = { brand: '', title: '', description: '', discountedPrice: '', originalPrice: '', discount: '', sku: '', stock: '' };
  selectedCategory.value = '';
  selectedFiles.value = [];
  previewImages.value = [];
};

const handleAddDeal = () => {
  loading.value = true;
  const category = categories.value.find(cat => cat.id === selectedCategory.value);
  if (
    !product.value.title ||
    !selectedCategory.value ||
    !product.value.startTime ||
    !product.value.endTime ||
    selectedFiles.value.length === 0
  ) {
    triggerToast({
      title: t("toast.error"),
      message: t("toast.please_fill_all_required_fields"),
      type: "error",
      icon: "mdi-alert-circle",
    });
    loading.value = false;
    return;
  }
  const startTime = Timestamp.fromDate(new Date(product.value.startTime));
  const endTime = Timestamp.fromDate(new Date(product.value.endTime));
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
    startTime,
    endTime,
  };
  todayDealStore.addNewDeal(productData, selectedFiles.value)
    .then((success) => {
      if (success) {
        triggerToast({
          title: t("toast.success"),
          message: t("toast.deal_added_successfully"),
          type: "success",
          icon: "mdi-check-circle",
        });
        resetForm();
      }
    })
    .catch((error) => {
      console.error("Error submitting product:", error);
      triggerToast({
        title: t("toast.error"),
        message: t("toast.something_went_wrong_please_try_again"),
        type: "error",
        icon: "mdi-alert-circle",
      });
    })
    .finally(() => {
      loading.value = false;
    });
};

const handleImageUpload = (event) => {
  const files = event.target.files;
  if (files.length > 0) {
    selectedFiles.value = Array.from(files);
    previewImages.value = [];
    selectedFiles.value.forEach((file) => {
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

onMounted(async () => {
  await categoryStore.fetchCategories();
  categories.value = categoryStore.categories;
});

definePageMeta({
  layout: 'dashboard'
})
</script>

<style scoped>
.dp__theme_light {
  --dp-border-color: #28282a;
}
</style>