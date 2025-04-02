<template>
  <div class="p-6 md:p-12">
    
    <NuxtLinkLocale @click="goBack" class="cursor-pointer text-black-600 block underline  hover:underline pb-6">{{ $t('product.back') }}</NuxtLinkLocale>

    <div v-if="status === 'pending'">
      <ProductSkeleton />
    </div>
    <div v-else-if="error" class="text-red-500">
      {{ $t("common.error") }} {{ error }}
    </div>
    <div v-else="product" class="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-10 items-start">
      <div class="w-full lg:w-1/2">

        <!-- Swiper Gallery for mobile -->
        <div class="md:hidden">
          <swiper
            :modules="[Pagination, Zoom]"
            :slidesPerView="1"
            :spaceBetween="10"
            :loop="true"
            :zoom="true"
            :autoplay="{ delay: 3000 }"
            :pagination="{clickable:true}"
            class="swiper-sl"
          >
            <swiper-slide v-for="(image, index) in product.gallery" :key="index" zoom>
              <NuxtImg 
                format="webp"
                placeholder
                loading="lazy"
                :src="image" 
                :alt="product.name" 
                class="w-full h-auto rounded-lg shadow-lg" 
              />
            </swiper-slide>
          </swiper>
        </div>

        <!-- Gallery for desktop --> 
        <div class="hidden md:block">
          <div class="space-y-4">
            <NuxtImg
              format="webp"
              width="980"
              height="980"
              placeholder
              loading="lazy"
              :src="product.gallery[0]" 
              :alt="product.name" 
              class="rounded-lg shadow-lg w-full h-auto mb-4" 
            />
            <NuxtImg
              format="webp"
              width="980"
              height="980"
              placeholder
              :src="product.gallery[1]" 
              :alt="product.name" 
              class="rounded-lg shadow-lg w-full h-auto" 
            />
          </div>
        </div>
      </div>

      <div class="w-full lg:w-1/2 sticky top-30">
        <!-- Product Name -->
        <h1 class="text-3xl font-bold text-gray-900">{{ product.name }}</h1>
        <!-- <p class="text-xl text-gray-700 mt-2">{{ product.price | currency }}</p> -->

        <!-- Rating -->
        <div class="flex items-center mt-2">
          <span class="text-yellow-500">⭐⭐⭐⭐⭐</span>
          <span class="ml-2 text-gray-600">({{ product.reviews }} {{ $t('product.reviews') }})</span>
        </div>

        <!-- Long description -->
        <p class="text-gray-600 mt-4">{{ product.longDescription }}</p>

        <!-- Product details -->
        <div class="mt-6">
          <p class="font-semibold text-gray-800">{{ $t('product.availability') }}</p>
          <p class="text-gray-600">{{ product.availability }}</p>

          <p class="font-semibold text-gray-800 mt-4">{{ $t('product.colors') }}</p>
          <div class="flex space-x-4 mt-2">
            <span v-for="color in product.colors" :key="color" class="bg-gray-200 px-4 py-2 rounded-lg text-gray-800">
              {{ color }}
            </span>
          </div>

          <p class="font-semibold text-gray-800 mt-4">{{ $t('product.shipping_time') }}</p>
          <p class="text-gray-600">{{ product.deliveryTime }}</p>

          <p class="font-semibold text-gray-800 mt-4">{{ $t('product.dimensions') }}</p>
          <p class="text-gray-600">{{ product.dimensions.width }} x {{ product.dimensions.height }} x {{ product.dimensions.depth }}</p>

          <p class="font-semibold text-gray-800 mt-4">{{ $t('product.materials') }}</p>
          <div class="flex space-x-4 mt-2">
            <span v-for="material in product.materials" :key="material" class="bg-gray-200 px-4 py-2 rounded-lg text-gray-800">
              {{ material }}
            </span>
          </div>
        </div>

        <!-- Add to cart -->
        <div class="mt-6">
          <button @click="addToCart(product.name)" class="bg-black text-white px-6 py-2 rounded-lg cursor-pointer transition w-full">
            {{ $t("product.add_to_cart") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { Pagination, Zoom } from "swiper/modules";
  import 'swiper/css/bundle';
  import { onMounted } from 'vue';

  const route = useRoute();
  const { locale } = useI18n();

  const { data: product, status, error } = await useFetch(`/api/products/${route.params.slug}`, {
    headers: { 'accept-language': locale.value },
    watch: [locale],
  });

  const addToCart =(name) => {
    alert(`${name} aggiunto al carrello!`);
  };

  const goBack=() => {
    window.history.back();
  };

  onMounted(() => {
    if (product.value) {

      const origin = useRequestURL().origin
      const hreflangs = Object.keys(product.value.translations).map((lang) => {
        const translation = product.value.translations[lang];
        return {
          rel: 'alternate',
          hreflang: lang,
          href: `${origin}/${lang}/product/${translation.slug}`,
        };
      });

      useHead({
        title: product.value.name,
        meta: [
          {
            name: 'description',
            content: product.value.longDescription,
          }
        ],
        link: hreflangs, 
      });
    }
  });
</script>
