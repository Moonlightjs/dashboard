<template>
  <v-dialog v-model="isOpen" width="800">
    <v-card>
      <v-card-title class="pt-4 text-center"> Add new Relation field </v-card-title>
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
                <v-col cols="3">
                  <v-card variant="outlined">
                    <v-card-title class="d-flex justify-center">
                      {{ contentType.info.displayName }}
                    </v-card-title>
                    <v-card-text>
                      <label>Field name</label>
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
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="6">
                  <div
                    class="d-flex align-center justify-space-around"
                    style="height: 80%"
                  >
                    <v-btn
                      class="rdo-image"
                      :variant="
                        form.relation === 'oneToOne' ? 'flat' : 'outlined'
                      "
                      :color="
                        form.relation === 'oneToOne' ? 'primary' : 'normal'
                      "
                      @click="changeRelationType('oneToOne')"
                    >
                      <img
                        src="@/assets/images/has-one-icon.svg"
                        alt="oneToOne"
                      />
                    </v-btn>
                    <v-btn
                      class="rdo-image"
                      :variant="
                        form.relation === 'oneToMany' ? 'flat' : 'outlined'
                      "
                      :color="
                        form.relation === 'oneToMany' ? 'primary' : 'normal'
                      "
                      @click="changeRelationType('oneToMany')"
                      style="height: 4rem"
                    >
                      <img
                        src="@/assets/images/belongs-to-many-icon.svg"
                        alt="oneToMany"
                      />
                    </v-btn>
                    <v-btn
                      class="rdo-image"
                      :variant="
                        form.relation === 'manyToOne' ? 'flat' : 'outlined'
                      "
                      :color="
                        form.relation === 'manyToOne' ? 'primary' : 'normal'
                      "
                      @click="changeRelationType('manyToOne')"
                      style="height: 4rem"
                      ><img
                        src="@/assets/images/has-many-icon.svg"
                        alt="manyToOne"
                    /></v-btn>
                    <v-btn
                      class="rdo-image"
                      :variant="
                        form.relation === 'manyToMany' ? 'flat' : 'outlined'
                      "
                      :color="
                        form.relation === 'manyToMany' ? 'primary' : 'normal'
                      "
                      @click="changeRelationType('manyToMany')"
                      style="height: 4rem"
                    >
                      <img
                        src="@/assets/images/has-and-belongs-to-many-icon.svg"
                        alt="manyToMany"
                    /></v-btn>
                  </div>
                  <div class="d-flex justify-center" v-if="selectedTarget">
                    <template v-if="form.relation === 'oneToOne'">
                      <p>{{ contentType.info.displayName }}</p>
                      <p class="text-primary">
                        {{ "&nbsp;has and belongs to one&nbsp;" }}
                      </p>
                      <p>
                        {{ selectedTarget.info.displayName }}
                      </p>
                    </template>
                    <template v-if="form.relation === 'oneToMany'">
                      <p>{{ contentType.info.displayName }}</p>
                      <p class="text-primary">
                        {{ "&nbsp;belongs to many&nbsp;" }}
                      </p>
                      <p>
                        {{ pluralize(selectedTarget.info.displayName) }}
                      </p>
                    </template>
                    <template v-if="form.relation === 'manyToOne'">
                      <p>{{ selectedTarget.info.displayName }}</p>
                      <p class="text-primary">
                        {{ "&nbsp;has many&nbsp;" }}
                      </p>
                      <p>
                        {{ pluralize(contentType.info.displayName) }}
                      </p>
                    </template>
                    <template v-if="form.relation === 'manyToMany'">
                      <p>{{ pluralize(contentType.info.displayName) }}</p>
                      <p class="text-primary">
                        {{ "&nbsp;has and belongs to many&nbsp;" }}
                      </p>
                      <p>
                        {{ pluralize(selectedTarget.info.displayName) }}
                      </p>
                    </template>
                  </div>
                </v-col>
                <v-col cols="3">
                  <v-card variant="outlined">
                    <v-card-title class="d-flex justify-center">
                      <v-select
                        v-model="form.target"
                        :items="listContentTypes"
                        density="compact"
                        item-title="info.displayName"
                        item-value="uid"
                        class="centered-select"
                        @update:modelValue="onChangeTarget()"
                      ></v-select>
                    </v-card-title>
                    <v-card-text>
                      <label>Field name</label>
                      <v-text-field
                        autocomplete="off"
                        label="Name"
                        required
                        type="text"
                        v-model="form.targetAttribute"
                      >
                      </v-text-field>
                      <span v-if="isAlreadyExistName" class="text-red"
                        >Attribute is existing</span
                      >
                      <span v-if="attrName.includes(' ')" class="text-red"
                        >No space is allowed for the name of the attribute</span
                      >
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-window-item>
            <v-window-item value="advanced">
              <v-row>
                <v-col cols="6">
                  <v-checkbox
                    v-model="form.private"
                    label="Private field"
                    color="primary"
                    :value="true"
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
<style scoped>
.rdo-image {
  height: 3rem !important;
  width: 3rem !important;
  min-width: unset !important;
  margin-top: 10px;
}

