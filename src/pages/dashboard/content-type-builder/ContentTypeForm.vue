<template>
  <div v-if="contentType.info.displayName.length">
    <v-row class="pa-2">
      <v-col class="d-flex flex-row justify-start">
        <h2 style="margin-right: 10px">{{ contentType.info.displayName }}</h2>
        <v-btn variant="flat" color="secondary" @click="handleOpenEditDialog()"
          >Edit</v-btn
        >
      </v-col>
      <v-col class="d-flex flex-row justify-end">
        <v-btn
          @click="handleOpenAddField()"
          class="mr-2"
          prepend-icon="mdi-cloud-upload"
          variant="flat"
          color="secondary"
          >Add another field</v-btn
        >
        <v-btn
          prepend-icon="mdi-cloud-upload"
          @click="onSave(contentType)"
          variant="flat"
          color="primary"
          >Save</v-btn
        >
      </v-col>
    </v-row>
    <v-card class="pa-4 ma-2">
      <v-table>
        <thead>
          <tr>
            <th class="text-left text-h5">Name</th>
            <th class="text-left text-h5">Type</th>
            <th class="text-center text-h5">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="[attrName, attribute] of Object.entries(
              contentType.attributes
            )"
            :key="attrName"
          >
            <td class="mt-2 text-h5">
              <div class="d-flex justify-start align-center">
                <div class="mr-4">
                  <v-img
                    :src="getIconAttribute(attribute)"
                    style="width: 48px; heigh: 32px"
                  >
                  </v-img>
                </div>
                <div>{{ attrName }}</div>
              </div>
            </td>
            <td class="text-h5">{{ attribute.type }}</td>
            <td class="d-flex flex-row justify-center mt-2">
              <v-btn
                variant="text"
                icon="mdi-pencil"
                @click="handleEditAttribute(attrName, attribute)"
                color="red-lighten-2"
              ></v-btn>
              <v-btn
                variant="text"
                icon="mdi-delete"
                @click="handleDeleteAttribute(attrName)"
                color="red-lighten-2"
              ></v-btn>
            </td>
          </tr>
          <!-- <div style="background: rgb(73, 69, 255); width: 100%;"> -->
          <v-btn
            v-if="contentType"
            style="background: rgb(240, 240, 255); color: rgb(73, 69, 255)"
            class="mt-2"
            @click="handleOpenAddField()"
            prepend-icon="mdi-plus-box"
            >Add another field
          </v-btn>
          <!-- </div> -->
        </tbody>
      </v-table>
    </v-card>
  </div>
  <div style="{display: hidden;}">
    <ContentTypeInfoDialog
      v-model:data="contentType"
      v-model:is-open="isOpenContentTypeInfoDialog"
      isOpenDialogField
      :on-continue="handleContinue"
      :on-cancel="handleCloseContentTypeInfoDialog"
      :on-delete="onDelete"
    ></ContentTypeInfoDialog>
    <AttributeDialog
      :on-open-dialog-field="handleAddNewAttribute"
      v-model:is-open="isOpenAttributeDialog"
    >
    </AttributeDialog>
    <TextField
      :attr-name="selectedAttrName"
      :attribute="selectedAttribute"
      :is-already-exist-name="isAlreadyExistName"
      :on-change-property-name="handleOnChangePropertyName"
      :is-open="attributeDialogType === 'text'"
      :on-save="handleSaveSaveAttribute"
      :on-cancel="handleCancelDialogField"
      :on-continue="handleFinishContinueDialog"
    >
    </TextField>
    <EmailField
      :attr-name="selectedAttrName"
      :attribute="selectedAttribute"
      :is-already-exist-name="isAlreadyExistName"
      :on-change-property-name="handleOnChangePropertyName"
      :is-open="attributeDialogType === 'email'"
      :on-save="handleSaveSaveAttribute"
      :on-cancel="handleCancelDialogField"
      :on-continue="handleFinishContinueDialog"
    >
    </EmailField>
    <RichTextField
      :attr-name="selectedAttrName"
      :attribute="selectedAttribute"
      :is-already-exist-name="isAlreadyExistName"
      :on-change-property-name="handleOnChangePropertyName"
      :is-open="attributeDialogType === 'richtext'"
      :on-save="handleSaveSaveAttribute"
      :on-cancel="handleCancelDialogField"
      :on-continue="handleFinishContinueDialog"
    >
    </RichTextField>
    <PasswordField
      :attr-name="selectedAttrName"
      :attribute="selectedAttribute"
      :is-already-exist-name="isAlreadyExistName"
      :on-change-property-name="handleOnChangePropertyName"
      :is-open="attributeDialogType === 'password'"
      :on-save="handleSaveSaveAttribute"
      :on-cancel="handleCancelDialogField"
      :on-continue="handleFinishContinueDialog"
    >
    </PasswordField>
    <NumberField
      :attr-name="selectedAttrName"
      :attribute="selectedAttribute"
      :is-already-exist-name="isAlreadyExistName"
      :on-change-property-name="handleOnChangePropertyName"
      :is-open="attributeDialogType === 'number'"
      :on-save="handleSaveSaveAttribute"
      :on-cancel="handleCancelDialogField"
      :on-continue="handleFinishContinueDialog"
    >
    </NumberField>
    <EnumerationField
      :attr-name="selectedAttrName"
      :attribute="selectedAttribute"
      :is-already-exist-name="isAlreadyExistName"
      :on-change-property-name="handleOnChangePropertyName"
      :is-open="attributeDialogType === 'enumeration'"
      :on-save="handleSaveSaveAttribute"
      :on-cancel="handleCancelDialogField"
      :on-continue="handleFinishContinueDialog"
    >
    </EnumerationField>
    <DateField
      :attr-name="selectedAttrName"
      :attribute="selectedAttribute"
      :is-already-exist-name="isAlreadyExistName"
      :on-change-property-name="handleOnChangePropertyName"
      :is-open="attributeDialogType === 'date'"
      :on-save="handleSaveSaveAttribute"
      :on-cancel="handleCancelDialogField"
      :on-continue="handleFinishContinueDialog"
    >
    </DateField>
    <BooleanField
      :attr-name="selectedAttrName"
      :attribute="selectedAttribute"
      :is-already-exist-name="isAlreadyExistName"
      :on-change-property-name="handleOnChangePropertyName"
      :is-open="attributeDialogType === 'boolean'"
      :on-save="handleSaveSaveAttribute"
      :on-cancel="handleCancelDialogField"
      :on-continue="handleFinishContinueDialog"
    >
    </BooleanField>
    <JSONField
      :attr-name="selectedAttrName"
      :attribute="selectedAttribute"
      :is-already-exist-name="isAlreadyExistName"
      :on-change-property-name="handleOnChangePropertyName"
      :is-open="attributeDialogType === 'json'"
      :on-save="handleSaveSaveAttribute"
      :on-cancel="handleCancelDialogField"
      :on-continue="handleFinishContinueDialog"
    >
    </JSONField>
    <RelationField
      :attr-name="selectedAttrName"
      :attribute="selectedAttribute"
      :is-already-exist-name="isAlreadyExistName"
      :on-change-property-name="handleOnChangePropertyName"
      :is-open="attributeDialogType === 'relation'"
      :on-save="handleSaveSaveAttribute"
      :on-cancel="handleCancelDialogField"
      :on-continue="handleFinishContinueDialog"
      :content-type="contentType"
      :content-types="contentTypes"
    />
    <UUIDField
      :attr-name="selectedAttrName"
      :attribute="selectedAttribute"
      :is-already-exist-name="isAlreadyExistName"
      :on-change-property-name="handleOnChangePropertyName"
      :is-open="attributeDialogType === 'uuid'"
      :on-save="handleSaveSaveAttribute"
      :on-cancel="handleCancelDialogField"
      :on-continue="handleFinishContinueDialog"
      />
  </div>
