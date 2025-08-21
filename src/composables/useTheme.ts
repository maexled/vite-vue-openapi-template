import { ref, watch, computed } from "vue";
import { useTheme as useVuetifyTheme } from "vuetify";

// Theme state - persisted in localStorage
const THEME_KEY = "clubmanager-theme";
const savedTheme = localStorage.getItem(THEME_KEY) || "light";
const currentTheme = ref<"light" | "dark">(savedTheme as "light" | "dark");

/**
 * Composable for managing light/dark theme
 */
export function useTheme() {
  const theme = useVuetifyTheme();

  // Initialize theme
  theme.change(currentTheme.value);

  // Watch for theme changes and persist to localStorage
  watch(currentTheme, (newTheme) => {
    theme.change(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
  });

  // Computed property for isDark
  const isDark = computed(() => currentTheme.value === "dark");

  /**
   * Toggle between light and dark theme
   */
  const toggleTheme = () => {
    currentTheme.value = currentTheme.value === "light" ? "dark" : "light";
  };

  /**
   * Set a specific theme
   */
  const setTheme = (newTheme: "light" | "dark") => {
    currentTheme.value = newTheme;
  };

  return {
    currentTheme: currentTheme,
    isDark,
    toggleTheme,
    setTheme,
  };
}
