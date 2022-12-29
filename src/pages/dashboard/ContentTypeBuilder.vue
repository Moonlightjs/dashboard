<template>
  <!-- left bar -->
  <div>
    <v-navigation-drawer class="bg-deep-purple" permanent>
      <v-list color="transparent" density="compact" nav>
        <v-expansion-panels class=" pa-2 ">
          <v-expansion-panel title="COLLECTION TYPES">
            <v-expansion-panel-text>
              <v-list>
                <v-list-item prepend-icon=" mdi-circle-small" value="inbox" title="Inbox"></v-list-item>
                <v-list-item prepend-icon="mdi-circle-small" value="inbox2" title="Inbox"></v-list-item>
                <v-list-item prepend-icon="mdi-circle-small" value="inbox3" title="Inbox"></v-list-item>
                <v-list-item prepend-icon="mdi-circle-small" value="inbox4" title="Inbox"></v-list-item>
              </v-list>
            </v-expansion-panel-text>
            <v-list>
              <v-list-item @click="handleOpenDialog()" prepend-icon="mdi-circle-small" value="inbox5"
                title="Add new"></v-list-item>
            </v-list>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-list>
    </v-navigation-drawer>
    <!-- content -->
    <div>
      <v-row class="pa-2">
        <h2 style="margin-right: 10px">Title collection</h2>
        <v-btn variant="flat" color="secondary">Edit</v-btn>
      </v-row>
    </div>
    <CreateContentTypeDialog v-model:data="form" v-model:is-open="isOpenDialog" isOpenDialogField
      :on-continue="handleContinue" :on-cancel="handleCloseDialog"></CreateContentTypeDialog>
    <AddField :on-open-dialog-field="handleInputField" v-model:data="dateField" v-model:is-open="isOpenAddField">
    </AddField>

    <TextField :checkExistAttribute="checkExistAttribute" :on-change-property-name="handleOnChangePropertyName"
      :is-open="isOpenDialogFieldText" :on-save="handleSaveDialogField" :on-cancel="handleCancelDialogField"
      :on-continue="handleContinueDialogField">
    </TextField>
  </div>
</template>

<script setup lang="ts">
// -------------------------------VAR-------------------------------
import CreateContentTypeDialog from '@/pages/dashboard/content-type-builder/CreateContentTypeDialog.vue';
import AddField from '@/pages/dashboard/CreateFieldType/AddField.vue';
import TextField from '@/pages/dashboard/CreateFieldType/Text.vue';
import { paramCase } from 'change-case'
import { ref, watch } from "vue";
const open = ref(["COLLECTION TYPES"]);
const contentTypes = ref(['Post', 'Category'])
const isOpenDialog = ref(false);
const isOpenAddField = ref(false);
const dateField = ref({});
const isOpenDialogFieldText = ref(false);
const checkExistAttribute = ref(false);
// data
const form = ref({
  displayName: "",
  singular: "",
  plural: "",
  isDraftAndPublish: true,
  isSoftDelete: true,
  attributes: {}
});

// -------------------------------Method-------------------------------

const handleContinueDialogField = (data: any) => {
  // save
  data.maxLength = parseInt(data.maxLength)
  data.minLength = parseInt(data.minLength)
  form.value.attributes[data.name] = data;
  isOpenDialogFieldText.value = false;
  // reopen
  isOpenAddField.value = true;
  console.log(data);
}
const handleSaveDialogField = (data: any) => {
  data.maxLength = parseInt(data.maxLength)
  data.minLength = parseInt(data.minLength)
  form.value.attributes[data.name] = data;
  console.log(data);

  isOpenDialogFieldText.value = false;
}
const handleCancelDialogField = (data: any) => {
  isOpenDialogFieldText.value = false;
}
const handleOnChangePropertyName = (value: string) => {
  if (form.value.attributes[value] !== undefined) {
    checkExistAttribute.value = true;
  } else
    checkExistAttribute.value = false;
}
const handleCloseDialog = () => {
  isOpenDialog.value = false;
}
const handleOpenDialog = () => {
  isOpenDialog.value = true;
}
const handleContinue = () => {
  if (form.value.displayName.trim().length === 0) {
    alert("Please fill display name")
    return;
  }
  isOpenDialog.value = false;
  isOpenAddField.value = true;
}
const handleInputField = (type: string) => {
  isOpenAddField.value = false;
  switch (type) {
    case 'text': {
      isOpenDialogFieldText.value = true;
      break;
    }
  }
}

watch(() => form.value.displayName, val => {
  form.value.singular = paramCase(val)
  let asd = paramCase(val)
  if (asd.split('').at(-1) === 'y') {
    asd = asd.substring(0, asd.length - 1) + "ies"
  } else {
    asd = asd + 's'
  }
  form.value.plural = paramCase(asd)
});
</script>

