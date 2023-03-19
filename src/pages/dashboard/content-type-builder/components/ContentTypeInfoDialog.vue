<template>
  <v-dialog v-model="isOpen" width="800">
    <v-card>
      <v-card-title>
        Create a collection type
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
                  <v-text-field autocomplete="off" label="Display name" required type="text"
                    v-model="data.info.displayName"></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field type="text" v-model="data.info.singularName">
                    <template v-slot:label>
                      <div>
                        Singular
                      </div>
                    </template>
                  </v-text-field>
                  <v-text-field autocomplete="off" label="Plural" type="text" v-model="data.info.pluralName"></v-text-field>
                </v-col>
              </v-row>
            </v-window-item>
            <v-window-item value="advanced">
              <v-row>
                <v-col>
                  <label>Draft/Publish</label>
                  <v-switch color="primary" v-model="data.options.draftAndPublish" hide-details inset></v-switch>
                </v-col>
                <v-col>
                  <label>Soft Delete </label>
                  <v-switch color="primary" v-model="data.options.softDelete" hide-details inset></v-switch>
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-form>
      </v-card-text>
      <v-card-actions class="d-flex justify-space-between px-12 pb-6">
        <v-btn @click="onCancel">Cancel</v-btn>
        <v-btn color="primary" @click="onContinue">Continue</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { CollationType } from "@/service/content-type-builder.service";
import { computed, ref, toRefs } from "vue";

const emit = defineEmits(['update:isOpen', 'update:data'])
interface Props {
  isOpen: boolean,
  onCancel: (event: Event) => void;
  onContinue: (event: Event) => void;
  data: CollationType,
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false,
})
const isOpen = computed({
  get() { return props.isOpen },
  set(newValue: boolean) { emit('update:isOpen', newValue) }
})
const data = computed({
  get() { return props.data },
  set(newValue: CollationType) { emit('update:data', newValue) }
})
const { onCancel, onContinue } = toRefs(props);
const tab = ref<"basic" | "advanced">("basic");
</script>
