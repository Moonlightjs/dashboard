<template>
  <div>
    <v-overlay
      class="align-center justify-center"
      scroll-strategy="block"
      :close-on-content-click="false"
      v-model="isLoading"
    >
      <v-progress-circular
        size="64"
        indeterminate
        color="primary"
        v-show="isLoading"
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue";

interface Props {
  isLoading: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
});
const { isLoading } = toRefs(props);
</script>
