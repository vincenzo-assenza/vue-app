<template>
  <div class="p-6 md:p-12">
    <NuxtLinkLocale @click="goBack" class="text-blue-600 hover:underline">Torna alla lista prodotti</NuxtLinkLocale>
    <!-- Dettaglio prodotto -->
    <div v-if="product" class="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-10 items-start">
      <div class="w-full lg:w-1/2">
        <!-- Galleria immagini prodotto -->

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
        <!-- Nome prodotto -->
        <h1 class="text-3xl font-bold text-gray-900">{{ product.name }}</h1>
        <!-- <p class="text-xl text-gray-700 mt-2">{{ product.price | currency }}</p> -->

        <!-- Rating e recensioni -->
        <div class="flex items-center mt-2">
          <span class="text-yellow-500">⭐⭐⭐⭐⭐</span>
          <span class="ml-2 text-gray-600">({{ product.reviews }} recensioni)</span>
        </div>

        <!-- Descrizione breve prodotto -->
        <p class="text-gray-600 mt-4">{{ product.longDescription }}</p>

        <!-- Dettagli prodotto -->
        <div class="mt-6">
          <p class="font-semibold text-gray-800">Disponibilità:</p>
          <p class="text-gray-600">{{ product.availability }}</p>

          <p class="font-semibold text-gray-800 mt-4">Colori disponibili:</p>
          <div class="flex space-x-4 mt-2">
            <span v-for="color in product.colors" :key="color" class="bg-gray-200 px-4 py-2 rounded-lg text-gray-800">
              {{ color }}
            </span>
          </div>

          <p class="font-semibold text-gray-800 mt-4">Tempo di consegna:</p>
          <p class="text-gray-600">{{ product.deliveryTime }}</p>

          <p class="font-semibold text-gray-800 mt-4">Dimensioni:</p>
          <p class="text-gray-600">{{ product.dimensions.width }} x {{ product.dimensions.height }} x {{ product.dimensions.depth }}</p>

          <p class="font-semibold text-gray-800 mt-4">Materiali:</p>
          <div class="flex space-x-4 mt-2">
            <span v-for="material in product.materials" :key="material" class="bg-gray-200 px-4 py-2 rounded-lg text-gray-800">
              {{ material }}
            </span>
          </div>
        </div>

        <!-- Aggiungi al carrello -->
        <div class="mt-6">
          <button @click="addToCart(product.name)" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition w-full">
            Aggiungi al carrello
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { Swiper, SwiperSlide } from 'swiper/vue';  // Import Swiper and SwiperSlide
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