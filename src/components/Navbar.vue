<template>
    <v-app-bar color="primary" dark density="compact">
        <v-app-bar-title>
            <RouterLink to="/" class="text-decoration-none text-white">
                Vite + OpenAPI
            </RouterLink>
        </v-app-bar-title>


        <v-btn :to="'/'" variant="text" :class="{ 'bg-primary-darken-1': currentRoute.path === '/' }">
            {{ t('navbar.home') }}
        </v-btn>


        <v-btn @click="toggleTheme" variant="text" size="small" :icon="currentTheme === 'light' ? 'mdi-weather-night' : 'mdi-weather-sunny'
            " :title="currentTheme === 'light'
                ? t('navbar.switchToDark')
                : t('navbar.switchToLight')
            " class="mr-1"></v-btn>

        <LanguageSwitcher class="mr-1" />

    </v-app-bar>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useTheme } from '@/composables/useTheme';
import LanguageSwitcher from './LanguageSwitcher.vue';

const { t } = useI18n();
const currentRoute = useRoute();
const { currentTheme, toggleTheme } = useTheme();
</script>
