<template>
  <div v-if="form.displayName.length">
    <v-row class="pa-2">
      <v-col class="d-flex flex-row justify-start">
        <h2 style="margin-right: 10px">{{ form.displayName }}</h2>
        <v-btn variant="flat" color="secondary" @click="handleOpenDialog()">Edit</v-btn>
      </v-col>
      <v-col class="d-flex flex-row justify-end">
        <v-btn @click="handleOpenAddField()" class="mr-2" prepend-icon="mdi-cloud-upload" variant="flat"
          color="secondary">Add another
          field</v-btn>
        <v-btn prepend-icon="mdi-cloud-upload" @click="onSave(form)" variant="flat" color="primary">Save</v-btn>
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
            <td class="mt-2 text-h5  ">
              <div class="d-flex justify-start align-center">
                <div class="mr-4">
                  <v-img :src="attribute.icon" style=" width:48px; heigh:32px;">
                  </v-img>
                </div>
                <div>{{ attribute.name }}</div>
              </div>
            </td>
            <td class="text-h5 ">{{ attribute.type }}</td>
            <td class="d-flex  flex-row justify-center mt-2">
              <v-btn variant="text" icon="mdi-pencil" @click="handleEditField(attribute)" color="red-lighten-2"></v-btn>
              <v-btn variant="text" icon="mdi-delete" @click="handleDeleteField(attribute)"
                color="red-lighten-2"></v-btn>
            </td>
          </tr>
          <!-- <div style="background: rgb(73, 69, 255); width: 100%;"> -->
          <v-btn v-if="form" style="background: rgb(240, 240, 255) ;color:rgb(73, 69, 255);" class=" mt-2"
            @click="handleOpenAddField()" prepend-icon="mdi-plus-box">Add another
            field
          </v-btn>
          <!-- </div> -->
        </tbody>
      </v-table>
    </v-card>
  </div>
  <div style="{display: hidden;}">
    <CreateContentTypeDialog v-model:data="form" v-model:is-open="isOpenDialog" isOpenDialogField
      :on-continue="handleContinue" :on-cancel="handleCloseDialog"></CreateContentTypeDialog>
    <AddField :on-open-dialog-field="handleInputField" v-model:data="dateField" v-model:is-open="isOpenAddField">
    </AddField>
    <TextField :bind-data="dynamicData" :checkExistAttribute="checkExistAttribute"
      :on-change-property-name="handleOnChangePropertyName" :is-open="isOpenDialogField === 1"
      :on-save="handleSaveDialogField" :on-cancel="handleCancelDialogField" :on-continue="handleContinueDialogField">
    </TextField>
    <EmailField :bind-data="dynamicData" :checkExistAttribute="checkExistAttribute"
      :on-change-property-name="handleOnChangePropertyName" :is-open="isOpenDialogField === 2"
      :on-save="handleSaveDialogField" :on-cancel="handleCancelDialogField" :on-continue="handleContinueDialogField">
    </EmailField>
    <RichTextField :bind-data="dynamicData" :checkExistAttribute="checkExistAttribute"
      :on-change-property-name="handleOnChangePropertyName" :is-open="isOpenDialogField === 3"
      :on-save="handleSaveDialogField" :on-cancel="handleCancelDialogField" :on-continue="handleContinueDialogField">
    </RichTextField>
    <PasswordField :bind-data="dynamicData" :checkExistAttribute="checkExistAttribute"
      :on-change-property-name="handleOnChangePropertyName" :is-open="isOpenDialogField === 4"
      :on-save="handleSaveDialogField" :on-cancel="handleCancelDialogField" :on-continue="handleContinueDialogField">
    </PasswordField>
    <NumberField :bind-data="dynamicData" :checkExistAttribute="checkExistAttribute"
      :on-change-property-name="handleOnChangePropertyName" :is-open="isOpenDialogField === 5"
      :on-save="handleSaveDialogField" :on-cancel="handleCancelDialogField" :on-continue="handleContinueDialogField">
    </NumberField>
    <EnumerationField :bind-data="dynamicData" :checkExistAttribute="checkExistAttribute"
      :on-change-property-name="handleOnChangePropertyName" :is-open="isOpenDialogField === 6"
      :on-save="handleSaveDialogField" :on-cancel="handleCancelDialogField" :on-continue="handleContinueDialogField">
    </EnumerationField>
    <DateField :bind-data="dynamicData" :checkExistAttribute="checkExistAttribute"
      :on-change-property-name="handleOnChangePropertyName" :is-open="isOpenDialogField === 7"
      :on-save="handleSaveDialogField" :on-cancel="handleCancelDialogField" :on-continue="handleContinueDialogField">
    </DateField>
    <BooleanField :bind-data="dynamicData" :checkExistAttribute="checkExistAttribute"
      :on-change-property-name="handleOnChangePropertyName" :is-open="isOpenDialogField === 9"
      :on-save="handleSaveDialogField" :on-cancel="handleCancelDialogField" :on-continue="handleContinueDialogField">
    </BooleanField>
    <JSONField :bind-data="dynamicData" :checkExistAttribute="checkExistAttribute"
      :on-change-property-name="handleOnChangePropertyName" :is-open="isOpenDialogField === 10"
      :on-save="handleSaveDialogField" :on-cancel="handleCancelDialogField" :on-continue="handleContinueDialogField">
    </JSONField>
  </div>
