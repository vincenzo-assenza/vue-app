<template>
  <header class="bg-white shadow-md sticky top-0 z-40">
    <div class="flex justify-between items-center p-6 md:px-12">
      <a href="/" class="text-1xl font-bold text-blue-600">
        <img :src="logoImage" width="150" alt="logo-alt" />
      </a>

      <!-- Navigation Desktop -->
      <nav class="hidden md:flex space-x-6">
        <NuxtLinkLocale to="/" class="text-gray-700 hover:text-blue-600">Home</NuxtLinkLocale>
        <NuxtLinkLocale to="/categories" class="text-gray-700 hover:text-blue-600">Categories</NuxtLinkLocale>
      </nav>

      <!-- Language Switcher -->
      <Language />

      <!-- Hamburger Menu -->
      <button @click="toggleMenu" class="md:hidden text-gray-700 text-2xl">
        ☰
      </button>
    </div>

    <!-- Dropdown Mobile -->
    <div v-if="menuOpen" class="md:hidden bg-white shadow-md p-4">
      <NuxtLinkLocale to="/" class="block py-2 text-gray-700 hover:text-blue-600">Home</NuxtLinkLocale>
      <NuxtLinkLocale to="/categories" class="block py-2 text-gray-700 hover:text-blue-600">Categorie</NuxtLinkLocale>
    </div>
  </header>
</template>

<script setup>
  import { ref } from "vue";
  import logoImage from '@/assets/media/logo-p.png';

  const menuOpen=ref(false);

  const toggleMenu=() => {
    menuOpen.value=!menuOpen.value;
  };
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