<template>
  <!-- left bar -->
  <div>
    <v-navigation-drawer class="bg-deep-purple" permanent>
      <v-list color="transparent" density="compact" nav>
        <v-expansion-panels class=" pa-2 ">
          <v-expansion-panel title="COLLECTION TYPES">
            <v-expansion-panel-text>
              <v-list>
                <v-list-item v-for="(contentType, i) in Object.values(listContentTypes)" :key="i"
                  prepend-icon=" mdi-circle-small" @click="selectContentType(contentType)"
                  :value="contentType.displayName" :title="contentType.displayName"></v-list-item>
              </v-list>
            </v-expansion-panel-text>
            <v-list>
              <v-list-item @click="handleOpenDialog()" prepend-icon="mdi-plus-box" value="inbox5"
                title="Add new"></v-list-item>
            </v-list>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-list>
    </v-navigation-drawer>
    <!-- content -->
    <Content v-model:content-type="form" v-model:is-open-dialog="isOpenDialog" :on-save="handleSaveContentType">
    </Content>
  </div>
</template>

<script setup lang="ts">
// -------------------------------VAR-------------------------------
//#region import
import Content from '@/pages/dashboard/content-type-builder/Content.vue'
import { watch, ref, computed, toRefs } from "vue";
import { CollectionType } from './content-type-builder/type';
import { paramCase } from "param-case";

//#endregion

//#region data
const isOpenDialog = ref(false);
const listContentTypes = ref<Record<string, CollectionType>>({})
const initialValue: CollectionType = {
  displayName: "",
  singular: "",
  plural: "",
  draftAndPublish: true,
  softDelete: true,
  attributes: {}
}

const form = ref<CollectionType>(Object.values(listContentTypes)[0] || { ...initialValue });
//#endregion
// -------------------------------Method-------------------------------
//#region Method
const handleOpenDialog = () => {
  form.value = { ...initialValue }
  isOpenDialog.value = true;
}

const handleSaveContentType = (collectionType: CollectionType) => {
  listContentTypes.value[collectionType.displayName] = collectionType;
}

const selectContentType = (collectionType: CollectionType) => {
  form.value = { ...collectionType };
}

watch(() => form.value.displayName, val => {
  if (form.value.displayName.trim().length === 0)
    return
  form.value.singular = paramCase(val)
  let processValue = paramCase(val)
  if (processValue.split('').at(-1) === 'y') {
    processValue = processValue.substring(0, processValue.length - 1) + "ies"
  } else {
    processValue = processValue + 's'
  }

  form.value.plural = paramCase(processValue)
});
</script>

