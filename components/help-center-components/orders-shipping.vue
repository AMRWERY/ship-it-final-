<template>
  <div>
    <div class="p-5 mx-auto border border-gray-200 rounded-lg shadow-lg max-w-7xl">
      <h2 class="text-2xl font-bold text-center mb-7">{{ $t('help_center.orders_shipping') }}</h2>
      <div class="space-y-6">
        <div>
          <p class="mb-2 font-semibold text-gray-800 dark:text-gray-200"><span class="me-1">1-</span>{{
            $t('help_center.placing_your_order') }}
          </p>
          <span class="text-base text-gray-600 dark:text-gray-100">{{ $t('help_center.placing_your_order_desc')
          }}</span>
        </div>

        <div>
          <p class="mb-2 font-semibold text-gray-800 dark:text-gray-200"><span class="me-1">2-</span>{{
            $t('help_center.shipping_methods_delivery') }}
          </p>
          <span class="text-base text-gray-600 dark:text-gray-100">
            {{ $t('help_center.shipping_methods_delivery_desc') }}
            <ul class="list-none">
              <li
                class="flex items-start text-gray-700 dark:text-gray-300 before:content-[''] before:inline-block before:w-2 before:h-2 before:bg-gray-800 dark:before:bg-gray-200 before:rounded-full before:me-2 before:mt-2">
                <span class="flex-1">
                  <span class="font-semibold text-blue-600 dark:text-blue-400">{{
                    $t('help_center.shipping_methods_delivery_desc_1') }}</span>
                  {{ $t('help_center.shipping_methods_delivery_desc_2') }}
                </span>
              </li>
              <li
                class="flex items-start text-gray-700 dark:text-gray-300 before:content-[''] before:inline-block before:w-2 before:h-2 before:bg-gray-800 dark:before:bg-gray-200 before:rounded-full before:me-2 before:mt-2">
                <span class="flex-1">
                  <span class="font-semibold text-blue-600 dark:text-blue-400">{{
                    $t('help_center.shipping_methods_delivery_desc_3') }}</span>
                  {{ $t('help_center.shipping_methods_delivery_desc_4') }}
                </span>
              </li>
              <li
                class="flex items-start text-gray-700 dark:text-gray-300 before:content-[''] before:inline-block before:w-2 before:h-2 before:bg-gray-800 dark:before:bg-gray-200 before:rounded-full before:me-2 before:mt-2">
                <span class="flex-1">
                  <span class="font-semibold text-blue-600 dark:text-blue-400">{{
                    $t('help_center.shipping_methods_delivery_desc_5') }}</span>
                  {{ $t('help_center.shipping_methods_delivery_desc_6') }}
                </span>
              </li>
            </ul>
          </span>
        </div>

        <div>
          <p class="mb-2 font-semibold text-gray-800 dark:text-gray-200"><span class="me-1">3-</span>{{
            $t('help_center.tracking_your_order') }}
          </p>
          <span class="text-base text-gray-600 dark:text-gray-100">{{ $t('help_center.tracking_your_order_desc')
          }}</span>
        </div>

        <div>
          <p class="mb-2 font-semibold text-gray-800 dark:text-gray-200"><span class="me-1">4-</span>{{
            $t('help_center.shipping_policy_delays') }}
          </p>
          <span class="text-base text-gray-600 dark:text-gray-100">{{ $t('help_center.shipping_policy_delays_desc')
          }}</span>
        </div>

        <div>
          <p class="mb-2 font-semibold text-gray-800 dark:text-gray-200"><span class="me-1">5-</span>{{
            $t('help_center.returns_exchanges') }}
          </p>
          <span class="text-base text-gray-600 dark:text-gray-100">{{ $t('help_center.returns_exchanges_desc') }}</span>
        </div>

        <div>
          <p class="mb-2 font-semibold text-gray-800 dark:text-gray-200"><span class="me-1">6-</span>{{
            $t('help_center.need_further_assistance') }}
          </p>
          <span class="text-base text-gray-600 dark:text-gray-100">{{ $t('help_center.need_further_assistance_desc')
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>