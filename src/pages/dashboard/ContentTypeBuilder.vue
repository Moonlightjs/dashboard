<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="2">
        <v-card>
          <v-list v-model:opened="open">
            <v-list-group value="COLLECTION TYPES">
              <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" title="COLLECTION TYPES"></v-list-item>
              </template>
              <v-list-item v-for="(contentType, i) in contentTypes" :key="i" :title="contentType"
                prepend-icon="mdi-circle-small" :value="contentType"></v-list-item>
            </v-list-group>
            <v-list-item @click="handleOpenDialog" prepend-icon="mdi-plus"
              title="Create new collection type"></v-list-item>
          </v-list></v-card>
      </v-col>
      <v-col cols="10">
        <div></div>
      </v-col>
    </v-row>
  </v-container>
  <CreateContentTypeDialog v-model:is-open="isOpenDialog" :on-cancel="handleCloseDialog" :on-continue="handleCloseDialog" />
</template>

<script setup lang="ts">
import CreateContentTypeDialog from '@/pages/dashboard/content-type-builder/CreateContentTypeDialog.vue';
import { ref } from "vue";
const open = ref(["COLLECTION TYPES"]);
const contentTypes = ref(['Post', 'Category'])
const isOpenDialog = ref(false);
const handleCloseDialog = () => {
  isOpenDialog.value = false;
}
const handleOpenDialog = () => {
  isOpenDialog.value = true;
}
</script>