.centered-select .v-select__selections {
  text-align: center;
}
</style>
<script setup lang="ts">
import { computed, ref, toRefs, watch, onMounted, onUnmounted } from "vue";
import debounce from "lodash/debounce";
import {
  CollationType,
  CollationTypeAttribute,
} from "@/service/content-type-builder.service";
import { convertRefValueToRawData } from "@/utils/ConvertData";
import { CollationTypeAttributeRelation } from "@/service/content-type-builder.service";
import { Nullable } from "@/types/common";
import { RelationType } from "@/service/content-type-builder.service";
import { camelCase } from "lodash";
import { pluralize } from "@/utils/String";
import { ta } from "date-fns/locale";

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
  contentType: CollationType;
  contentTypes: Record<string, CollationType>;
}

const emit = defineEmits(["update:isOpen", "update:data"]);

const initialValue: CollationTypeAttributeRelation = {
  private: false,
  required: false,
  type: "relation",
  unique: false,
  configurable: false,
  writable: false,
  visible: false,
  relation: "oneToOne",
  target: "",
  targetAttribute: "",
  mappedBy: "",
};

const form = ref<CollationTypeAttributeRelation>({ ...initialValue });

const props = withDefaults(defineProps<Props>(), {
  isOpen: false,
  isAlreadyExistName: false,
});

const listContentTypes = computed(() => {
  return [...Object.values(props.contentTypes), props.contentType];
});

const isOpen = computed({
  get() {
    return props.isOpen;
  },
  set(newValue: boolean) {
    emit("update:isOpen", newValue);
  },
});

const { onCancel, attribute } = toRefs(props);

const attrName = ref<string>(props.attrName);

const tab = ref<"basic" | "advanced">("basic");

const selectedTarget = ref<Nullable<CollationType>>(
  [...Object.values(props.contentTypes), props.contentType][0]
);

const changeRelationType = (relation: RelationType) => {
  form.value.relation = relation;
  let target = listContentTypes.value.find(
    (item) => item.uid === form.value.target
  );
  if (form.value.target === "") {
    target = props.contentType;
  }
  let processAttributeName = camelCase(target?.info.displayName);
  let targetAttributeName = camelCase(props.contentType.info.displayName);
  if (form.value.relation == "oneToMany") {
    processAttributeName = pluralize(processAttributeName);
  } else if (form.value.relation == "manyToOne") {
    targetAttributeName = pluralize(targetAttributeName);
  } else if (form.value.relation == "manyToMany") {
    processAttributeName = pluralize(processAttributeName);
    targetAttributeName = pluralize(targetAttributeName);
  }
  form.value = {
    ...form.value,
    relation: relation,
    targetAttribute: targetAttributeName,
  };
  attrName.value = processAttributeName;
};

const onChangeTarget = () => {
  console.log(form.value.target);
  let target = listContentTypes.value.find(
    (item) => item.uid === form.value.target
  );
  if (form.value.target === "") {
    target = props.contentType;
  }
  let processAttributeName = camelCase(target?.info.displayName);
  let targetAttributeName = camelCase(props.contentType.info.displayName);
  if (form.value.relation == "oneToMany") {
    processAttributeName = pluralize(processAttributeName);
  } else if (form.value.relation == "manyToOne") {
    targetAttributeName = pluralize(targetAttributeName);
  } else if (form.value.relation == "manyToMany") {
    processAttributeName = pluralize(processAttributeName);
    targetAttributeName = pluralize(targetAttributeName);
  }
  form.value = {
    ...form.value,
    targetAttribute: targetAttributeName,
  };
  attrName.value = processAttributeName;
  selectedTarget.value = target!;
};

const onContinue = () => {
  props.onContinue(
    attrName.value,
    convertRefValueToRawData(form) as CollationTypeAttribute
  );
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

watch(
  () => props.attrName,
  () => {
    attrName.value = props.attrName;
  }
);

onMounted(() => {
  console.log("Mounted");
});

onUnmounted(() => {
  console.log("UnMounted");
});

const isAttributeNameValid = computed(
  () =>
    !attrName.value.includes("-") &&
    !attrName.value.includes(" ") &&
    !props.isAlreadyExistName
);

// watch([() => form.value.relation, () => form.value.target], () => {
//   const target = listContentTypes.value.find(
//     (item) => item.uid === form.value.target
//   );
//   let processAttributeName = camelCase(target?.info.displayName);
//   let targetAttributeName = camelCase(props.contentType.info.displayName);
//   if (form.value.relation == "oneToMany") {
//     processAttributeName = pluralize(processAttributeName);
//   } else if (form.value.relation == "manyToOne") {
//     targetAttributeName = pluralize(targetAttributeName);
//   } else if (form.value.relation == "manyToMany") {
//     processAttributeName = pluralize(processAttributeName);
//     targetAttributeName = pluralize(targetAttributeName);
//   }
//   form.value = {
//     ...form.value,
//     targetAttribute: targetAttributeName,
//   };
//   attrName.value = processAttributeName;
// });

watch(
  () => props.isOpen,
  () => {
    if (attribute.value !== null) {
      const attr = attribute.value as CollationTypeAttributeRelation;
      if (attr.target) {
        selectedTarget.value = props.contentTypes[attr.target];
      }
      form.value = {
        ...(attribute.value as CollationTypeAttributeRelation),
      };
    }
    tab.value = "basic";
  }
);
</script>
