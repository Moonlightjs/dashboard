<template>
  <Sidebar />
  <Header />
  <v-main>
    <v-container class="py-8 px-6">
      <router-view></router-view>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Header from '@/layouts/partials/Header.vue'
import Sidebar from '@/layouts/partials/Sidebar.vue'
</script>

