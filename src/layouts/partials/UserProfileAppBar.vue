<template>
  <v-badge v-bind="avatarBadgeProps">
    <v-avatar style="cursor: pointer" color="primary" variant="tonal"><v-img
        src="https://randomuser.me/api/portraits/men/85.jpg" />
      <v-menu activator="parent" width="230" location="bottom end" offset="14px">
        <v-list>
          <!-- 👉 User Avatar & Name -->
          <v-list-item>
            <template #prepend>
              <v-list-item-action start>
                <v-badge v-bind="avatarBadgeProps">
                  <v-avatar color="primary" size="40" variant="tonal">
                    <v-img src="https://randomuser.me/api/portraits/men/85.jpg" />
                  </v-avatar>
                </v-badge>
              </v-list-item-action>
            </template>

            <v-list-item-title class="font-weight-semibold">
              John Doe
            </v-list-item-title>
            <v-list-item-subtitle class="text-disabled">
              Admin
            </v-list-item-subtitle>
          </v-list-item>
          <!-- Divider -->
          <v-divider class="my-2" />
          <!-- 👉 Profile -->
          <v-list-item link>
            <template #prepend>
              <v-icon class="me-2" icon="mdi-account-outline" size="22" />
              <v-list-item-title>
                Profile
              </v-list-item-title>
            </template>
          </v-list-item>
          <!-- 👉 Settings -->
          <v-list-item link>
            <template #prepend>
              <v-icon class="me-2" icon="mdi-cog-outline" size="22" />
              <v-list-item-title>
                Settings
              </v-list-item-title>
            </template>
          </v-list-item>
          <!-- Divider -->
          <v-divider class="my-2" />
          <!-- 👉 Logout -->
          <v-list-item to="/login">
            <template #prepend>
              <v-icon class="me-2" icon="mdi-logout-variant" size="22" />
            </template>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-avatar>
  </v-badge>
</template>

<script setup lang="ts">
import type { Anchor } from 'vuetify/lib/components'

const avatarBadgeProps = {
  dot: true,
  location: "bottom right" as Anchor,
  offsetX: 3,
  offsetY: 3,
  color: "success",
  bordered: true,
};

</script>
