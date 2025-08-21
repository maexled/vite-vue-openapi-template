<script setup lang="ts">
import { RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <v-app>
    <Navbar />
    <v-main>
      <v-container fluid class="pa-2 pa-sm-4">
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>
