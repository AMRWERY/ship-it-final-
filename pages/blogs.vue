<template>
  <div>
    <div class="py-6 mt-4 rounded-lg shadow-lg sm:py-8 lg:py-12 dark:border dark:border-gray-100">
      <div class="max-w-screen-xl px-4 mx-auto md:px-8">
        <div class="mb-10 md:mb-16">
          <h2 class="mb-4 text-2xl font-bold text-center text-gray-800 md:mb-6 lg:text-3xl dark:text-gray-200">{{
            $t('blogs.shipping_insights_updates') }}
          </h2>
          <p class="max-w-screen-sm mx-auto text-center text-gray-500 md:text-lg dark:text-gray-100">{{
            $t('blogs.stay_informed_with_the_latest_trends_tips_and_innovations_in_global_logistics_and_ecommerce_shipping')
            }}</p>
        </div>

        <div class="grid gap-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-2 xl:grid-cols-2 xl:gap-16">
          <div class="flex flex-col items-center gap-4 md:flex-row lg:gap-6" v-for="blog in blogs" :key="blog">
            <nuxt-link to=""
              class="relative self-start block w-full h-56 overflow-hidden bg-gray-100 rounded-lg shadow-lg group shrink-0 md:h-24 md:w-24 lg:h-40 lg:w-40">
              <img :src="blog.img" loading="lazy" alt="Shipping technology"
                class="absolute inset-0 object-cover object-center w-full h-full transition duration-200 group-hover:scale-110" />
            </nuxt-link>
            <div class="flex flex-col gap-2">
              <span class="text-sm text-gray-400 dark:text-gray-100">{{ blog.date }}</span>
              <h2 class="text-xl font-bold text-gray-800 dark:text-gray-200">
                <nuxt-link to="" class="transition duration-100 hover:text-blue-600 active:text-blue-700">{{
                  blog.title }}</nuxt-link>
              </h2>
              <p class="text-gray-500 dark:text-gray-100">{{ blog.desc }}</p>
              <div class="mt-2">
                <button role="button" @click="openBlog(blog)"
                  class="text-sm text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-500">
                  <icon name="svg-spinners:270-ring-with-bg" v-if="isLoading === blog.id" />
                  <span v-else>
                    {{ $t('btn.open_blog') }}
                  </span>
                </button>
              </div>
              <div>
              </div>
            </div>
          </div>

          <!-- blogs-dialog component -->
          <transition name="fade" appear>
            <blogs-dialog v-if="selectedBlog" :blog="selectedBlog" @close="closeBlog" />
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n()
const selectedBlog = ref(null)
const isLoading = ref(null)

const openBlog = (blog) => {
  isLoading.value = blog.id
  setTimeout(() => {
    selectedBlog.value = blog
    isLoading.value = false
  }, 2000)
}

const closeBlog = () => {
  selectedBlog.value = null
}

const blogs = computed(() => [
  {
    id: 1,
    date: t('blogs.date_1'),
    title: t('blogs.title_1'),
    desc: t('blogs.desc_1'),
    img: 'https://justfields.com/storage/projects/7M5rV059/blog-photo.jpg',
    content: [
      t('blogs.paragraph_1'),
      t('blogs.paragraph_2'),
      t('blogs.paragraph_3')
    ]
  },
  {
    id: 2,
    date: t('blogs.date_2'),
    title: t('blogs.title_2'),
    desc: t('blogs.desc_2'),
    img: 'https://justfields.com/storage/projects/7M5rV059/post-1.jpg',
    content: [
      t('blogs.paragraph_4'),
      t('blogs.paragraph_5'),
      t('blogs.paragraph_6')
    ]
  },
  {
    id: 3,
    date: t('blogs.date_3'),
    title: t('blogs.title_3'),
    desc: t('blogs.desc_3'),
    img: 'https://justfields.com/storage/projects/7M5rV059/post-1.jpg',
    content: [
      t('blogs.paragraph_7'),
      t('blogs.paragraph_8'),
      t('blogs.paragraph_9')
    ]
  },
  {
    id: 4,
    date: t('blogs.date_4'),
    title: t('blogs.title_4'),
    desc: t('blogs.desc_4'),
    img: 'https://justfields.com/storage/projects/7M5rV059/blog-img.jpg',
    content: [
      t('blogs.paragraph_10'),
      t('blogs.paragraph_11'),
      t('blogs.paragraph_12')
    ]
  }
]);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>