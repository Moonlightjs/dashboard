<template>
  <v-dialog v-model="isOpen" width="800">
    <v-card>
      <v-card-title class="pt-4 text-center"> Add new Date field </v-card-title>
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
                      <label>Type</label>
                      <v-select
                        v-model="form.type"
                        :items="dataSelect"
                        label="Type"
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
                    <v-col cols="10">
                      <v-label>Default value</v-label>
                      <v-row>
                        <v-col cols="7">
                          <v-row
                            v-if="
                              form.type === 'date' || form.type === 'datetime'
                            "
                          >
                            <v-col cols="2"><v-label>Date: </v-label></v-col>
                            <v-col cols="10">
                              <Datepicker
                                :enable-time-picker="false"
                                v-model="date"
                              >
                              </Datepicker>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="5">
                          <v-row
                            v-if="
                              form.type === 'time' || form.type === 'datetime'
                            "
                          >
                            <v-col cols="3"><v-label>Time: </v-label></v-col>
                            <v-col cols="9">
                              <Datepicker v-model="time" time-picker>
                              </Datepicker>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6">
                      <v-checkbox
                        v-model="form.required"
                        label="Required field"
                        color="primary"
                        :value="true"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="6">
                      <v-checkbox
                        v-model="form.unique"
                        label="Unique field"
                        color="primary"
                        :value="true"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12">
                      <v-checkbox
                        v-model="form.private"
                        label="Private field"
                        color="primary"
                        :value="true"
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
        <v-btn color="primary" :disabled="!isAttributeNameValid" @click="onSave()">Finish</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import { computed, ref, toRefs, watch } from "vue";
import debounce from "lodash/debounce";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import moment from "moment";
import {
  CollationTypeAttribute,
  CollationTypeAttributeDate,
} from "@/service/content-type-builder.service";
import { Nullable } from "../../../../../types/common";
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
  { value: "date", title: "date (ex: 01/01/2022)" },
  { value: "datetime", title: "datetime (ex: 01/01/2022 00:00 AM)" },
  { value: "time", title: "time (ex: 00:00 AM)" },
];

const date = ref<Nullable<Date>>(null);
const time = ref<
  Nullable<{
    hours: number;
    minutes: number;
    seconds: number;
  }>
>(null);

const initialValue: CollationTypeAttributeDate = {
  private: false,
  required: false,
  type: "date",
  default: null,
  unique: false,
  configurable: false,
  writable: false,
  visible: false,
};
const form = ref<CollationTypeAttributeDate>({ ...initialValue });

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
  if (form.value.type === "date") {
    form.value.default = moment(date.value).format("YYYY-MM-DD");
  } else if (form.value.type === "datetime") {
    form.value.default =
      moment(date.value).format("YYYY-MM-DD") +
      ` ${time.value?.hours}:${time.value?.minutes}:${time.value?.seconds}`;
  } else {
    form.value.default = `${time.value?.hours}:${time.value?.minutes}:${time.value?.seconds}`;
  }
  props.onSave(
    props.attrName,
    attrName.value,
    convertRefValueToRawData(form) as CollationTypeAttribute
  );
  attrName.value = "";
  form.value = { ...initialValue };
};

const onSave = () => {
  if (form.value.type === "date") {
    form.value.default = moment(date.value).format("YYYY-MM-DD");
  } else if (form.value.type === "datetime") {
    form.value.default =
      moment(date.value).format("YYYY-MM-DD") +
      ` ${time.value?.hours}:${time.value?.minutes}:${time.value?.seconds}`;
  } else {
    form.value.default = `${time.value?.hours}:${time.value?.minutes}:${time.value?.seconds}`;
  }
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

watch(
  () => props.attrName,
  () => {
    attrName.value = props.attrName;
  }
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
      if ((attribute.value as CollationTypeAttributeDate).default) {
        if (attribute.value.type === "time") {
          const timeValue = (
            attribute.value as CollationTypeAttributeDate
          ).default?.split(";") as string[];
          time.value = {
            hours: Number(timeValue[0]),
            minutes: Number(timeValue[1]),
            seconds: Number(timeValue[2]),
          };
        } else if (attribute.value.type === "date") {
          const dateValue = new Date(
            (attribute.value as CollationTypeAttributeDate).default as string
          );
          dateValue.setHours(0);
          dateValue.setMinutes(0);
          dateValue.setSeconds(0);
          date.value = dateValue;
        } else {
          const data = (
            attribute.value as CollationTypeAttributeDate
          ).default?.split(" ") as string[];

          const dateValue = new Date(data[0] as string);
          dateValue.setHours(0);
          dateValue.setMinutes(0);
          dateValue.setSeconds(0);
          date.value = dateValue;

          const timeValue = data[1].split(";") as string[];
          time.value = {
            hours: Number(timeValue[0]),
            minutes: Number(timeValue[1]),
            seconds: Number(timeValue[2]),
          };
        }
      }
      form.value = {
        ...(attribute.value as CollationTypeAttributeDate),
      };
    }
    tab.value = 'basic';
  }
);
</script>
