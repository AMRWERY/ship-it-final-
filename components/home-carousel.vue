<template>
    <div>
        <div class="w-full overflow-hidden relative
         h-[300px] sm:h-[350px] lg:h-[400px] xl:h-[500px] px-4 sm:px-0">
            <div v-for="(image, index) in images" :key="index" :class="['carousel-item absolute w-full transition-opacity duration-500',
                { 'opacity-100 z-10': activeSlide === index },
                { 'opacity-0 z-0': activeSlide !== index }
            ]" style="top: 0; left: 0; right: 0; bottom: 0;">
                <img :src="image" class="object-cover w-full h-full" />
                <div
                    class="absolute flex justify-between -translate-y-1/2 left-4 right-4 sm:left-5 sm:right-5 lg:left-8 lg:right-8 top-1/2">
                    <button
                        class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
                        @click="prevSlide">
                        <icon name="ic:baseline-keyboard-arrow-left" class="rtl:rotate-180" />
                    </button>
                    <button
                        class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
                        @click="nextSlide">
                        <icon name="ic:baseline-keyboard-arrow-right" class="rtl:rotate-180" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const imageStore = useImageStore()
const images = computed(() => imageStore.images)

const activeSlide = ref(0)
const autoPlayInterval = ref(null)

const nextSlide = () => {
    if (images.value.length === 0) return
    activeSlide.value = (activeSlide.value + 1) % images.value.length
    resetAutoPlay()
}

const prevSlide = () => {
    if (images.value.length === 0) return
    activeSlide.value = (activeSlide.value - 1 + images.value.length) % images.value.length
    resetAutoPlay()
}

const startAutoPlay = () => {
    if (images.value.length === 0) return
    autoPlayInterval.value = setInterval(nextSlide, 4000)
}

const resetAutoPlay = () => {
    clearInterval(autoPlayInterval.value)
    startAutoPlay()
}

onMounted(async () => {
    await imageStore.fetchImages("home-banner")
    startAutoPlay()
})

onBeforeUnmount(() => {
    clearInterval(autoPlayInterval.value)
})
</script>

<style scoped>
.carousel-item {
    transition: opacity 0.5s ease-in-out;
}
</style>