<template>
  <div>
    <div class="py-6 rounded-lg shadow-lg sm:py-8 lg:py-12 dark:border dark:border-gray-100">
      <div class="max-w-screen-xl px-4 mx-auto md:px-8">
        <div class="mb-10 md:mb-16">
          <h2 class="mb-4 text-2xl font-bold text-center text-gray-800 md:mb-6 lg:text-3xl dark:text-gray-200">Shipping
            Insights & Updates
          </h2>
          <p class="max-w-screen-md mx-auto text-center text-gray-500 md:text-lg dark:text-gray-100">Stay informed with
            the latest trends,
            tips, and innovations in global logistics and e-commerce shipping.</p>
        </div>

        <div class="grid gap-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-2 xl:grid-cols-2 xl:gap-16">
          <div class="flex flex-col items-center gap-4 md:flex-row lg:gap-6" v-for="blog in blogs" :key="blog">
            <router-link to=""
              class="relative self-start block w-full h-56 overflow-hidden bg-gray-100 rounded-lg shadow-lg group shrink-0 md:h-24 md:w-24 lg:h-40 lg:w-40">
              <img :src="blog.img" loading="lazy" alt="Shipping technology"
                class="absolute inset-0 object-cover object-center w-full h-full transition duration-200 group-hover:scale-110" />
            </router-link>
            <div class="flex flex-col gap-2">
              <span class="text-sm text-gray-400 dark:text-gray-100">{{ blog.date }}</span>
              <h2 class="text-xl font-bold text-gray-800 dark:text-gray-200">
                <router-link to="" class="transition duration-100 hover:text-blue-600 active:text-blue-700">{{
                  blog.title }}</router-link>
              </h2>
              <p class="text-gray-500 dark:text-gray-100">{{ blog.desc }}</p>
              <div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const blogs = computed(() => [
  {
    date: 'March 15, 2024',
    title: '5 Ways to Optimize Your Shipping Workflow',
    desc: 'Discover how smart packaging choices and route optimization can reduce costs by up to 30%.',
    img: 'https://justfields.com/storage/projects/7M5rV059/blog-photo.jpg'
  },
  {
    date: 'March 12, 2024',
    title: 'Mastering International Shipping Regulations',
    desc: 'Essential guide to navigating customs, duties, and cross-border logistics.',
    img: 'https://justfields.com/storage/projects/7M5rV059/post-2.jpg'
  },
  {
    date: 'March 8, 2024',
    title: 'Sustainable Shipping: Our Green Initiative',
    desc: "How we're reducing carbon footprint with biodegradable materials and electric fleets.",
    img: 'https://justfields.com/storage/projects/7M5rV059/post-1.jpg'
  },
  {
    date: 'March 1, 2024',
    title: 'Real-Time Tracking: Enhancing Customer Experience',
    desc: "Learn how our new tracking system improves delivery transparency and satisfaction.",
    img: 'https://justfields.com/storage/projects/7M5rV059/blog-img.jpg'
  }
]);
</script>