</template>

<script setup lang="ts">
import CreateContentTypeDialog from '@/pages/dashboard/content-type-builder/CreateContentTypeDialog.vue';
import AddField from '@/pages/dashboard/CreateFieldType/AddField.vue';
import TextField from '@/pages/dashboard/CreateFieldType/Text.vue';
import EmailField from '@/pages/dashboard/CreateFieldType/Email.vue';
import RichTextField from '@/pages/dashboard/CreateFieldType/RichText.vue';
import PasswordField from '@/pages/dashboard/CreateFieldType/Password.vue';
import NumberField from '@/pages/dashboard/CreateFieldType/Number.vue';
import EnumerationField from '@/pages/dashboard/CreateFieldType/Enumeration.vue';
import JSONField from '@/pages/dashboard/CreateFieldType/JSON.vue';
import BooleanField from '@/pages/dashboard/CreateFieldType/Boolean.vue';
import DateField from '@/pages/dashboard/CreateFieldType/Date.vue';

import { ref, computed, toRefs } from "vue";
import { AttributeField, CollectionType } from './type';

interface Props {
  contentType: CollectionType,
  isOpenDialog: boolean,
  onSave: (collectionType: CollectionType) => void;
  openAddField: (name: string) => CollectionType;
}
const props = withDefaults(defineProps<Props>(), {
  isOpenDialog: false
})

const { onSave, openAddField } = toRefs(props);
const isOpenAddField = ref(false);
const dateField = ref({});
const isOpenDialogField = ref(0);
const checkExistAttribute = ref(false);
const dynamicData = ref<AttributeField | null>(null);
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
}
const handleOpenAddField = () => {
  // const currentModel = openAddField();
  isOpenAddField.value = true;
}
const handleSaveDialogField = (data: AttributeField) => {
  data.maxLength = parseInt(data.maxLength)
  data.minLength = parseInt(data.minLength)
  form.value.attributes = {
    ...form.value.attributes, [data.name]: data
  }
  isOpenDialogField.value = 0;
}
const handleCancelDialogField = () => {
  isOpenDialogField.value = 0;
}
const handleOnChangePropertyName = (value: string) => {
  if (value in form.value.attributes) {
    if (dynamicData.value && value === dynamicData.value.name) {
      checkExistAttribute.value = false;
      return;
    }
    checkExistAttribute.value = true;
  } else
    checkExistAttribute.value = false;
}
const handleCloseDialog = () => {
  isOpenDialog.value = false;
}
const handleOpenDialog = () => {
  // form.value = { ...initialValue }
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
  dynamicData.value = null;
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
const handleEditField = (attribute: AttributeField) => {
  const type = attribute.type;
  dynamicData.value = attribute;
  switch (type) {
    case 'string':
    case 'text': {
      isOpenDialogField.value = 1;
      break;
    }
    case 'email': {
      isOpenDialogField.value = 2;
      break;
    }
    case 'richtext': {
      isOpenDialogField.value = 3;
      break;
    }
    case 'password': {
      isOpenDialogField.value = 4;
      break;
    }
    case 'bigint':
    case 'decimal':
    case 'float':
    case 'integer': {
      isOpenDialogField.value = 5;
      break;
    }

    case 'enumeration': {
      isOpenDialogField.value = 6;
      break;
    }
    case 'datetime':
    case 'time':
    case 'date': {
      isOpenDialogField.value = 7;
      break;
    }
    case 'boolean': {
      isOpenDialogField.value = 9;
      break;
    }
    case 'json': {
      isOpenDialogField.value = 10;
      break;
    }
    case 'relation': {
      isOpenDialogField.value = 11;
      break;
    }
  }
}
const handleDeleteField = (attribute: AttributeField) => {
  delete form.value.attributes[attribute.name]
}
// #endregion
const emit = defineEmits(['update:isOpenDialog', 'update:contentType'])
const isOpenDialog = computed({
  get() { return props.isOpenDialog },
  set(newValue: boolean) { emit('update:isOpenDialog', newValue) }
})

const form = computed<CollectionType>({
  get() { return props.contentType },
  set(newValue: CollectionType) { emit('update:contentType', newValue) }
})


</script>
