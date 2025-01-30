<template>
    <div>
        <!-- breadcrumb component -->
        <breadcrumb />

        <section class="py-4">
            <div class="px-4 mx-auto">
                <div class="grid grid-cols-1 gap-12 mt-8 lg:col-gap-12 xl:col-gap-16 lg:mt-12 lg:grid-cols-5 lg:gap-16">
                    <div class="lg:col-span-3 lg:row-end-1">
                        <div class="lg:flex lg:items-start">
                            <div class="lg:order-2 lg:ms-5">
                                <div class="max-w-xl overflow-hidden rounded-lg">
                                    <img class="object-cover w-full h-full max-w-full"
                                        src="https://justfields.com/storage/projects/7M5rV059/coffee.jpg"
                                        alt="product-img-1" />
                                </div>
                            </div>

                            <div class="w-full mt-2 lg:order-1 lg:w-32 lg:flex-shrink-0">
                                <div class="flex flex-row items-start lg:flex-col">
                                    <button type="button"
                                        class="h-20 mb-3 overflow-hidden text-center border-2 border-gray-900 rounded-lg flex-0 aspect-square">
                                        <img class="object-cover w-full h-full"
                                            src="https://justfields.com/storage/projects/7M5rV059/coffee.jpg"
                                            alt="product-img-2" />
                                    </button>
                                    <button type="button"
                                        class="h-20 mb-3 overflow-hidden text-center border-2 border-transparent rounded-lg flex-0 aspect-square">
                                        <img class="object-cover w-full h-full"
                                            src="https://justfields.com/storage/projects/7M5rV059/coffee.jpg"
                                            alt="product-img-2" />
                                    </button>
                                    <button type="button"
                                        class="h-20 mb-3 overflow-hidden text-center border-2 border-transparent rounded-lg flex-0 aspect-square">
                                        <img class="object-cover w-full h-full"
                                            src="https://justfields.com/storage/projects/7M5rV059/coffee.jpg"
                                            alt="product-img-3" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="lg:col-span-2 lg:row-span-2 lg:row-end-2">
                        <div class="lg:ps-6">
                            <div class="mb-6">
                                <span class="text-red-500 dark:text-red-200">brand</span>
                                <h2 class="max-w-xl mt-2 mb-4 text-2xl font-bold font-heading dark:text-gray-300">
                                    Buy One Plus 8 Pro
                                </h2>
                            </div>

                            <div class="flex mb-6 item-center gap-x-6">
                                <p>price</p>
                                <p>original price</p>
                                <p>discount</p>
                            </div>

                            <div class="gap-4 border-b border-gray-300">
                                <div class="py-6">
                                    <p class="mb-2 text-lg font-semibold dark:text-gray-400">
                                        time circles
                                    </p>
                                    <div class="flex flex-wrap items-center gap-2 mt-3 select-none">
                                        <label class="">
                                            <input type="radio" name="type" value="Powder" class="sr-only peer"
                                                checked />
                                            <p
                                                class="px-6 py-2 font-bold border border-black rounded-lg peer-checked:bg-black peer-checked:text-white">
                                                Powder
                                            </p>
                                        </label>
                                        <label class="">
                                            <input type="radio" name="type" value="Whole Bean" class="sr-only peer" />
                                            <p
                                                class="px-6 py-2 font-bold border border-black rounded-lg peer-checked:bg-black peer-checked:text-white">
                                                Whole Bean
                                            </p>
                                        </label>
                                        <label class="">
                                            <input type="radio" name="type" value="Groud" class="sr-only peer" />
                                            <p
                                                class="px-6 py-2 font-bold border border-black rounded-lg peer-checked:bg-black peer-checked:text-white">
                                                Groud
                                            </p>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div class="gap-4 border-b border-gray-300">
                                <p class="max-w-md my-4 text-gray-500 dark:text-gray-400">
                                    description
                                </p>
                            </div>

                            <div class="gap-4 border-b border-gray-300">
                                <div class="py-6">
                                    <p class="mb-2 text-lg font-semibold dark:text-gray-400">
                                        colors squares
                                    </p>
                                    <div class="flex flex-wrap items-center gap-2 mt-3 select-none">
                                        <label class="">
                                            <input type="radio" name="type" value="Powder" class="sr-only peer"
                                                checked />
                                            <p
                                                class="px-6 py-2 font-bold border border-black rounded-lg peer-checked:bg-black peer-checked:text-white">
                                                Powder
                                            </p>
                                        </label>
                                        <label class="">
                                            <input type="radio" name="type" value="Whole Bean" class="sr-only peer" />
                                            <p
                                                class="px-6 py-2 font-bold border border-black rounded-lg peer-checked:bg-black peer-checked:text-white">
                                                Whole Bean
                                            </p>
                                        </label>
                                        <label class="">
                                            <input type="radio" name="type" value="Groud" class="sr-only peer" />
                                            <p
                                                class="px-6 py-2 font-bold border border-black rounded-lg peer-checked:bg-black peer-checked:text-white">
                                                Groud
                                            </p>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div class="gap-4 border-b border-gray-300">
                                <div class="py-6">
                                    <p class="mb-2 text-lg font-semibold dark:text-gray-400">
                                        sizes squares
                                    </p>
                                    <div class="flex flex-wrap items-center gap-2 mt-3 select-none">
                                        <label class="">
                                            <input type="radio" name="type" value="Powder" class="sr-only peer"
                                                checked />
                                            <p
                                                class="px-6 py-2 font-bold border border-black rounded-lg peer-checked:bg-black peer-checked:text-white">
                                                Powder
                                            </p>
                                        </label>
                                        <label class="">
                                            <input type="radio" name="type" value="Whole Bean" class="sr-only peer" />
                                            <p
                                                class="px-6 py-2 font-bold border border-black rounded-lg peer-checked:bg-black peer-checked:text-white">
                                                Whole Bean
                                            </p>
                                        </label>
                                        <label class="">
                                            <input type="radio" name="type" value="Groud" class="sr-only peer" />
                                            <p
                                                class="px-6 py-2 font-bold border border-black rounded-lg peer-checked:bg-black peer-checked:text-white">
                                                Groud
                                            </p>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="lg:col-span-full">
                        <nav class="flex gap-4">
                            <nuxt-link to=""
                                class="py-2 text-sm font-semibold text-gray-900 border-b-2 border-gray-900 hover:border-gray-400 hover:text-gray-800">
                                Upcoming Deals
                            </nuxt-link>
                        </nav>

                        <div class="flow-root mt-8 sm:mt-12">
                            <div class="grid grid-cols-2 gap-4 md:grid-cols-3 max-sm:justify-center gap-y-8 sm:gap-x-6">
                                <div class="flex items-center gap-6 overflow-hidden cursor-pointer max-sm:flex-col">
                                    <div class="w-24 h-24 p-3 overflow-hidden bg-gray-100 rounded-lg shrink-0">
                                        <img src="https://readymadeui.com/images/watch1.webp" alt="product1"
                                            class="object-contain w-full h-full" />
                                    </div>
                                    <div class="max-sm:text-center">
                                        <h3 class="text-sm font-bold text-gray-800 sm:text-base">French Connection</h3>
                                        <h4 class="mt-2 text-sm font-bold text-blue-600 sm:text-base">$95.00</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
const { t } = useI18n();

definePageMeta({
    layout: 'dashboard'
})

useHead({
    titleTemplate: () => t('head.all_deals'),
});
</script>