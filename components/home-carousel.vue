<template>
    <div>
        <ClientOnly>
            <div class="relative px-4 xs:px-4 md:px-0">
                <Carousel v-bind="config">
                    <Slide v-for="banner in images" :key="banner">
                        <div class="carousel__item">
                            <img :src="banner" alt="image" class="object-cover w-full h-auto rounded-md" />
                        </div>
                    </Slide>

                    <template #addons>
                        <Navigation />
                        <Pagination />
                    </template>
                </Carousel>
            </div>
        </ClientOnly>
    </div>
</template>

<script setup>
const imageStore = useImageStore();
const images = computed(() => imageStore.images);

onMounted(() => {
    imageStore.fetchImages("home-banner");
});

const config = {
    itemsToShow: 1,
    wrapAround: true,
    autoplay: 4000,
    transition: 500,
    pauseAutoplayOnHover: true
};
</script>

<style>
.carousel__item {
    width: 100%;
    flex-shrink: 0;
}

.carousel__track {
    display: flex;
    transition: transform 0.5s ease;
}
</style>