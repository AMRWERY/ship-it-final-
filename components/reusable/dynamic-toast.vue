<template>
    <div>
        <transition name="toast-slide">
            <div v-if="visible"
                :class="`relative w-full max-w-lg p-5 rounded-lg shadow-xl sm:max-w-lg z-50 ${toastStyles}`"
                role="alert">
                <icon :name="toastIcon" :class="`w-6 h-6 ${iconColor}`" class="inline shrink-0 me-3" />
                <span class="block text-lg me-3 sm:inline">{{ message }}</span>
                <icon name="material-symbols:close" class="inline w-6 h-6 cursor-pointer ms-auto shrink-0"
                    @click="closeToast" />
            </div>
        </transition>
    </div>
</template>

<script setup>
const props = defineProps({
    message: {
        type: String,
        required: true,
    },
    toastIcon: {
        type: String,
        default: '',
    },
    toastType: {
        type: String,
        default: '',
    },
    duration: {
        type: Number,
        default: 5000,
    },
});

const visible = ref(true);
const emit = defineEmits(['toastClosed']);

const toastStyles = computed(() => {
    switch (props.toastType) {
        case 'success':
            return 'bg-green-500 text-white font-semibold tracking-wide flex items-center w-max max-w-sm p-4 rounded-md shadow-md shadow-green-200';
        case 'error':
            return 'bg-red-500 text-white font-semibold tracking-wide flex items-center w-max max-w-sm p-4 rounded-md shadow-md shadow-red-200';
        case 'warning':
            return 'bg-yellow-500 text-white font-semibold tracking-wide flex items-center w-max max-w-sm p-4 rounded-md shadow-md shadow-yellow-200';
        default:
            return 'bg-blue-500 text-white font-semibold tracking-wide flex items-center w-max max-w-sm p-4 rounded-md shadow-md shadow-blue-200';
    }
});

const iconColor = computed(() => {
    switch (props.toastType) {
        case 'success':
            return 'bg-green-100 text-green-500';
        case 'error':
            return 'bg-red-100 text-red-500';
        case 'warning':
            return 'bg-yellow-100 text-yellow-500';
        default:
            return 'bg-blue-100 text-blue-500';
    }
});

const closeToast = () => {
    visible.value = false;
    emit('toastClosed');
};

setTimeout(() => {
    closeToast();
}, props.duration);
</script>

<style scoped>
.toast-slide-enter-active,
.toast-slide-leave-active {
    transition: opacity 0.5s ease, transform 0.5s ease;
}

.toast-slide-enter,
.toast-slide-leave-to {
    opacity: 0;
    transform: translateY(20px);
}
</style>