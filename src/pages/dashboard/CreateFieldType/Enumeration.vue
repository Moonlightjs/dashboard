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
                  <div>
                    <label>Name</label>
                    <v-text-field autocomplete="off" label="Name" required type="text" v-model="form.name">
                    </v-text-field>
                    <span v-if="checkExistAttribute" class="text-red">Attribute is existing</span>
                    <span v-if="form.name.includes(' ')" class="text-red">No space is allowed for
                      the name of the attribute</span>
                  </div>
                  <div>
                    <label>Values (one line per value)</label>
                    <v-textarea name="input-7-1" variant="filled" label="Label" auto-grow v-model="form.enumValue"
                      placeholder=" Ex: morning \n noon \n evening"></v-textarea>
                  </div>
                </v-col>
              </v-row>
            </v-window-item>
            <v-window-item value="advanced">
              <v-row>
                <v-col>
                  <v-row>
                    <v-col cols="12">
                      <v-select v-model="form.defaultValue" :items="form.enum" return-object single-line></v-select>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6">
                      <v-checkbox v-model="form.required" label="Required field" color="primary"
                        value="true"></v-checkbox>
                    </v-col>
                    <v-col cols="6"> <v-checkbox v-model="form.private" label="Private field" color="primary"
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
const initialValue: AttributeField = {
  private: false,
  min: false,
  minLength: 0,
  max: false,
  maxLength: 0,
  uniqueField: false,
  required: false,
  name: "",
  defaultValue: null,
  enumValue: "",
  enum: "",
  icon: 'src/assets/images/enum-icon.svg',
  type: 'enumeration'
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
  form.value.enum.shift()
  if (form.value.defaultValue === 'null')
    form.value.defaultValue = null
  props.onContinue(JSON.parse(JSON.stringify(form.value)));
  form.value = { ...initialValue };

}

const onSave = () => {
  form.value.enum.shift()
  if (form.value.defaultValue === 'null')
    form.value.defaultValue = null
  props.onSave(JSON.parse(JSON.stringify(form.value)))
  form.value = { ...initialValue };
}
watch(() => form.value.name,
  _.debounce(function (val) {
    props.onChangePropertyName(val)
  }, 500)
);

watch(() => form.value.enumValue,
  _.debounce(function (val) {
    form.value.enum = ["null", ...val.trim().split('\n')]
  }, 500)
);

watch(() => props.isOpen,
  () => {
    if (bindData.value !== null) {
      form.value.private = bindData.value.private || false;
      form.value.required = bindData.value.required || false;
      form.value.name = bindData.value.name || "";
      form.value.enumValue = bindData.value.enum.join("\n") || '';
      form.value.enum = ["null", ...bindData.value.enum]
      form.value.defaultValue = bindData.value.defaultValue || null;
    }
  })
</script>