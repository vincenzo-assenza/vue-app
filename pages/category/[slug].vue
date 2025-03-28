<template>
  <div class="p-6 md:p-12">

    <div v-if="statusCat.pending">{{ $t("loading") }}</div>
    <div v-else-if="error" class="text-red-500">
      {{ $t("error") }} {{ error }}
    </div>

    <div v-else class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">{{ category?.name }}</h1>
    </div>

    <p v-if="statusProducts.pending" class="text-gray-500">{{ $t("loading") }}</p>
    <p v-else-if="errorProducts" class="text-red-500">{{ $t("error") }}</p>

    <div v-else class="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
      <div v-for="product in products" :key="product.id" class="bg-white p-4 shadow-md rounded-lg">
        <NuxtLinkLocale :to="`/product/${product.slug}`">
          <NuxtImg :src="product.image" :alt="product.name" class="w-full h-75 object-cover" />
        </NuxtLinkLocale>
        <NuxtLinkLocale :to="`/product/${product.slug}`" class="text-black-600 hover:underline mt-2 inline-block">
          <h2 class="text-lg font-semibold mt-2">{{ product.name }}</h2>
        </NuxtLinkLocale>
        <p class="text-sm  mt-2 mb-2">{{ product.description }}</p>
        <p class="text-gray-600">{{ product.price }} €</p>
        <NuxtLinkLocale :to="`/product/${product.slug}`" class="text-black-600 underline mt-2 inline-block">
          {{ $t("product_cta") }}
        </NuxtLinkLocale>
      </div>
    </div>
  </div>
</template>

<script setup>
  const route = useRoute();
  const { locale } = useI18n();

  const { data: category, status: statusCat, error: errorCat } = await useFetch(`/api/categories/${route.params.slug}`, {
    headers: { 'accept-language': locale.value },
    watch: [locale],
  });

  const { data: products, status: statusProducts, error: errorProducts } = await useFetch(`/api/products`, {
    headers: { 'accept-language': locale.value },
    watch: [locale],
  });
</script>