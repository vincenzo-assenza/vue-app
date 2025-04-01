<template>
  <div class="p-6 md:p-12">
    <div v-if="statusCat.pending">{{ $t("common.loading") }}</div>
    <div v-else-if="errorCat" class="text-red-500">
      {{ $t("common.error") }} {{ errorCat }}
    </div>

    <div v-else class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">{{ category?.name }}</h1>
    </div>

    <p v-if="statusProducts.pending" class="text-gray-500">{{ $t("common.loading") }}</p>
    <p v-else-if="errorProducts" class="text-red-500">{{ $t("common.error") }} {{ errorProducts }}</p>

    <div v-if="products" class="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
      <div 
        v-for="(product) in products" 
        :key="product.id"
        ref="productCards" 
        class="bg-white p-4 shadow-md rounded-lg product-card opacity-0"
        :data-id="product.id"
        @mouseenter="hoverAnimation(product.id)"
        @mouseleave="hoverOutAnimation(product.id)"
      >
        <NuxtLinkLocale :to="`/product/${product.slug}`" class="block relative">
          <NuxtImg :src="product.image" :alt="product.name" loading="lazy" placeholder class="w-full h-75 object-cover z-3 relative" />
          <NuxtImg src="https://placehold.co/300x300/000000/FFFFFF?text=HOVER" 
            :alt="product.name" 
            loading="lazy" 
            placeholder 
            class="hover-image w-full h-75 object-cover absolute z-3 top-0 opacity-0" />
        </NuxtLinkLocale>
        <NuxtLinkLocale :to="`/product/${product.slug}`" class="text-black-600 hover:underline mt-2 inline-block">
          <h2 class="text-lg font-semibold mt-2">{{ product.name }}</h2>
        </NuxtLinkLocale>
        <p class="text-sm  mt-2 mb-2">{{ product.description }}</p>
        <p class="text-gray-600">{{ product.price }} €</p>
        <NuxtLinkLocale :to="`/product/${product.slug}`" class="text-black-600 underline mt-2 inline-block">
          {{ $t("product.cta") }}
        </NuxtLinkLocale>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue';
  import { gsap } from "gsap";

  const route=useRoute();
  const { locale }=useI18n();

  const { data: category, status: statusCat, error: errorCat }=useFetch(`/api/categories/${route.params.slug}`, {
    headers: { 'accept-language': locale.value },
    watch: [locale],
  });

  const { data: products, status: statusProducts, error: errorProducts }=await useFetch(`/api/products`, {
    headers: { 'accept-language': locale.value },
    watch: [locale],
  });

  const productCards = ref([]);

  // Entry animation for products when the page is loaded
  onMounted(() => {
    if (category.value) {
      const origin=useRequestURL().origin;

      const hreflangs=Object.keys(category.value.translations).map((lang) => {
        const translation=category.value.translations[lang];
        return {
          rel: 'alternate',
          hreflang: lang,
          href: `${origin}/${lang}/category/${translation.slug}`,
        };
      });

      useHead({
        title: category.value.name,
        meta: [
          {
            name: 'description',
            content: category.value.description||'',
          },
          {
            name: 'robots',
            content: 'index, follow',
          },
        ],
        link: hreflangs,
      });
    }

    if (products.value) {
      // Animation for products when they are loaded
      const tl=gsap.timeline({ paused: true });

      // Add staggered animation using the timeline
      tl.fromTo(
        productCards.value,
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

  // Add animation on mouse hover
  const hoverAnimation=(productId) => {
    gsap.to(`.product-card[data-id="${productId}"] .hover-image`, { opacity: 1, duration: 0.4, ease: "power1.out" });
  };

  const hoverOutAnimation=(productId) => {
    gsap.to(`.product-card[data-id="${productId}"] .hover-image`, { opacity: 0, duration: 0.4, ease: "power1.out" });
  };
</script>
