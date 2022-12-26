<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script setup lang="ts">
import CookieControl from '@/utils/CookieControl';
import { ref } from 'vue';
import Header from './layouts/components/Header.vue'
import Sidebar from './layouts/components/Sidebar.vue'

const cards = ref(['Today', 'Yesterday']);
CookieControl.init();
</script>
