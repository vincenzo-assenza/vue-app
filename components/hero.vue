<template>
<section class="relative w-full h-screen flex items-center justify-center bg-cover bg-center text-white md:items-start md:justify-start" :style="bgStyle">
    <div class="text-center md:text-left md:p-12 p-6">
      <h1 class="text-4xl md:text-6xl font-bold mb-4">{{ $t('hero_title') }}</h1>
      <p class="text-lg md:text-xl mb-6 w-60 md:w-90">{{ $t('hero_subtitle') }}</p>
      <NuxtLinkLocale to="/categories" class="bg-stone-950 hover:bg-stone-800 text-white font-bold py-4 my-3 px-6 rounded-lg transition-all inline-block">
        {{ $t('hero_cta') }}
      </NuxtLinkLocale>
    </div>
    </section>
</template>

<script setup>
    import { computed } from 'vue';
    import bgImage from '@/assets/media/hero.jpeg'
    const bgStyle=computed(() => ({ backgroundImage: `url(${bgImage})` }));
</script>