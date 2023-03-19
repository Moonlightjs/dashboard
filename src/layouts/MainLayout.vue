<template>
  <Sidebar />
  <Header />
  <v-main>
    <v-container class="py-8 px-6">
      <router-view></router-view>
    </v-container>
  </v-main>
  <ProgressLoading :is-loading="globalAppStore.isProgressCircularLoading" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Header from '@/layouts/partials/Header.vue'
import Sidebar from '@/layouts/partials/Sidebar.vue'
import ProgressLoading from '@/components/progress/ProgressLoading.vue';
import { useGlobalAppStore } from "@/store/app";
const globalAppStore = useGlobalAppStore();
</script>

