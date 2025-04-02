<template>
  <div class="flex flex-col min-h-screen">
      <Header />
          <slot />
      <Footer />
  </div>
</template>

<script setup>
  const route = useRoute()
  const { t } = useI18n()

  useHead({
    title: computed(() => t(route.meta.title??'layouts.title')),
    meta: [
      {
        name: 'description',
        content: computed(() => t(route.meta.description??'layouts.description')),
      },
      {
        name: 'robots',
        content: 'index, follow',
      },
    ],
  });
</script>