<template>
  <div>
    <div class="p-5 mx-auto border border-gray-200 rounded-lg shadow-lg max-w-7xl">
      <h2 class="text-2xl font-bold text-center mb-7">{{ $t('help_center.Payment_issues') }}</h2>
      <div class="space-y-6">
        <div>
          <p class="mb-2 font-semibold text-gray-800 dark:text-gray-200"><span class="me-1">1-</span>{{
            $t('help_center.common_payment_problems') }}
          </p>
          <span class="text-base text-gray-600 dark:text-gray-100">
            <ul class="space-y-2 list-none">
              <li
                class="flex items-start text-gray-700 dark:text-gray-300 before:content-[''] before:inline-block before:w-2 before:h-2 before:bg-gray-800 dark:before:bg-gray-200 before:rounded-full before:me-2 before:mt-2">
                <span class="flex-1">
                  <span class="font-semibold text-blue-600 dark:text-blue-400">{{ $t('help_center.payment_declined')
                    }}</span>
                  <p>{{ $t('help_center.payment_declined_desc') }}</p>
                </span>
              </li>
              <li
                class="flex items-start text-gray-700 dark:text-gray-300 before:content-[''] before:inline-block before:w-2 before:h-2 before:bg-gray-800 dark:before:bg-gray-200 before:rounded-full before:me-2 before:mt-2">
                <span class="flex-1">
                  <span class="font-semibold text-blue-600 dark:text-blue-400">{{ $t('help_center.failed_transaction')
                  }}</span>
                  <p>{{ $t('help_center.failed_transaction_desc') }}</p>
                </span>
              </li>
              <li
                class="flex items-start text-gray-700 dark:text-gray-300 before:content-[''] before:inline-block before:w-2 before:h-2 before:bg-gray-800 dark:before:bg-gray-200 before:rounded-full before:me-2 before:mt-2">
                <span class="flex-1">
                  <span class="font-semibold text-blue-600 dark:text-blue-400">{{
                    $t('help_center.double_charges_or_incorrect_amounts') }}</span>
                  <p>{{ $t('help_center.double_charges_or_incorrect_amounts_desc') }}</p>
                </span>
              </li>
              <li
                class="flex items-start text-gray-700 dark:text-gray-300 before:content-[''] before:inline-block before:w-2 before:h-2 before:bg-gray-800 dark:before:bg-gray-200 before:rounded-full before:me-2 before:mt-2">
                <span class="flex-1">
                  <span class="font-semibold text-blue-600 dark:text-blue-400">{{
                    $t('help_center.currency_conversion_issues') }}</span>
                  <p>{{ $t('help_center.currency_conversion_issues_desc') }}</p>
                </span>
              </li>
            </ul>
          </span>
        </div>

        <div>
          <p class="mb-2 font-semibold text-gray-800 dark:text-gray-200"><span class="me-1">2-</span>{{
            $t('help_center.what_to_do_if_you_encounter_payment_issues') }}
          </p>
          <span class="text-base text-gray-600 dark:text-gray-100">
            <ul class="space-y-2 list-none">
              <li
                class="flex items-start text-gray-700 dark:text-gray-300 before:content-[''] before:inline-block before:w-2 before:h-2 before:bg-gray-800 dark:before:bg-gray-200 before:rounded-full before:me-2 before:mt-2">
                <span class="flex-1">
                  <span class="font-semibold text-blue-600 dark:text-blue-400">{{
                    $t('help_center.what_to_do_if_you_encounter_payment_issues_desc') }}</span>
                  <p>{{ $t('help_center.what_to_do_if_you_encounter_payment_issues_desc_1') }}</p>
                </span>
              </li>
              <li
                class="flex items-start text-gray-700 dark:text-gray-300 before:content-[''] before:inline-block before:w-2 before:h-2 before:bg-gray-800 dark:before:bg-gray-200 before:rounded-full before:me-2 before:mt-2">
                <span class="flex-1">
                  <span class="font-semibold text-blue-600 dark:text-blue-400">{{
                    $t('help_center.what_to_do_if_you_encounter_payment_issues_desc_2') }}</span>
                  <p>{{ $t('help_center.what_to_do_if_you_encounter_payment_issues_desc_3') }}</p>
                </span>
              </li>
              <li
                class="flex items-start text-gray-700 dark:text-gray-300 before:content-[''] before:inline-block before:w-2 before:h-2 before:bg-gray-800 dark:before:bg-gray-200 before:rounded-full before:me-2 before:mt-2">
                <span class="flex-1">
                  <span class="font-semibold text-blue-600 dark:text-blue-400">{{
                    $t('help_center.what_to_do_if_you_encounter_payment_issues_desc_4') }}</span>
                  <p>{{ $t('help_center.what_to_do_if_you_encounter_payment_issues_desc_5') }}</p>
                </span>
              </li>
              <li
                class="flex items-start text-gray-700 dark:text-gray-300 before:content-[''] before:inline-block before:w-2 before:h-2 before:bg-gray-800 dark:before:bg-gray-200 before:rounded-full before:me-2 before:mt-2">
                <span class="flex-1">
                  <span class="font-semibold text-blue-600 dark:text-blue-400">{{
                    $t('help_center.what_to_do_if_you_encounter_payment_issues_desc_6') }}</span>
                  <p>{{ $t('help_center.what_to_do_if_you_encounter_payment_issues_desc_7') }}</p>
                </span>
              </li>
            </ul>
          </span>
        </div>

        <div>
          <p class="mb-2 font-semibold text-gray-800 dark:text-gray-200"><span class="me-1">3-</span>{{
            $t('help_center.need_further_assistance') }}</p>
          <span class="text-base text-gray-600 dark:text-gray-100">{{
            $t('help_center.what_to_do_if_you_encounter_payment_issues_desc_8') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>