</template>

<script setup lang="ts">
import ContentTypeInfoDialog from "@/pages/dashboard/content-type-builder/components/ContentTypeInfoDialog.vue";
import AttributeDialog from "@/pages/dashboard/content-type-builder/components/AttributeDialog/AttributeDialog.vue";
import TextField from "@/pages/dashboard/content-type-builder/components/AttributeDialog/Text.vue";
import EmailField from "@/pages/dashboard/content-type-builder/components/AttributeDialog/Email.vue";
import RichTextField from "@/pages/dashboard/content-type-builder/components/AttributeDialog/RichText.vue";
import PasswordField from "@/pages/dashboard/content-type-builder/components/AttributeDialog/Password.vue";
import NumberField from "@/pages/dashboard/content-type-builder/components/AttributeDialog/Number.vue";
import EnumerationField from "@/pages/dashboard/content-type-builder/components/AttributeDialog/Enumeration.vue";
import JSONField from "@/pages/dashboard/content-type-builder/components/AttributeDialog/JSON.vue";
import BooleanField from "@/pages/dashboard/content-type-builder/components/AttributeDialog/Boolean.vue";
import DateField from "@/pages/dashboard/content-type-builder/components/AttributeDialog/Date.vue";
import RelationField from "@/pages/dashboard/content-type-builder/components/AttributeDialog/Relation.vue";
import UUIDField from "@/pages/dashboard/content-type-builder/components/AttributeDialog/UUID.vue";
import { ref, computed, toRefs } from "vue";
import {
  CollationType,
  CollationTypeAttribute,
  CollationTypeAttributeType,
} from "@/service/content-type-builder.service";
import { Nullable } from "@/types/common";

