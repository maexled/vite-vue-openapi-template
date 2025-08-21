import TodosSimpleView from "@/views/TodosSimpleView.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: TodosSimpleView,
    },
  ],
});

export default router;
