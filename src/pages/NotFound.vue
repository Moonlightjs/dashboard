
<template>
  <div class="misc-wrapper">
    <ErrorHeader error-code="404" error-title="Page Not Found ⚠️"
      error-description="We couldn't find the page you are looking for." />

    <div class="misc-avatar w-100 text-center">
      <v-img :src="misc404" alt="Coming Soon" :max-width="800" class="mx-auto" />
      <v-btn to="/" class="mt-10">
        Back to Home
      </v-btn>
    </div>
  </div>
</template>
<script setup lang="ts">
import misc404 from '@/assets/images/pages/404.png'
</script>

<style lang="scss">
@use "@core/scss/pages/misc.scss";

.misc-footer-tree {
  inline-size: 15.625rem;
  inset-block-end: 3.5rem;
  inset-inline-start: 0.375rem;
}
</style>

<route lang="yaml">
meta:
  layout: blank
  action: read
  subject: Auth
</route>
