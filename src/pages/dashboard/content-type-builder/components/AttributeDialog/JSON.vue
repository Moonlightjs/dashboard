<template>
  <v-dialog v-model="isOpen" width="800">
    <v-card>
      <v-card-title class="pt-4 text-center"> Add new Text field </v-card-title>
      <v-row class="pa-12">
        <v-col>
          <h3 style="font-weight: bold">Configurations</h3>
        </v-col>
        <v-col>
          <v-tabs align-tabs="end" v-model="tab">
            <v-tab value="basic">BASIC SETTINGS</v-tab>
            <v-tab value="advanced">ADVANCED SETTINGS</v-tab>
          </v-tabs>
        </v-col>
      </v-row>
      <v-card-text>
        <v-form class="px-4">
          <v-window v-model="tab">
            <v-window-item value="basic">
              <v-row>
                <v-col>
                  <div>
                    <label>Name</label>
                    <v-text-field
                      autocomplete="off"
                      label="Name"
                      required
                      type="text"
                      v-model="attrName"
                    >
                    </v-text-field>
                    <span v-if="isAlreadyExistName" class="text-red"
                      >Attribute is existing</span
                    >
                    <span v-if="attrName.includes(' ')" class="text-red"
                      >No space is allowed for the name of the attribute</span
                    >
                  </div>
                </v-col>
              </v-row>
            </v-window-item>
            <v-window-item value="advanced">
              <v-row>
                <v-col cols="6">
                  <v-checkbox
                    v-model="form.required"
                    label="Required field"
                    color="primary"
                    value="true"
                  ></v-checkbox>
                </v-col>
                <v-col cols="6">
                  <v-checkbox
                    v-model="form.private"
                    label="Private field"
                    color="primary"
                    value="true"
                  ></v-checkbox
                ></v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-form>
      </v-card-text>
      <v-card-actions class="d-flex justify-space-between px-12 pb-6">
        <v-btn @click="onCancel">Cancel</v-btn>
        <v-btn
          color="primary"
          :disabled="!isAttributeNameValid"
          prepend-icon="mdi-plus-thick"
          @click="onContinue()"
          >Add another field</v-btn
        >
        <v-btn color="primary" :disabled="!isAttributeNameValid" @click="onSave()">Finish</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import { computed, ref, toRefs, watch } from "vue";
import debounce from "lodash/debounce";
import {
  CollationTypeAttribute,
  CollationTypeAttributeBase,
} from "@/service/content-type-builder.service";
import { convertRefValueToRawData } from "@/utils/ConvertData";

interface Props {
  isOpen: boolean;
  isAlreadyExistName: boolean;
  attribute: CollationTypeAttribute | null;
  attrName: string;
  onCancel: () => void;
  onContinue: (attrName: string, attribute: CollationTypeAttribute) => void;
  onSave: (
    oldAttrName: string,
    newAttrName: string,
    attribute: CollationTypeAttribute
  ) => void;
  onChangePropertyName: (oldAttrName: string, newAttrName: string) => void;
}

const emit = defineEmits(["update:isOpen", "update:data"]);

const initialValue: CollationTypeAttributeBase = {
  private: false,
  required: false,
  type: "json",
  unique: false,
  configurable: false,
  writable: false,
  visible: false,
};

const form = ref<CollationTypeAttributeBase>({ ...initialValue });

const props = withDefaults(defineProps<Props>(), {
  isOpen: false,
  isAlreadyExistName: false,
});

const isOpen = computed({
  get() {
    return props.isOpen;
  },
  set(newValue: boolean) {
    emit("update:isOpen", newValue);
  },
});

const {
  onCancel,
  attribute,
} = toRefs(props);

const attrName = ref<string>(props.attrName);

const tab = ref<"basic" | "advanced">("basic");

const onContinue = () => {
  props.onContinue(attrName.value, convertRefValueToRawData(form) as CollationTypeAttribute);
  attrName.value = "";
  form.value = { ...initialValue };
};

const onSave = () => {
  props.onSave(
    props.attrName,
    attrName.value,
    convertRefValueToRawData(form) as CollationTypeAttribute
  );
  attrName.value = "";
  form.value = { ...initialValue };
};

watch(
  () => attrName.value,
  debounce(function (val) {
    props.onChangePropertyName(props.attrName, val);
  }, 500)
);

const isAttributeNameValid = computed(
  () =>
    !attrName.value.includes("-") &&
    !attrName.value.includes(" ") &&
    !props.isAlreadyExistName
);

watch(
  () => props.isOpen,
  () => {
    if (attribute.value !== null) {
      form.value = {
        ...attribute.value as CollationTypeAttributeBase,
      };
    }
  }
);
</script>
