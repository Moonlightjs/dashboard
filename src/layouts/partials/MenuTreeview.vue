
<template>
  <v-list-item v-if="!hasChildren" :prepend-icon="node.meta?.icon" :title="node.meta?.title || node.name"  :to="node.path" :value="node.name"
    active-color="primary"> </v-list-item>
  <v-list-group v-if="hasChildren" :value="node.name">
    <template v-slot:activator="{ props }">
      <v-list-item v-bind="props" :title="node.name" active-color="primary"></v-list-item>
    </template>

    <MenuTreeview v-for="(node, i) in childrenShow" :key="i" :node="node"/>
  </v-list-group>
</template>

<script lang="ts">
import { RouterMap } from '@/router/router'
import { PropType } from 'vue'
export default {
  name: 'MenuTreeview',
  props: {
    node: {
      type: Object as PropType<RouterMap>,
      required: true
    }
  },
  data: () => ({
  }),
  computed: {
    hasChildren(): boolean {
      const { children } = this.node
      return !!children && children.length > 0;
    },
    childrenShow(): RouterMap[] {
      const { children } = this.node
      if (children && children.length > 0) {
        return children.filter(child => child.hidden === undefined || !child.hidden)
      }
      return [];
    }
  }
}
</script>
