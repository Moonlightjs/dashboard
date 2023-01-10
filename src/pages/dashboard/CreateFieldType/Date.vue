<template>
  <v-dialog v-model="isOpen" width="800">
    <v-card>
      <v-card-title class="pt-4 text-center">
        Add new Text field
      </v-card-title>
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
                    <v-col cols="6"> <label>Name</label>
                      <v-text-field autocomplete="off" label="Name" required type="text" v-model="form.name">
                      </v-text-field>
                      <span v-if="checkExistAttribute" class="text-red">Attribute is existing</span>
                      <span v-if="form.name.includes(' ')" class="text-red">No space is allowed for
                        the name of the attribute</span></v-col>
                    <v-col cols="6">
                      <label>Type</label>
                      <v-select v-model="form.type" :items="dataSelect" label="Type" persistent-hint item-title="title"
                        item-value="value" single-line></v-select>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-window-item>
            <v-window-item value="advanced">
              <v-row>
                <v-col>
                  <v-row>
                    <v-col cols="8">
                      <v-row>
                        <v-col cols="8">
                          <Datepicker v-if="form.type === 'date' || form.type === 'datetime'"
                            :enable-time-picker="false" v-model="form.date">
                          </Datepicker>
                        </v-col>
                        <v-col cols="4">
                          <Datepicker v-if="form.type === 'time' || form.type === 'datetime'" v-model="form.time"
                            time-picker>
                          </Datepicker>
                        </v-col>
                      </v-row>


                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6">
                      <v-checkbox v-model="form.required" label="Required field" color="primary"
                        value="true"></v-checkbox>
                    </v-col>
                    <v-col cols="6">
                      <v-checkbox v-model="form.uniqueField" label="Unique field" color="primary"
                        value="true"></v-checkbox>
                    </v-col>
                    <v-col cols="12"> <v-checkbox v-model="form.private" label="Private field" color="primary"
                        value="true"></v-checkbox></v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-form>
      </v-card-text>
      <v-card-actions class="d-flex justify-space-between px-12 pb-6">
        <v-btn @click="onCancel">Cancel</v-btn>
        <v-btn color="primary" prepend-icon="mdi-plus-thick" @click="onContinue()">Add another field</v-btn>
        <v-btn color="primary" @click="onSave()">Finish</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import { computed, ref, toRefs, watch } from "vue";
import * as _ from "lodash"
import { AttributeField } from "../content-type-builder/type";
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import moment from 'moment'
const emit = defineEmits(['update:isOpen', 'update:data'])
interface Props {
  isOpen: boolean,
  checkExistAttribute: boolean,
  bindData: AttributeField | null,
  onCancel: () => void;
  onContinue: (form: AttributeField) => void;
  onSave: (form: AttributeField) => void;
  onChangePropertyName: (value: string) => void;
}
const dataSelect = [
  { value: 'date', title: 'date (ex: 01/01/2022)' },
  { value: 'datetime', title: 'datetime (ex: 01/01/2022 00:00 AM)' },
  { value: 'time', title: 'time (ex: 00:00 AM)' },
]
const initialValue: AttributeField = {
  private: false,
  uniqueField: false,
  required: false,
  name: "",
  defaultValue: null,
  icon: 'src/assets/images/date-icon.svg',
  type: 'date',
  date: new Date(),
  time: null,
};
const form = ref({ ...initialValue });

const props = withDefaults(defineProps<Props>(), {
  isOpen: false,
  checkExistAttribute: false,
})
const isOpen = computed({
  get() { return props.isOpen },
  set(newValue: boolean) { emit('update:isOpen', newValue) }
})

const { onCancel, checkExistAttribute, bindData } = toRefs(props);
const tab = ref(null);

const onContinue = () => {
  if (form.value.type === 'date') {
    form.value.defaultValue = moment(form.value.date).format("YYYY-MM-DD")
  } else if (form.value.type === 'datetime') {
    form.value.defaultValue = moment(form.value.date).format("YYYY-MM-DD") + ` ${form.value.time.hours}:${form.value.time.minutes}:${form.value.time.seconds}`
  } else {
    form.value.defaultValue = `${form.value.time.hours}:${form.value.time.minutes}:${form.value.time.seconds}`
  }
  props.onContinue(JSON.parse(JSON.stringify(form.value)));
  form.value = { ...initialValue };
}

const onSave = () => {
  if (form.value.type === 'date') {
    form.value.defaultValue = moment(form.value.date).format("YYYY-MM-DD")
  } else if (form.value.type === 'datetime') {
    form.value.defaultValue = moment(form.value.date).format("YYYY-MM-DD") + ` ${form.value.time.hours}:${form.value.time.minutes}:${form.value.time.seconds}`
  } else {
    form.value.defaultValue = `${form.value.time.hours}:${form.value.time.minutes}:${form.value.time.seconds}`
  }
  props.onSave(JSON.parse(JSON.stringify(form.value)))
  form.value = { ...initialValue };
}
watch(() => form.value.name,
  _.debounce(function (val) {
    props.onChangePropertyName(val)
  }, 500)
);


watch(() => props.isOpen,
  () => {
    if (bindData.value !== null) {
      form.value.private = bindData.value.private || false;
      form.value.required = bindData.value.required || false;
      form.value.uniqueField = bindData.value.uniqueField || false;
      form.value.name = bindData.value.name || "";
      form.value.defaultValue = bindData.value.defaultValue || null;
      form.value.type = bindData.value.type || 'date';
      form.value.defaultValue = bindData.value.defaultValue || null
      if (bindData.value.type === 'date' || bindData.value.type === 'datetime') {
        form.value.defaultValue = new Date(bindData.value.date)
      } else {
        form.value.defaultValue = new Date("2023-01-01 " + bindData.value.date)
      }
    }
  })  
</script>