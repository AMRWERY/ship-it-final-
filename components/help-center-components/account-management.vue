<template>
  <div>
    <div class="p-5 mx-auto border border-gray-200 rounded-lg shadow-lg max-w-7xl">
      <h2 class="text-2xl font-bold text-center mb-7">{{ $t('help_center.account_management') }}</h2>
      <div class="space-y-6">
        <div>
          <p class="mb-2 font-semibold text-gray-800 dark:text-gray-200"><span class="me-1">1-</span>{{
            $t('help_center.creating_an_account') }}
          </p>
          <span class="text-base text-gray-600 dark:text-gray-100">{{ $t('help_center.creating_an_account_desc')
            }}</span>
        </div>

        <div>
          <p class="mb-2 font-semibold text-gray-800 dark:text-gray-200"><span class="me-1">2-</span>{{
            $t('help_center.logging_in') }}</p>
          <span class="text-base text-gray-600 dark:text-gray-100">{{ $t('help_center.logging_in_desc') }}</span>
        </div>

        <div>
          <p class="mb-2 font-semibold text-gray-800 dark:text-gray-200"><span class="me-1">3-</span>{{
            $t('help_center.password_reset_and_security') }}</p>
          <span class="text-base text-gray-600 dark:text-gray-100">{{ $t('help_center.password_reset_and_security_desc')
            }}</span>
        </div>

        <div>
          <p class="mb-2 font-semibold text-gray-800 dark:text-gray-200"><span class="me-1">4-</span>{{
            $t('help_center.updating_your_profile') }}</p>
          <span class="text-base text-gray-600 dark:text-gray-100">{{ $t('help_center.updating_your_profile_desc')
            }}</span>
        </div>

        <div>
          <p class="mb-2 font-semibold text-gray-800 dark:text-gray-200"><span class="me-1">5-</span>{{
            $t('help_center.managing_orders_and_returns') }}</p>
          <span class="text-base text-gray-600 dark:text-gray-100">{{ $t('help_center.managing_orders_and_returns_desc')
            }}.</span>
        </div>

        <div>
          <p class="mb-2 font-semibold text-gray-800 dark:text-gray-200"><span class="me-1">6-</span>{{
            $t('help_center.privacy_and_data_protection') }}</p>
          <span class="text-base text-gray-600 dark:text-gray-100">{{ $t('help_center.privacy_and_data_protection_desc')
            }}</span>
        </div>

        <div>
          <p class="mb-2 font-semibold text-gray-800 dark:text-gray-200"><span class="me-1">7-</span>{{
            $t('help_center.need_more_help') }}</p>
          <span class="text-base text-gray-600 dark:text-gray-100">{{ $t('help_center.need_more_help_desc') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>