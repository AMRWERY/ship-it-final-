<template>
  <div>
    <div class="flex flex-col min-h-screen shadow-xl dark:shadow-slate-50">
      <!-- Header -->
      <header class="p-6 text-white bg-blue-600 dark:bg-blue-400">
        <div class="container flex items-center justify-between mx-auto">
          <h1 class="text-3xl font-bold">Help Center</h1>
        </div>
      </header>

      <div class="container flex flex-col flex-grow px-6 mx-auto mt-8 md:flex-row">
        <!-- Updated Sidebar with tab navigation -->
        <div class="w-full p-4 mb-8 rounded-lg shadow-lg md:w-1/4 md:mb-0">
          <h2 class="mb-4 text-xl font-semibold">Categories</h2>
          <ul class="space-y-3">
            <li v-for="tab in tabs" :key="tab.id">
              <nuxt-link :to="`#${tab.id}`" @click.prevent="activeTab = tab.id"
                class="block px-3 py-2 transition-colors rounded-lg" :class="{
                  'text-blue-600 bg-blue-50 dark:bg-blue-900/20': activeTab === tab.id,
                  'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800': activeTab !== tab.id
                }">
                {{ tab.title }}
              </nuxt-link>
            </li>
          </ul>
        </div>

        <!-- Dynamic Content Area -->
        <div class="w-full ps-4 md:w-3/4 md:ps-8">
          <transition name="fade" mode="out-in">
            <div :key="activeTab">
              <!-- account-management -->
              <section v-if="activeTab === 'account-management'" class="mb-8">
                <!-- account-management componenet -->
                <account-management />
              </section>

              <!-- orders-shipping -->
              <section v-if="activeTab === 'orders-shipping'" class="mb-8">
                <!-- orders-shipping componenet -->
                <orders-shipping />
              </section>

              <!-- returns-exchanges -->
              <section v-if="activeTab === 'returns-exchanges'" class="mb-8">
                <!-- returns-exchanges componenet -->
                <returns-exchanges />
              </section>

              <!-- payment-issue -->
              <section v-if="activeTab === 'payment-issues'" class="mb-8">
                <!-- payment-issues componenet -->
                <payment-issues />
              </section>

              <!-- genral-questions -->
              <section v-if="activeTab === 'genral-questions'" class="mb-8">
                <!-- genral-questions componenet -->
                <genral-questions />
              </section>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const tabs = ref([
  { id: 'account-management', title: 'Account Management' },
  { id: 'orders-shipping', title: 'Orders & Shipping' },
  { id: 'returns-exchanges', title: 'Returns & Exchanges' },
  { id: 'payment-issues', title: 'Payment Issues' },
  { id: 'genral-questions', title: 'Genral Questions' }
]);

const activeTab = ref('account-management');
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>