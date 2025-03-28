<template>
  <div class="text-left">
    <button @click="toggleDropdown" class="px-4 py-2 bg-gray-200 rounded-md flex items-center">
      {{ currentLanguage.label }}
      <svg class="w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    <div v-if="isOpen" class="absolute mt-2 w-auto bg-white border rounded-md shadow-lg">
      <ul>
        <li v-for="lang in languages" :key="lang.code" @click="switchLanguage(lang.code)" class="px-4 py-2 hover:bg-gray-100 cursor-pointer">
          {{ lang.label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRouter, useRoute } from 'vue-router';

  const { locale }=useI18n();
  const router=useRouter();
  const isOpen=ref(false);
  const languages=ref([
    { code: 'it', label: '🇮🇹' },
    { code: 'en', label: '🇬🇧' },
    { code: 'es', label: '🇪🇸' }
  ]);

  const currentLanguage=computed(() => languages.value.find(lang => lang.code===locale.value)||languages.value[0]);

  const toggleDropdown=() => {
    isOpen.value=!isOpen.value;
  };

  const switchLanguage=(lang) => {
    locale.value=lang;
    isOpen.value=false;
    router.push({ path: `/${lang}` });
  };
</script>