<template>
  <div class="p-6 md:p-12">
    <h1 class="text-3xl font-bold mb-6">Categorie</h1>

    <div v-if="status.pending" class="text-center">Loading...</div>    

    <div v-if="categories?.length">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLinkLocale
          v-for="category in categories" 
          :key="category.id" 
          :to="`/category/${category.slug}`" 
          class="bg-white p-4 shadow-lg rounded-lg hover:bg-gray-100 transition"
        >
          <NuxtImg
            width="600"
            height="400"
            fit="inside" 
            class="rounded-t-lg"
            :src="category.image || '/media/category.jpg'" 
            :alt="category.name"
            :placeholder="[600, 600]"
          />
          <div class="p-4">
            <h2 class="text-xl font-semibold">{{ category.name }}</h2>
          </div>
        </NuxtLinkLocale>
      </div>
    </div>

    <div v-if="error" class="text-red-500">
      Errore nel caricamento delle categorie: {{ error }}
    </div>
  </div>
</template>

<script setup>

  import { useI18n } from 'vue-i18n';
  import { useFetch } from '#app';

  const { locale } = useI18n();

  const { data: categories, status, error }=useFetch('/api/categories', {
    headers: { 'Accept-Language': locale.value },
    watch: [locale]
  });
</script>
