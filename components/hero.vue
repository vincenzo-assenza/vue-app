<template>
  <section 
    class="relative w-full h-screen flex items-center justify-center bg-cover bg-center text-white md:items-start md:justify-start" 
    :style="bgStyle"
  >
    <div class="text-center md:text-left md:p-12 p-6 sticky top-20">
      <h1 ref="titleRef" class="opacity-0 title text-4xl md:text-6xl font-bold mb-4">
        {{ $t('hero.title') }}
      </h1>
      <p ref="subtitleRef" class="opacity-0 subtitle text-lg md:text-xl mb-6 w-60 md:w-90">
        {{ $t('hero.subtitle') }}
      </p>
      <div class="cta opacity-0" ref="ctaRef">
        <NuxtLinkLocale 
          to="/categories" 
          class="bg-stone-950 hover:bg-stone-800 text-white font-bold py-4 my-3 px-6 rounded-lg inline-block"
        >
          {{ $t('hero.cta') }}
        </NuxtLinkLocale>
      </div>
    </div>
  </section>
</template>

<script setup>
  import { gsap } from "gsap";
  import { computed, ref, onMounted } from 'vue';
  import bgImage from '@/assets/media/hero.jpeg';

  const bgStyle=computed(() => ({ backgroundImage: `url(${bgImage})` }));

  const titleRef=ref(null);
  const subtitleRef=ref(null);
  const ctaRef=ref(null);

  onMounted(() => {
    const tl=gsap.timeline();

    tl.fromTo(titleRef.value,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.5, ease: "power1.out" }
    )
      .fromTo(subtitleRef.value,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power1.out" },
        "-=0.5"
      )
      .fromTo(ctaRef.value,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 1.2, ease: "power1.out" },
        "-=0.6"
      );
  });
</script>
