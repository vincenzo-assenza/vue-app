<template>
  <header class="bg-white shadow-md sticky top-0 z-40">
    <div class="flex justify-between items-center p-6 md:px-12">
      <NuxtLinkLocale href="/">
        <img :src="logoImage" width="150" :alt="$t('logo.alt')" />
      </NuxtLinkLocale>

      <!-- Navigation Desktop -->
      <nav class="hidden md:flex space-x-6">
        <NuxtLinkLocale to="/" class="text-gray-700 hover:text-blue-600">{{ $t('common.home') }}</NuxtLinkLocale>
        <NuxtLinkLocale to="/categories" class="text-gray-700 hover:text-blue-600">{{ $t('categories.title') }}</NuxtLinkLocale>
      </nav>

      <!-- Language Switcher -->
      <div class="md:block hidden">
        <Language />
      </div>

      <!-- Hamburger Menu -->
      <button @click="toggleMenu" class="md:hidden text-gray-700 text-2xl">
        ☰
      </button>
    </div>

    <!-- Dropdown Mobile -->
    <div v-if="menuOpen" class="md:hidden bg-white shadow-md p-6 absolute w-full">
      <NuxtLinkLocale to="/" class="block py-2 text-gray-700 hover:text-blue-600">{{ $t('common.home') }}</NuxtLinkLocale>
      <NuxtLinkLocale to="/categories" class="block py-2 text-gray-700 hover:text-blue-600">{{ $t('categories.title') }}</NuxtLinkLocale>

      <div class="md:hidden block absolute right-6 top-6">
        <Language />
      </div>
    </div>
  </header>
</template>

<script setup>
  import { useRoute } from "vue-router";
  import { ref } from "vue";
  import logoImage from '@/assets/media/logo-p.png';

  const route=useRoute();
  const menuOpen=ref(false);

  const toggleMenu=() => {
    menuOpen.value=!menuOpen.value;
  };

  watch(() => route.fullPath, () => {
    menuOpen.value=false;
  });
</script>

<style>
  .page-enter-active,
  .page-leave-active {
    transition: all 0.3s;
  }

  .page-enter-from,
  .page-leave-to {
    opacity: 0;
    filter: blur(0.2);
  }
</style>