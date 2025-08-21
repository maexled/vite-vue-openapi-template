<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn
        v-bind="props"
        icon
        variant="text"
        size="small"
        :title="$t('language.switchLanguage')"
      >
        <v-icon>mdi-translate</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item
        v-for="lang in availableLanguages"
        :key="lang.code"
        @click="changeLanguage(lang.code)"
        :class="{ 'bg-primary': currentLocale === lang.code }"
      >
        <template v-slot:prepend>
          <v-icon>{{ lang.icon }}</v-icon>
        </template>
        <v-list-item-title>{{ lang.name }}</v-list-item-title>
        <template v-slot:append v-if="currentLocale === lang.code">
          <v-icon color="primary">mdi-check</v-icon>
        </template>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { getCurrentLocale, setLocale } from "@/i18n";

const { t, locale } = useI18n({ useScope: "global" });

const currentLocale = computed(() => getCurrentLocale());

const availableLanguages = computed(() => [
  {
    code: "en",
    name: t("language.english"),
    icon: "mdi-flag",
  },
  {
    code: "de",
    name: t("language.german"),
    icon: "mdi-flag",
  },
]);

const changeLanguage = (localeCode: string) => {
  locale.value = localeCode;
  setLocale(localeCode);
};
</script>