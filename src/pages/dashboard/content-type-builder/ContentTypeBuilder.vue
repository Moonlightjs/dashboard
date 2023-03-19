<template>
  <!-- left bar -->
  <div>
    <v-navigation-drawer class="bg-deep-purple" permanent>
      <v-list color="transparent" density="compact" nav>
        <v-expansion-panels class="pa-2" v-model="panel">
          <v-expansion-panel title="COLLECTION TYPES">
            <v-expansion-panel-text>
              <v-list>
                <v-list-item
                  v-for="(contentType, i) in Object.values(
                    contentTypesStore.contentTypes
                  )"
                  :key="i"
                  prepend-icon=" mdi-circle-small"
                  @click="selectContentType(contentType)"
                  :value="contentType.collectionName"
                  :title="contentType.info.displayName"
                ></v-list-item>
              </v-list>
            </v-expansion-panel-text>
            <v-list>
              <v-list-item
                @click="handleOpenAddNewDialog()"
                prepend-icon="mdi-plus-box"
                value="inbox5"
                title="Add new"
              ></v-list-item>
            </v-list>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-list>
    </v-navigation-drawer>
    <!-- content -->
    <ContentTypeForm
      v-model:content-type="form"
      v-model:is-open-content-type-info-dialog="isOpenContentTypeInfoDialog"
      :on-save="handleSaveContentType"
    >
    </ContentTypeForm>
  </div>
</template>

<script setup lang="ts">
// -------------------------------VAR-------------------------------
//#region import
import ContentTypeForm from "@/pages/dashboard/content-type-builder/ContentTypeForm.vue";
import { watch, ref, onMounted, onUnmounted } from "vue";
import { paramCase, pascalCase } from "change-case";
import { useContentTypeStore } from "@/store/content-type";
import { CollationType } from "@/service/content-type-builder.service";
import { Nullable } from "@/types/common";
import { useGlobalAppStore } from "@/store/app";
//#endregion

//#region data
const panel = ref<number>(0);
const contentTypesStore = useContentTypeStore();
const globalAppStore = useGlobalAppStore();

watch(
  () => contentTypesStore.isLoading,
  (val) => {
    if (val){
      globalAppStore.turnOnProgressCircularLoading();
    }else{
      globalAppStore.turnOffProgressCircularLoading();
    }
  }
);

const isOpenContentTypeInfoDialog = ref(false);
const initialValue: CollationType = {
  uid: "",
  collectionName: "",
  info: {
    singularName: "",
    pluralName: "",
    displayName: "",
    description: "",
  },
  options: {
    draftAndPublish: false,
    softDelete: false,
  },
  attributes: {},
};

const selectedContentType = ref<Nullable<CollationType>>(null);

const form = ref<CollationType>({ ...initialValue });
//#endregion

// -------------------------------Method-------------------------------
//#region Method
const handleOpenAddNewDialog = () => {
  selectedContentType.value = { ...initialValue };
  form.value = { ...initialValue };
  isOpenContentTypeInfoDialog.value = true;
};

const handleOpenDialogField = (uid: string): CollationType => {
  return contentTypesStore.contentTypes[uid];
};

const handleSaveContentType = (collationType: CollationType) => {
  if (collationType.uid.length) {
    contentTypesStore.updateContentType(collationType.uid, {
      singularName: collationType.info.singularName,
      pluralName: collationType.info.pluralName,
      displayName: collationType.info.displayName,
      description: collationType.info.description,
      draftAndPublish: collationType.options.draftAndPublish,
      softDelete: collationType.options.softDelete,
      collectionName: collationType.collectionName,
      attributes: collationType.attributes,
    });
  } else {
    contentTypesStore.createContentType({
      singularName: collationType.info.singularName,
      pluralName: collationType.info.pluralName,
      displayName: collationType.info.displayName,
      description: collationType.info.description,
      draftAndPublish: collationType.options.draftAndPublish,
      softDelete: collationType.options.softDelete,
      collectionName: collationType.collectionName,
      attributes: collationType.attributes,
    });
  }
};

const selectContentType = (collectionType: CollationType) => {
  selectedContentType.value = collectionType;
  form.value = {
    ...collectionType,
  };
};

onMounted(() => {
  contentTypesStore.getListContentType();
});

onUnmounted(() => {
  window.onbeforeunload = null;
});

watch(
  () => form.value,
  (val) => {
    if (JSON.stringify(val) != JSON.stringify(selectedContentType.value)) {
      window.onbeforeunload = function () {
        return "information you’ve entered may not be saved.";
      };
    }
  }
);

watch(
  () => form.value.info.displayName,
  (val) => {
    if (form.value.info.displayName.trim().length === 0) return;
    form.value.info.singularName = paramCase(val);
    let processValue = paramCase(val);
    if (processValue.split("").at(-1) === "y") {
      processValue = processValue.substring(0, processValue.length - 1) + "ies";
    } else {
      processValue = processValue + "s";
    }
    form.value.info.pluralName = paramCase(processValue);
    if (!form.value.uid.length) {
      form.value.collectionName = pascalCase(val);
    }
    form.value = {
      ...form.value,
    };
  }
);
</script>
