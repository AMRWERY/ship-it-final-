<template>
  <div>
    <!-- breadcrumb component -->
    <breadcrumb />
    
    <p>Profile Page</p>
  </div>
</template>

<script setup>
const { t } = useI18n()

definePageMeta({
  layout: 'dashboard'
})

useHead({
  titleTemplate: () => t("head.profile"),
});
</script>