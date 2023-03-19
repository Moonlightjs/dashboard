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
                  <v-row>
                    <v-col cols="6">
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
                      ></v-col
                    >
                    <v-col cols="6">
                      <label>Number format</label>
                      <v-select
                        v-model="form.type"
                        :items="dataSelect"
                        label="Number format"
                        persistent-hint
                        item-title="title"
                        item-value="value"
                        single-line
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-window-item>
            <v-window-item value="advanced">
              <v-row>
                <v-col>
                  <v-row>
                    <v-col cols="6"
                      ><v-text-field type="text" v-model="form.default">
                        <template v-slot:label>
                          <div>Default value</div>
                        </template>
                      </v-text-field></v-col
                    >
                  </v-row>
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
                        v-model="form.unique"
                        label="Unique field"
                        color="primary"
                        value="true"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="6">
                      <v-checkbox
                        v-model="isUseMax"
                        label="Maximum length"
                        color="primary"
                        value="true"
                      ></v-checkbox>
                      <v-text-field
                        v-if="isUseMax"
                        type="number"
                        :min="0"
                        v-model="form.max"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-checkbox
                        v-model="form.min"
                        label="Minimum length"
                        color="primary"
                        value="true"
                      ></v-checkbox>
                      <v-text-field
                        v-if="isUseMin"
                        type="number"
                        :min="0"
                        v-model="form.min"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-checkbox
                        v-model="form.private"
                        label="Private field"
                        color="primary"
                        value="true"
                      ></v-checkbox
                    ></v-col>
                  </v-row>
                </v-col>
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
        <v-btn
          color="primary"
          :disabled="!isAttributeNameValid"
          @click="onSave()"
          >Finish</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import { computed, ref, toRefs, watch } from "vue";
import debounce from "lodash/debounce";
import {
  CollationTypeAttribute,
  CollationTypeAttributeNumber,
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

const dataSelect = [
  { value: "integer", title: "integer (ex: 10)" },
  { value: "bigint", title: "big integer (ex: 123456789)" },
  { value: "decimal", title: "decimal (ex: 2.22)" },
  { value: "float", title: "float (ex: 3.33333333)" },
];

const initialValue: CollationTypeAttributeNumber = {
  private: false,
  min: null,
  max: null,
  unique: false,
  required: false,
  default: null,
  type: "integer",
  configurable: false,
  writable: false,
  visible: false,
};

const isUseMin = ref<boolean>(false);
const isUseMax = ref<boolean>(false);

const form = ref<CollationTypeAttributeNumber>({ ...initialValue });

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
  props.onContinue(attrName.value, convertRefValueToRawData(form));
  attrName.value = "";
  form.value = { ...initialValue };
};

const onSave = () => {
  props.onSave(props.attrName, attrName.value, convertRefValueToRawData(form));
  attrName.value = "";
  form.value = { ...initialValue };
};

watch(
  () => isUseMin.value,
  () => {
    if (!isUseMin.value) {
      form.value.min = null;
    }
    form.value = { ...form.value };
  }
);

watch(
  () => isUseMax.value,
  () => {
    if (!isUseMax.value) {
      form.value.max = null;
    }
    form.value = { ...form.value };
  }
);

watch(
  () => form.value.max,
  () => {
    form.value.max = Number(form.value.max) || form.value.max;
    form.value = { ...form.value };
  }
);

watch(
  () => form.value.min,
  () => {
    form.value.min = Number(form.value.min) || form.value.min;
    form.value = { ...form.value };
  }
);

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
      isUseMax.value = !!(attribute.value as CollationTypeAttributeNumber).max;
      isUseMin.value = !!(attribute.value as CollationTypeAttributeNumber).min;
      form.value = {
        ...(attribute.value as CollationTypeAttributeNumber),
      };
    }
  }
);
</script>
