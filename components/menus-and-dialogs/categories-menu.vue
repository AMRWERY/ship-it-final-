<template>
  <div>
    <div class="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto" id="navbarSupportedContent2"
      data-twe-collapse-item>
      <ul class="flex flex-row me-auto" data-twe-navbar-nav-ref>
        <li class="static" data-twe-nav-item-ref data-twe-dropdown-ref>
          <nuxt-link to="" role="button"
            class="flex items-center py-2 text-white transition duration-200 whitespace-nowrap pe-2 hover:text-white hover:ease-in-out focus:text-white active:text-white motion-reduce:transition-none lg:px-2"
            type="button" id="dropdownMenuButton1" data-twe-dropdown-toggle-ref aria-expanded="false"
            data-twe-nav-link-ref>
            <icon name="mingcute:grid-2-line" class="me-1" />
            Categories
          </nuxt-link>

          <div
            class="absolute left-0 right-0 top-full z-[1000] mt-0 hidden w-[1300px] border-none bg-white bg-clip-padding data-[twe-dropdown-show]:block"
            aria-labelledby="dropdownMenuButton1" data-twe-dropdown-menu-ref>
            <div class="px-6 py-5 lg:px-8">
              <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
                <div v-for="category in categoriesStore.subCategories" :key="category">
                  <p class="block w-full px-6 py-2 font-semibold border-b border-neutral-100 text-neutral-700">
                    {{ category.title }}
                  </p>
                  <nuxt-link v-for="(subCategory, index) in category.subCategories" :key="index" to=""
                    aria-current="true"
                    class="block w-full px-6 py-2 bg-white border-b border-neutral-100 text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline">
                    {{ subCategory }}
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const categoriesStore = useCategoriesStore()

onMounted(() => {
  categoriesStore.fetchSubCategories();
});

onMounted(async () => {
  const { Collapse, Dropdown, Ripple, initTWE } = await import("tw-elements");
  initTWE({ Collapse, Dropdown, Ripple });
});
</script>