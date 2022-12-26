<template>
  <div class="login-wrapper d-flex align-center justify-center pa-4">
    <v-card variant="tonal" class="login-card pa-4 pt-7" max-width="448">
      <v-card-item class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <div v-html="logo" />
          </div>
        </template>
        <v-card-title class="font-weight-semibold text-2xl text-uppercase">
          Moonlight
        </v-card-title>
      </v-card-item>
      <v-card-text class="pt-2">
        <h5 class="text-h5 font-weight-semibold mb-1">
          Welcome to Moonlight! 👋🏻
        </h5>
        <p class="mb-0">
          Log in to your Strapi account
        </p>
      </v-card-text>
      <v-card-text>
        <v-form @submit.prevent="() => { }">
          <v-row>
            <!-- email -->
            <v-col cols="12">
              <v-text-field v-model="form.email" label="Email" type="email" />
            </v-col>

            <!-- password -->
            <v-col cols="12">
              <v-text-field v-model="form.password" label="Password" :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible" />

              <!-- remember me checkbox -->
              <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4">
                <v-checkbox v-model="form.remember" label="Remember me" />

                <a class="ms-2 mb-1" href="javascript:void(0)">
                  Forgot Password?
                </a>
              </div>

              <!-- login button -->
              <VBtn block type="submit" to="/">
                Login
              </VBtn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import logo from '@/assets/logo.svg?raw';
import { ref } from 'vue';
const form = ref({
  email: '',
  password: '',
  remember: false,
})
const isPasswordVisible = ref(false)

</script>

<style>

</style>
