<template>
  <v-app-bar app elevation="4">
    <!-- <template v-slot:image>
      <v-img gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"></v-img>
    </template> -->
    <v-col lg="3" cols="6">
      <v-form>
        <v-text-field class="input-global-search" clearable density="compact" variant="solo" hide-details="auto"
          placeholder="Search" prepend-inner-icon="mdi-magnify" />
      </v-form>
    </v-col>
    <v-spacer></v-spacer>
    <NavbarThemeSwitcher/>
    <v-menu location="bottom right">
      <template v-slot:activator="{ props: menu }">
        <v-tooltip location="top" text="Notification">
          <template v-slot:activator="{ props: tooltip }">
            <span v-bind="mergeProps(menu, tooltip)" style="cursor: pointer;" class="mx-5 mr-10">
              <v-badge color="red" content="5">
                <v-icon icon="mdi-bell" size="x-large"></v-icon>
              </v-badge>
            </span>
          </template>
        </v-tooltip>
      </template>
      <v-list :items="items" item-props lines="three" width="400">
        <template v-slot:subtitle="{ subtitle }">
          <div v-html="subtitle"></div>
        </template>
      </v-list>
    </v-menu>
    <v-menu location="bottom right">
      <template v-slot:activator="{ props: menu }">
        <span v-bind="menu" style="cursor: pointer;" class="mx-4 mr-10">
          <v-chip size="x-large" link>
            <v-badge dot bottom offset-y="30" offset-x="1" color="green">
              <v-avatar size="38">
                <v-img alt="Avatar" src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
              </v-avatar>
            </v-badge>
            <span>John Leider</span>
          </v-chip>
        </span>
      </template>
      <v-list width="250" class="mt-1">
        <v-list-item prepend-avatar="https://cdn.vuetifyjs.com/images/john.png" title="John Leider"
          subtitle="john@google.com">
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item link>
          <template v-slot:prepend> <v-icon icon="mdi-account"></v-icon></template>
          <v-list-item-title>Profile</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <template v-slot:prepend> <v-icon icon="mdi-cog"></v-icon> </template>
          <v-list-item-title>Settings</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <template v-slot:prepend> <v-icon icon="mdi-logout"></v-icon> </template>
          <v-list-item-title> Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref, mergeProps } from "vue";
import NavbarThemeSwitcher from './NavbarThemeSwitcher.vue'
const items = ref([
  { type: 'subheader', title: 'Today' },
  {
    prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
    title: 'Brunch this weekend?',
    subtitle: `<span class="text-primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
  },
  { type: 'divider', inset: true },
  {
    prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
    title: 'Summer BBQ',
    subtitle: `<span class="text-primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
  },
  { type: 'divider', inset: true },
  {
    prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
    title: 'Oui oui',
    subtitle: '<span class="text-primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
  },
  { type: 'divider', inset: true },
  {
    prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
    title: 'Birthday gift',
    subtitle: '<span class="text-primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
  },
  { type: 'divider', inset: true },
  {
    prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
    title: 'Recipe to try',
    subtitle: '<span class="text-primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
  },
]);
</script>
<style>
.input-global-search.v-input .v-field {
  border-radius: 9999px !important;
}
</style>
