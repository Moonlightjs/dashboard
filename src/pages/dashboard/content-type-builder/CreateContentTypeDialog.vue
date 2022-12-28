<template>
  <v-dialog v-model="isOpen" width="800">
    <v-card>
      <v-card-title>
        Create a collection type
      </v-card-title>
      <v-row class="pa-12">
        <v-col>Configurations</v-col>
        <v-col>
          <v-tabs align-tabs="end" v-model="tab">
            <v-tab value="basic">BASIC SETTINGS</v-tab>
            <v-tab value="advanced">ADVANCED SETTINGS</v-tab>
          </v-tabs>
        </v-col>
      </v-row>
      <v-card-text>
        <v-window v-model="tab">
          <v-window-item value="basic">
            One
          </v-window-item>
          <v-window-item value="advanced">
            Two
          </v-window-item>
        </v-window>
      </v-card-text>
      <v-card-actions>
        <v-btn color="secondary" @click="onCancel" block>Cancel</v-btn>
        <v-btn color="primary" @click="onContinue" block>Continue</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed, ref, toRefs } from "vue";
const emit = defineEmits(['update:isOpen'])
interface Props {
  isOpen: boolean,
  onCancel: (event: Event) => void;
  onContinue: (event: Event) => void;
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false,

})
const isOpen = computed({
  get() { return props.isOpen },
  set(newValue: boolean) { emit('update:isOpen', newValue) }
})
const { onCancel, onContinue } = toRefs(props);
const tab = ref(null);
</script>
