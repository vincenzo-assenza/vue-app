<template>
  <div class="p-6 md:p-12">

    <div v-if="pendingCat">Caricamento...</div>
    <div v-else class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">{{ category?.name }}</h1>
    </div>

    <p v-if="pendingProducts" class="text-gray-500">Caricamento prodotti...</p>
    <p v-else-if="errorProducts" class="text-red-500">Errore nel caricamento</p>

    <div v-else class="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
      <div v-for="product in products" :key="product.id" class="bg-white p-4 shadow-md rounded-lg">
        <NuxtLinkLocale :to="`/product/${product.slug}`">
        <img :src="product.image" :alt="product.name" class="w-full h-75 object-cover">
        </NuxtLinkLocale>
        <h2 class="text-lg font-semibold mt-2">{{ product.name }}</h2>
        <p class="text-sm  mt-2 mb-2">{{ product.description }}</p>
        <p class="text-gray-600">{{ product.price }} €</p>
        <NuxtLinkLocale :to="`/product/${product.slug}`" class="text-blue-600 hover:underline mt-2 inline-block">
          Scheda prodotto
        </NuxtLinkLocale>
      </div>
    </div>
  </div>
</template>

<script setup>
  const route = useRoute();
  const { locale } = useI18n();

  const { data: category, pendingCat, errorCat } = await useFetch(`/api/categories/${route.params.slug}`, {
    headers: { 'accept-language': locale.value },
    watch: [locale],
  });

  const { data: products, pendingProducts, errorProducts } = await useFetch(`/api/products`, {
    headers: { 'accept-language': locale.value },
    watch: [locale],
  });
</script>