<template>
  <v-navigation-drawer :rail="globalAppStore.rail" v-model="globalAppStore.drawer" permanent
    @click="globalAppStore.$patch({ rail: false })">
    <v-list height="64">
      <v-list-item prepend-avatar="../../assets/logo.png" title="Moonlight" nav>
        <template v-slot:append>
          <v-btn variant="text" icon="mdi-chevron-left" @click.stop="globalAppStore.switchRail()"></v-btn>
        </template>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list v-model:opened="openChildrenItem">
      <MenuTreeview v-for="(node, i) in itemShow" :key="i" :node="node" />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { asyncRouterMap } from "@/router/router";
import { useGlobalAppStore } from "@/store/app";
import { computed, ref, toRefs } from "vue";
import MenuTreeview from '@/layouts/partials/MenuTreeview.vue'
// // interface Props {
// //   drawer: boolean,
// // }

// // const props = withDefaults(defineProps<Props>(), {
// //   drawer: true,

// // })
// // const { drawer } = toRefs(props);
const openChildrenItem = ref([]);
const routes = asyncRouterMap.find(item => item.path === '/')
const menus = ref((routes && routes.children) || []);
const itemShow = computed(() => {
  if (menus.value && menus.value.length > 0) {
    return menus.value.filter(child => child.hidden === undefined || !child.hidden)
  }
  return [];
})

const globalAppStore = useGlobalAppStore();
</script>
