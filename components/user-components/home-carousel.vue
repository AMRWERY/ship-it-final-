<template>
    <div>
        <div class="relative">
            <!-- Carousel Container -->
            <div class="flex overflow-x-auto scrollbar-hide" ref="carouselRef">
                <!-- Each Carousel Item -->
                <div v-for="banner in images" :key="banner" class="flex-shrink-0 w-full">
                    <img :src="banner" alt="Carousel Image" class="object-cover w-full rounded-md h-96" />
                </div>
            </div>

            <!-- Previous Button -->
            <button ref="prevButtonRef"
                class="absolute inset-y-0 left-0 z-[1] flex w-[15%] items-center justify-center p-0 text-white opacity-50 hover:opacity-90 focus:outline-none"
                type="button">
                <span class="flex items-center justify-center w-8 h-8 bg-white rounded-full">
                    <icon name="ic:baseline-keyboard-arrow-left" class="text-black" />
                </span>
            </button>

            <!-- Next Button -->
            <button ref="nextButtonRef"
                class="absolute inset-y-0 right-0 z-[1] flex w-[15%] items-center justify-center p-0 text-white opacity-50 hover:opacity-90 focus:outline-none"
                type="button">
                <span class="flex items-center justify-center w-8 h-8 bg-white rounded-full">
                    <icon name="ic:baseline-keyboard-arrow-right" class="text-black" />
                </span>
            </button>
        </div>
    </div>
</template>

<script setup>
const imageStore = useImageStore();
const images = computed(() => imageStore.images);

onMounted(() => {
    imageStore.fetchImages("home-banner");
});

const carouselRef = ref(null);
const prevButtonRef = ref(null);
const nextButtonRef = ref(null);

const handlePrev = () => {
    if (carouselRef.value) {
        const container = carouselRef.value;
        if (container.scrollLeft === 0) {
            container.scrollTo({
                left: container.scrollWidth - container.offsetWidth,
                behavior: 'smooth',
            });
        } else {
            container.scrollBy({
                left: -container.offsetWidth,
                behavior: 'smooth',
            });
        }
    }
};

const handleNext = () => {
    if (carouselRef.value) {
        const container = carouselRef.value;
        if (container.scrollLeft + container.offsetWidth >= container.scrollWidth) {
            container.scrollTo({
                left: 0,
                behavior: 'smooth',
            });
        } else {
            container.scrollBy({
                left: container.offsetWidth,
                behavior: 'smooth',
            });
        }
    }
};

let autoPlayInterval = null;

onMounted(() => {
    prevButtonRef.value?.addEventListener('click', handlePrev);
    nextButtonRef.value?.addEventListener('click', handleNext);
    autoPlayInterval = setInterval(handleNext, 3000);
});

onUnmounted(() => {
    clearInterval(autoPlayInterval);
    prevButtonRef.value?.removeEventListener('click', handlePrev);
    nextButtonRef.value?.removeEventListener('click', handleNext);
});
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

.scrollbar-hide {
    scrollbar-width: none;
}
</style>