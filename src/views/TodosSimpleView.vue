<template>
  <v-container>
    <v-row class="mb-4">
      <v-col>
        <h1>{{ t('todos.title') }}</h1>
      </v-col>
      <v-col class="d-flex justify-end">
        <v-btn color="primary" @click="showDialog = true">
          {{ t('todos.add') }}
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <div v-if="isLoading" class="d-flex justify-center align-center" style="height: 200px">
          <v-progress-circular indeterminate color="primary" size="48" />
        </div>
        <v-row v-else-if="todos?.length" dense>
          <v-col v-for="todo in todos" :key="todo.id" cols="12" md="6" lg="4">
            <v-card elevation="3" class="mb-4">
              <v-card-title class="d-flex align-center justify-space-between">
                <span class="font-weight-bold">{{ todo.title }}</span>
                <v-chip :color="todo.completed ? 'success' : 'grey'" size="small">
                  {{ todo.completed ? t('todos.completed') : t('todos.incomplete') }}
                </v-chip>
              </v-card-title>
              <v-card-text>
                <div class="mb-2">{{ todo.description }}</div>
                <div class="text-caption text-grey-darken-1">
                  {{ todo.createdAt }}
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <div v-else class="text-center text-grey">
          {{ t('todos.noTodos') }}
        </div>
      </v-col>
    </v-row>

    <v-dialog v-model="showDialog" max-width="500">
      <v-card>
        <v-card-title>{{ t('todos.addNew') }}</v-card-title>
        <v-card-text>
          <v-text-field v-model="newTodo.title" :label="t('todos.titleField')" />
          <v-textarea v-model="newTodo.description" :label="t('todos.descriptionField')" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="showDialog = false">{{ t('common.cancel') }}</v-btn>
          <v-btn color="primary" @click="addTodo" :loading="isCreating">
            <span v-if="!isCreating">{{ t('todos.save') }}</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="showSnackbar" :color="snackbarColor" timeout="4000">
      {{ snackbarMessage }}
      <template v-slot:actions>
        <v-btn color="white" variant="text" @click="showSnackbar = false">
          {{ t('common.close') }}
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
import { createTodoMutation, getTodosOptions, getTodosQueryKey } from '@/client/@tanstack/vue-query.gen';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const queryClient = useQueryClient();

const showDialog = ref(false);
const showSnackbar = ref(false);
const snackbarMessage = ref('');
const snackbarColor = ref('success');
const newTodo = ref({ title: '', description: '' });

const { data: todos, isLoading } = useQuery(getTodosOptions());

const { mutate: createTodo, isPending: isCreating } = useMutation({
  ...createTodoMutation(),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: getTodosQueryKey() });
    showDialog.value = false;
    snackbarMessage.value = t('todos.createdSuccess');
    snackbarColor.value = 'success';
    showSnackbar.value = true;
    newTodo.value = { title: '', description: '' };
  },
  onError: () => {
    snackbarMessage.value = t('todos.createdError');
    snackbarColor.value = 'error';
    showSnackbar.value = true;
  },
});

function addTodo() {
  if (!newTodo.value.title) return;
  createTodo({
    body: {
      title: newTodo.value.title,
      description: newTodo.value.description,
      completed: false,
    },
  });
}
</script>