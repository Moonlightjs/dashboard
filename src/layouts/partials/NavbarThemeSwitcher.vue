<script setup lang="ts">
import { ref, mergeProps, watch } from "vue";
import { useTheme } from 'vuetify';
import { useGlobalAppStore } from '../../store/app';

const vuetifyTheme = useTheme()
const globalAppStore = useGlobalAppStore()
watch(vuetifyTheme.global.name, val => {
  globalAppStore.switchTheme(val)
});
const changeTheme = () => {
  vuetifyTheme.global.name.value = globalAppStore.theme === "light" ? "dark" : "light";
}

</script>

<template>
  <v-btn :prepend-icon="
  globalAppStore.theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'
" @click="changeTheme">Toggle Theme</v-btn>
</template>