interface Props {
  contentType: CollationType;
  isOpenContentTypeInfoDialog: boolean;
  onSave: (collectionType: CollationType) => void;
  contentTypes: Record<string, CollationType>;
  onDelete: (uid: string) => void;
}

const props = withDefaults(defineProps<Props>(), {
  isOpenContentTypeInfoDialog: false,
});

const { onSave, onDelete } = toRefs(props);
const isOpenAttributeDialog = ref(false);
const attributeDialogType = ref<string>("none");
const isAlreadyExistName = ref<boolean>(false);
const selectedAttribute = ref<Nullable<CollationTypeAttribute>>(null);
const selectedAttrName = ref<string>("");

//#region Method
const handleFinishContinueDialog = (
  attrName: string,
  attribute: CollationTypeAttribute
) => {
  contentType.value.attributes = {
    ...contentType.value.attributes,
    [attrName]: attribute,
  };
  attributeDialogType.value = "none";
  // reopen
  isOpenAttributeDialog.value = true;
  isAlreadyExistName.value = false;
};

const handleOpenAddField = () => {
  // const currentModel = openAddAttribute();
  isOpenAttributeDialog.value = true;
  isAlreadyExistName.value = false;
};

const handleSaveSaveAttribute = (
  oldAttrName: string,
  newAttrName: string,
  attribute: CollationTypeAttribute
) => {
  if (isAlreadyExistName.value) {
    return;
  }
  isAlreadyExistName.value = false;
  if (oldAttrName !== newAttrName) {
    handleDeleteAttribute(oldAttrName);
  }
  contentType.value.attributes = {
    ...contentType.value.attributes,
    [newAttrName]: attribute,
  };
  attributeDialogType.value = "none";
};

const handleCancelDialogField = () => {
  attributeDialogType.value = "none";
};

const handleOnChangePropertyName = (
  oldAttrName: string,
  newAttrName: string
) => {
  if (newAttrName in contentType.value.attributes) {
    if (oldAttrName === newAttrName) {
      isAlreadyExistName.value = false;
    } else {
      isAlreadyExistName.value = true;
    }
  } else {
    isAlreadyExistName.value = false;
  }
};

const handleCloseContentTypeInfoDialog = () => {
  isOpenContentTypeInfoDialog.value = false;
};

const handleOpenEditDialog = () => {
  isOpenContentTypeInfoDialog.value = true;
};

const handleContinue = () => {
  if (contentType.value.info.displayName.trim().length === 0) {
    alert("Please fill display name");
    return;
  }
  isOpenContentTypeInfoDialog.value = false;
  isOpenAttributeDialog.value = true;
  isAlreadyExistName.value = false;
};

