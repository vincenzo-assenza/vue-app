<template>
  <div class="p-6 md:p-12">
    <h1 class="text-3xl font-bold mb-6">{{ $t("categories.title") }}</h1>

    <div v-if="status.pending" class="text-center">{{ $t("common.loading") }}</div>    
    <div v-else-if="error" class="text-red-500">
      {{ $t("common.error") }} {{ error }}
    </div>

    <div class="grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" v-if="categories?.length">
      <div v-for="category in categories" :key="category.id"> 
        <div class="bg-white p-4 shadow-lg rounded-lg hover:bg-gray-100 category-item" ref="categoryCard">
          <NuxtLinkLocale :to="`/category/${category.slug}`">
            <div class="category-image">
              <NuxtImg
                format="webp"
                width="600"
                height="400"
                fit="inside" 
                class="rounded-t-lg"
                :src="category.image || '/media/category.jpg'" 
                :alt="category.name"
                placeholder
                loading="lazy"
                v-on:mouseenter="hoverAnimation"
                v-on:mouseleave="hoverOutAnimation"
              />
            </div>
            </NuxtLinkLocale>
            <div class="py-4">
              <h2 class="text-xl font-semibold">{{ category.name }}</h2>
              <p class="my-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores quia, porro ullam fugit eos commodi amet itaque, voluptatum corrupti a obcaecati odio nobis? Beatae sint unde nesciunt voluptatem mollitia repudiandae.</p>
              <NuxtLinkLocale :to="`/category/${category.slug}`" class="text-black-600 underline mt-2 inline-block" >{{ $t('categories.cta') }}</NuxtLinkLocale>
            </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useI18n } from 'vue-i18n';
  import { onMounted, ref } from "vue";
  import { gsap } from "gsap";

  const { t, locale } = useI18n();

  const categoryCard = ref([]);

  const { data: categories, status, error } = await useFetch('/api/categories', {
    headers: { 'Accept-Language': locale.value },
    watch: [locale]
  });

  useHead({
    title: computed(() => t('categories.meta.title')),
    meta: [
      {
        name: 'description',
        content: computed(() => t('categories.meta.description')),
      },
    ],
  });

  onMounted(() => {
    if (categories.value) {

      // Animation for products when they are loaded
      // GSAP Timeline for animation
      const tl = gsap.timeline({ paused: true });

      // Add staggered animation using the timeline
      tl.fromTo(
        categoryCard.value,
        { opacity: 0, y: 90 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.1
        }
      );

      // Play the timeline after everything is mounted
      tl.play();
    }
  });

  const hoverAnimation=(event) => {
    gsap.to(event.target, { scale: 1.05, duration: 2, ease: "power1.out", });
  };

  const hoverOutAnimation=(event) => {
    gsap.to(event.target, { scale: 1, duration: 2, ease: "power1.out", });
  };
 
</script>


<style scoped>
  .category-item {
    opacity: 0;
  }

  .category-image {
    overflow: hidden;
  }
</style>