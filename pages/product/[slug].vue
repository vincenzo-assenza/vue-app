<template>
  <div class="p-6 md:p-12">
    
    <NuxtLinkLocale @click="goBack" class="text-black-600 block underline  hover:underline pb-6">{{ $t('back') }}</NuxtLinkLocale>

    <div v-if="product" class="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-10 items-start">
      <div class="w-full lg:w-1/2">

        <!-- Product Gallery -->
        <div class="md:hidden">
          <swiper
            :modules="[Pagination, Zoom]"
            :slidesPerView="1"
            :spaceBetween="10"
            :loop="true"
            :zoom="true"
            :autoplay="{ delay: 3000 }"
            :pagination="{clickable:true}"
            class="mySwiper"
          >
            <swiper-slide v-for="(image, index) in product.gallery" :key="index" zoom>
              <img 
                :src="image" 
                :alt="product.name" 
                class="w-full h-auto rounded-lg shadow-lg" 
              />
            </swiper-slide>
          </swiper>
        </div>
                <div class="hidden md:block">

        <div class="space-y-4">
          <img 
            :src="product.gallery[0]" 
            :alt="product.name" 
            class="rounded-lg shadow-lg w-full h-auto mb-4" 
          />
          <img 
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
          <span class="ml-2 text-gray-600">({{ product.reviews }} {{ $t('reviews') }})</span>
        </div>

        <!-- Long description -->
        <p class="text-gray-600 mt-4">{{ product.longDescription }}</p>

        <!-- Product details -->
        <div class="mt-6">
          <p class="font-semibold text-gray-800">{{ $t('availability') }}</p>
          <p class="text-gray-600">{{ product.availability }}</p>

          <p class="font-semibold text-gray-800 mt-4">{{ $t('colors') }}</p>
          <div class="flex space-x-4 mt-2">
            <span v-for="color in product.colors" :key="color" class="bg-gray-200 px-4 py-2 rounded-lg text-gray-800">
              {{ color }}
            </span>
          </div>

          <p class="font-semibold text-gray-800 mt-4">{{ $t('shipping_time') }}</p>
          <p class="text-gray-600">{{ product.deliveryTime }}</p>

          <p class="font-semibold text-gray-800 mt-4">{{ $t('dimensions') }}</p>
          <p class="text-gray-600">{{ product.dimensions.width }} x {{ product.dimensions.height }} x {{ product.dimensions.depth }}</p>

          <p class="font-semibold text-gray-800 mt-4">{{ $t('materials') }}</p>
          <div class="flex space-x-4 mt-2">
            <span v-for="material in product.materials" :key="material" class="bg-gray-200 px-4 py-2 rounded-lg text-gray-800">
              {{ material }}
            </span>
          </div>
        </div>

        <!-- Add to cart -->
        <div class="mt-6">
          <button @click="addToCart(product.name)" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition w-full">
            {{ $t("add_to_cart") }}
          </button>
        </div>
      </div>
    </div>
    <div v-else-if="status.pending">
      {{ $('loading') }}
    </div>
  </div>
</template>

<script setup>
  import { Swiper, SwiperSlide } from 'swiper/vue'; 
  import { Pagination, Zoom } from "swiper/modules";
  import 'swiper/css/bundle';

  const route = useRoute();
  const { locale } = useI18n();

  const { data: product, status, error } = await useFetch(`/api/products/${route.params.slug}`, {
    headers: { 'accept-language': locale.value },
    watch: [locale],
  });

  const addToCart=(name) => {
    alert(`${name} aggiunto al carrello!`);
  };

  const goBack=() => {
    window.history.back();
  };
</script>