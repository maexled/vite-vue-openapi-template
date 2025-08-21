import { DefineComponent } from "vue";

declare module "vue-i18n" {
  // Add any custom types here if needed
}

// Extend global properties
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $t: (key: string, values?: Record<string, any>) => string;
  }
}