const handleAddNewAttribute = (type: CollationTypeAttributeType) => {
  isOpenAttributeDialog.value = false;
  selectedAttribute.value = null;
  selectedAttrName.value = "";
  switch (type) {
    case "string":
    case "text": {
      attributeDialogType.value = "text";
      break;
    }
    case "email": {
      attributeDialogType.value = "email";
      break;
    }
    case "richtext": {
      attributeDialogType.value = "richtext";
      break;
    }
    case "password": {
      attributeDialogType.value = "password";
      break;
    }
    case "integer":
    case "bigint":
    case "float":
    case "decimal": {
      attributeDialogType.value = "number";
      break;
    }
    case "enumeration": {
      attributeDialogType.value = "enumeration";
      break;
    }
    case "date":
    case "datetime":
    case "time": {
      attributeDialogType.value = "date";
      break;
    }
    case "media": {
      attributeDialogType.value = "media";
      break;
    }
    case "boolean": {
      attributeDialogType.value = "boolean";
      break;
    }
    case "json": {
      attributeDialogType.value = "json";
      break;
    }
    case "relation": {
      attributeDialogType.value = "relation";
      break;
    }
    case "uuid": {
      attributeDialogType.value = "uuid";
      break;
    }
  }
};

const handleEditAttribute = (
  attrName: string,
  attribute: CollationTypeAttribute
) => {
  const type = attribute.type as CollationTypeAttributeType;
  selectedAttribute.value = {
    ...attribute,
  };
  selectedAttrName.value = attrName;
  switch (type) {
    case "string":
    case "text": {
      attributeDialogType.value = "text";
      break;
    }
    case "email": {
      attributeDialogType.value = "email";
      break;
    }
    case "richtext": {
      attributeDialogType.value = "richtext";
      break;
    }
    case "password": {
      attributeDialogType.value = "password";
      break;
    }
    case "integer":
    case "bigint":
    case "float":
    case "decimal": {
      attributeDialogType.value = "number";
      break;
    }
    case "enumeration": {
      attributeDialogType.value = "enum";
      break;
    }
    case "date":
    case "datetime":
    case "time": {
      attributeDialogType.value = "date";
      break;
    }
    case "media": {
      attributeDialogType.value = "media";
      break;
    }
    case "boolean": {
      attributeDialogType.value = "boolean";
      break;
    }
    case "json": {
      attributeDialogType.value = "json";
      break;
    }
    case "relation": {
      attributeDialogType.value = "relation";
      break;
    }
    case "uuid": {
      attributeDialogType.value = "uuid";
      break;
    }
  }
};

const getIconAttribute = (attribute: CollationTypeAttribute) => {
  const type = attribute.type;
  switch (type) {
    case "string":
    case "text": {
      return "src/assets/images/text-icon.svg";
    }
    case "email": {
      return "src/assets/images/email-icon.svg";
    }
    case "richtext": {
      return "src/assets/images/rich-text-icon.svg";
    }
    case "password": {
      return "src/assets/images/password-icon.svg";
    }
    case "bigint":
    case "decimal":
    case "float":
    case "integer": {
      return "src/assets/images/number-icon.svg";
    }
    case "enumeration": {
      return "src/assets/images/enum-icon.svg";
    }
    case "datetime":
    case "time":
    case "date": {
      return "src/assets/images/date-icon.svg";
    }
    case "boolean": {
      return "src/assets/images/boolean-icon.svg";
    }
    case "json": {
      return "src/assets/images/json-icon.svg";
    }
    case "relation": {
      return "src/assets/images/relation-icon.svg";
    }
    case "uuid": {
      return "src/assets/images/uuid-icon.svg";
    }
  }
  return "";
};

const handleDeleteAttribute = (attrName: string) => {
  delete contentType.value.attributes[attrName];
};

// #endregion
const emit = defineEmits([
  "update:isOpenContentTypeInfoDialog",
  "update:contentType",
]);
const isOpenContentTypeInfoDialog = computed({
  get() {
    return props.isOpenContentTypeInfoDialog;
  },
  set(newValue: boolean) {
    emit("update:isOpenContentTypeInfoDialog", newValue);
  },
});

const contentType = computed<CollationType>({
  get() {
    return props.contentType;
  },
  set(newValue: CollationType) {
    emit("update:contentType", newValue);
  },
});
</script>
