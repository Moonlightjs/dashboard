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
                      <label>Number format</label>
                      <v-select v-model="form.type" :items="dataSelect" label="Number format" persistent-hint
                        item-title="title" item-value="value" single-line></v-select>

                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-window-item>
            <v-window-item value="advanced">
              <v-row>
                <v-col>
                  <v-row>
                    <v-col cols="6"><v-text-field type="text" v-model="form.defaultValue">
                        <template v-slot:label>
                          <div>
                            Default value
                          </div>
                        </template>
                      </v-text-field></v-col>
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
                    <v-col cols="6">
                      <v-checkbox v-model="form.max" label="Maximum length" color="primary" value="true"></v-checkbox>
                      <v-text-field v-if="form.max" type="number" min="0" v-model="form.maxLength">
                      </v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-checkbox v-model="form.min" label="Minimum length" color="primary" value="true"></v-checkbox>
                      <v-text-field v-if="form.min" type="number" min="0" v-model="form.minLength">
                      </v-text-field>
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
const emit = defineEmits(['update:isOpen', 'update:data'])
interface Props {
  isOpen: boolean,
  checkExistAttribute: boolean,
  onCancel: () => void;
  onContinue: (form: AttributeField) => void;
  onSave: (form: AttributeField) => void;
  onChangePropertyName: (value: string) => void;
}
const dataSelect = [{ value: 'integer', title: 'integer (ex: 10)' },
{ value: 'bigint', title: 'big integer (ex: 123456789)' },
{ value: 'decimal', title: 'decimal (ex: 2.22)' },
{ value: 'float', title: 'float (ex: 3.33333333)' },
]
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
  icon: 'src/assets/images/number-icon.svg',
  type: 'integer'
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

const { onCancel, checkExistAttribute } = toRefs(props);
const tab = ref(null);

const onContinue = () => {
  props.onContinue(JSON.parse(JSON.stringify(form.value)));
  form.value = { ...initialValue };
}

const onSave = () => {
  props.onSave(JSON.parse(JSON.stringify(form.value)))
  form.value = { ...initialValue };
}
watch(() => form.value.name,
  _.debounce(function (val) {
    props.onChangePropertyName(val)
  }, 500)
);

</script>