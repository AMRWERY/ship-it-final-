<template>
  <div>
    <Form v-slot="{ errors }">
      <div class="my-4">
        <label :for="id" class="block mb-1 text-sm font-medium text-gray-700">
          {{ label }}
          <span v-if="required" class="text-red-600">*</span>
        </label>

        <div class="relative w-full">
          <!-- prefix-icon -->
          <span v-if="prefixIcon"
            class="absolute inset-y-0 flex items-center text-gray-400 start-3 hover:text-gray-600">
            <icon :name="prefixIcon" class="w-5 h-5" />
          </span>
          <!-- input -->
          <Field :type="showPassword ? 'text' : type" :name="name" :placeholder="placeholder" :id="id"
            v-model="internalValue" :rules="rules"
            class="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none pe-9 bg-gray-50 ps-9" />
          <!-- Eye icon -->
          <span v-if="type === 'password'" @click="togglePassword"
            class="absolute inset-y-0 flex items-center text-gray-400 cursor-pointer end-3 hover:text-gray-600">
            <icon
              :name="showPassword ? 'material-symbols:visibility-off-rounded' : 'material-symbols:visibility-rounded'"
              class="w-5 h-5" />
          </span>
        </div>

        <!-- error messages -->
        <div class="mt-1">
          <ErrorMessage :name="name" class="text-red-600" />
        </div>
      </div>
    </Form>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    // required: true
  },
  label: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: ''
  },
  id: {
    type: String,
    default: () => `input-${Math.random().toString(36).substr(2, 9)}`
  },
  rules: {
    type: [Object, String],
    default: () => { },
  },
  errors: {
    type: [Object, String],
    default: () => { },
  },
  required: {
    type: Boolean,
    default: false
  },
  prefixIcon: {
    type: String,
    default: null
  }
});

const emit = defineEmits(['update:modelValue']);

const internalValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

// Password visibility toggle
const showPassword = ref(false);

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};
</script>