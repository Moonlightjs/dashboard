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
    <div v-if="form.displayName.length">
      <v-row class="pa-2">
        <v-col class="d-flex flex-row justify-start">
          <h2 style="margin-right: 10px">{{ form.displayName }}</h2>
          <v-btn variant="flat" color="secondary" @click="handleOpenDialog()">Edit</v-btn>
        </v-col>
        <v-col class="d-flex flex-row justify-end">
          <v-btn class="mr-2" prepend-icon="mdi-cloud-upload" variant="flat" color="secondary">Add another
            field</v-btn>
          <v-btn prepend-icon="mdi-cloud-upload" variant="flat" color="primary">Save</v-btn>
        </v-col>
      </v-row>
      <v-card class="pa-4 ma-2">
        <v-table>
          <thead>
            <tr>
              <th class="text-left text-h5  ">
                Name
              </th>
              <th class="text-left text-h5  ">
                Type
              </th>
              <th class="text-center text-h5  ">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="attribute in Object.values(form.attributes)" :key="attribute.name">
              <td class=" mt-2 text-h5 d-flex justify-start align-center ">
                <div class="mr-4">
                  <v-img :src="attribute.icon" style=" width:48px; heigh:32px;">
                  </v-img>
                </div>
                <div>{{ attribute.name }}</div>
              </td>
              <td class="text-h5">{{ attribute.type }}</td>
              <td class="d-flex  flex-row justify-center mt-2">
                <v-btn variant="text" icon="mdi-pencil" color="red-lighten-2"></v-btn>
                <v-btn variant="text" icon="mdi-delete" color="red-lighten-2"></v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card>
    </div>
    <CreateContentTypeDialog v-model:data="form" v-model:is-open="isOpenDialog" isOpenDialogField
      :on-continue="handleContinue" :on-cancel="handleCloseDialog"></CreateContentTypeDialog>
    <AddField :on-open-dialog-field="handleInputField" v-model:data="dateField" v-model:is-open="isOpenAddField">
    </AddField>

    <TextField :checkExistAttribute="checkExistAttribute" :on-change-property-name="handleOnChangePropertyName"
      :is-open="isOpenDialogField === 1" :on-save="handleSaveDialogField" :on-cancel="handleCancelDialogField"
      :on-continue="handleContinueDialogField">
    </TextField>
    <Email :checkExistAttribute="checkExistAttribute" :on-change-property-name="handleOnChangePropertyName"
      :is-open="isOpenDialogField === 2" :on-save="handleSaveDialogField" :on-cancel="handleCancelDialogField"
      :on-continue="handleContinueDialogField">
    </Email>
    <RichText :checkExistAttribute="checkExistAttribute" :on-change-property-name="handleOnChangePropertyName"
      :is-open="isOpenDialogField === 3" :on-save="handleSaveDialogField" :on-cancel="handleCancelDialogField"
      :on-continue="handleContinueDialogField">
    </RichText>
    <Password :checkExistAttribute="checkExistAttribute" :on-change-property-name="handleOnChangePropertyName"
      :is-open="isOpenDialogField === 4" :on-save="handleSaveDialogField" :on-cancel="handleCancelDialogField"
      :on-continue="handleContinueDialogField">
    </Password>
    <Number :checkExistAttribute="checkExistAttribute" :on-change-property-name="handleOnChangePropertyName"
      :is-open="isOpenDialogField === 5" :on-save="handleSaveDialogField" :on-cancel="handleCancelDialogField"
      :on-continue="handleContinueDialogField">
    </Number>
    <Enumeration :checkExistAttribute="checkExistAttribute" :on-change-property-name="handleOnChangePropertyName"
      :is-open="isOpenDialogField === 6" :on-save="handleSaveDialogField" :on-cancel="handleCancelDialogField"
      :on-continue="handleContinueDialogField">
    </Enumeration>
  </div>
</template>

<script setup lang="ts">
// -------------------------------VAR-------------------------------
//#region import
import CreateContentTypeDialog from '@/pages/dashboard/content-type-builder/CreateContentTypeDialog.vue';
import AddField from '@/pages/dashboard/CreateFieldType/AddField.vue';
import TextField from '@/pages/dashboard/CreateFieldType/Text.vue';
import Email from '@/pages/dashboard/CreateFieldType/Email.vue';
import RichText from '@/pages/dashboard/CreateFieldType/RichText.vue';
import Password from '@/pages/dashboard/CreateFieldType/Password.vue';
import Number from '@/pages/dashboard/CreateFieldType/Number.vue';
import Enumeration from '@/pages/dashboard/CreateFieldType/Enumeration.vue';

import { paramCase } from 'change-case'
import { ref, watch } from "vue";
import { AttributeField, CollectionType } from './content-type-builder/type';
const open = ref(["COLLECTION TYPES"]);
const contentTypes = ref(['Post', 'Category'])
const isOpenDialog = ref(false);
const isOpenAddField = ref(false);
const dateField = ref({});
const isOpenDialogField = ref(0);
const checkExistAttribute = ref(false);
//#endregion
//#region data




const initialValue: CollectionType = {
  displayName: "",
  singular: "",
  plural: "",
  isDraftAndPublish: true,
  isSoftDelete: true,
  attributes: {}
}
const form = ref({ ...initialValue });
//#endregion
// -------------------------------Method-------------------------------
//#region Method

const handleContinueDialogField = (data: AttributeField) => {
  // save
  data.maxLength = parseInt(data.maxLength)
  data.minLength = parseInt(data.minLength)
  // form.value.attributes[data.name] = data;
  form.value.attributes = {
    ...form.value.attributes, [data.name]: data
  }
  isOpenDialogField.value = 0;
  // reopen
  isOpenAddField.value = true;
  console.log(data);
}
const handleSaveDialogField = (data: AttributeField) => {
  data.maxLength = parseInt(data.maxLength)
  data.minLength = parseInt(data.minLength)
  form.value.attributes = {
    ...form.value.attributes, [data.name]: data
  }
  console.log(data);

  isOpenDialogField.value = 0;
}
const handleCancelDialogField = () => {
  isOpenDialogField.value = 0;
}
const handleOnChangePropertyName = (value: string) => {
  if (value in form.value.attributes) {
    checkExistAttribute.value = true;
  } else
    checkExistAttribute.value = false;
}
const handleCloseDialog = () => {
  isOpenDialog.value = false;
}
const handleOpenDialog = () => {
  form.value = { ...initialValue }
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
      isOpenDialogField.value = 1;
      break;
    }
    case 'email': {
      isOpenDialogField.value = 2;
      break;
    }
    case 'rich_text': {
      isOpenDialogField.value = 3;
      break;
    }
    case 'password': {
      isOpenDialogField.value = 4;
      break;
    }
    case 'number': {
      isOpenDialogField.value = 5;
      break;
    }
    case 'enum': {
      isOpenDialogField.value = 6;
      break;
    }
    case 'date': {
      isOpenDialogField.value = 7;
      break;
    }
    case 'media': {
      isOpenDialogField.value = 8;
      break;
    }
    case 'boolean': {
      isOpenDialogField.value = 9;
      break;
    }
    case 'JSON': {
      isOpenDialogField.value = 10;
      break;
    }
    case 'relation': {
      isOpenDialogField.value = 11;
      break;
    }
    case 'UID': {
      isOpenDialogField.value = 12;
      break;
    }
  }
}
//#endregion 
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

