<template>
    <div>
        <div id="carouselExampleCaptions" class="relative" data-twe-carousel-init data-twe-ride="carousel">
            <!--Carousel items-->
            <div class="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
                <!--First item-->
                <nuxt-link to=""
                    class="relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                    data-twe-carousel-active data-twe-carousel-item style="backface-visibility: hidden">
                    <img :src="imageStore.images[0]" class="block w-full" />
                </nuxt-link>
                <!--Second item-->
                <nuxt-link to=""
                    class="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                    data-twe-carousel-item style="backface-visibility: hidden">
                    <img :src="imageStore.images[1]" class="block w-full" />
                </nuxt-link>
                <!--Third item-->
                <nuxt-link to=""
                    class="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                    data-twe-carousel-item style="backface-visibility: hidden">
                    <img :src="imageStore.images[2]" class="block w-full" />
                </nuxt-link>
                <!--Fourth item-->
                <nuxt-link to=""
                    class="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                    data-twe-carousel-item style="backface-visibility: hidden">
                    <img :src="imageStore.images[3]" class="block w-full" />
                </nuxt-link>
            </div>

            <!--Carousel controls - prev item-->
            <button
                class="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
                type="button" data-twe-target="#carouselExampleCaptions" data-twe-slide="prev">
                <span class="flex items-center justify-center w-8 h-8 bg-white rounded-full rtl:rotate-180">
                    <icon name="ic:baseline-keyboard-arrow-left" class="text-black rtl:rotate-180" />
                </span>
            </button>
            <!--Carousel controls - next item-->
            <button
                class="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
                type="button" data-twe-target="#carouselExampleCaptions" data-twe-slide="next">
                <span class="flex items-center justify-center w-8 h-8 bg-white rounded-full rtl:rotate-180">
                    <icon name="ic:baseline-keyboard-arrow-right" class="text-black rtl:rotate-180" />
                </span>
            </button>
        </div>
    </div>
</template>

<script setup>
// import { useImageStore } from '@/stores/imageStore';

const imageStore = useImageStore();

onMounted(() => {
    imageStore.fetchImages("home-banner");
});

onMounted(async () => {
    const { Carousel, initTWE } = await import("tw-elements");
    initTWE({ Carousel });
});
</script>