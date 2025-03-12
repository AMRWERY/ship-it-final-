<template>
  <div>
    <!-- share via social media -->
    <div class="mt-12 space-y-2">
      <p class="text-base text-gray-700 dark:text-gray-100">{{ $t('social_media.share_my') }} {{
        $t(`breadcrumb.${normalizedItemName}`) }}
        {{ $t('social_media.via') }}</p>
      <div class="flex items-center space-s-4">
        <SocialShare network="facebook" :styled="false" :label="false"
          class="p-0.5 text-white bg-blue-700 border rounded-md" />
        <SocialShare network="twitter" user="Amr" :hashtags="itemName" :styled="false" :label="false"
          class="p-0.5 text-white bg-black border rounded-md" />
        <SocialShare network="whatsapp" :title="`Check my ${itemName} 😄`" :styled="false" :label="false"
          class="p-0.5 text-white bg-green-500 border rounded-md" />
        <SocialShare network="telegram" :title="`Check my ${itemName} 😄`" url="https://web.telegram.org/a/"
          :styled="false" :label="false" class="p-0.5 text-white bg-blue-500 border rounded-md" />
        <SocialShare network="email" :title="`Check my ${itemName} 😄`" :styled="false" :label="false"
          class="p-0.5 text-white bg-red-500 border rounded-md" />
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();

const itemName = computed(() => {
  if (route.meta && route.meta.itemName) {
    return route.meta.itemName;
  }
  const baseName = route.name?.split('___')[0] || '';
  return baseName
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toLowerCase());
});

const normalizedItemName = computed(() => {
  return itemName.value.toLowerCase().replace(/\s+/g, '_');
});
</script>