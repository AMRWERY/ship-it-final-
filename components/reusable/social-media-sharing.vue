<template>
  <div>
    <!-- share via social media -->
    <div class="space-y-2 mt-7">
      <p class="text-base text-gray-700">{{ $t('social_media.share_my') }} {{ $t(`breadcrumb.${normalizedItemName}`) }}
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

    <!-- share via email only -->
    <!-- <a href="mailto:?subject=My Wishlist&body=Check out my wishlist!" class="flex items-center space-s-2 mt-7">
        <icon name="ic:outline-mail" class="text-gray-700" size="19px" />
        <p class="text-[13px] text-gray-700">Share my Wishlist Via Email</p>
      </a> -->
  </div>
</template>

<script setup>
const route = useRoute();

const itemName = computed(() => {
  if (route.meta && route.meta.itemName) {
    return route.meta.itemName;
  }
  if (route.name) {
    return route.name
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (char) => char.toLowerCase());
  }
  const pathSegments = route.path.split('/');
  return pathSegments[pathSegments.length - 1] || 'Unknown';
});

const normalizedItemName = computed(() => {
  return itemName.value.toLowerCase().replace(/\s+/g, '_');
});
</script>