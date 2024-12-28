<template>
    <!-- Add the marina navbar (back button, title and save button) -->
    <h1>Hello, World!</h1>
    <h2>{{ marinaId }}</h2>

    <h3>{{ marina?.name }}</h3>
</template>

<script setup lang="ts">
import { type MarinaModel } from '~/api-client';

const config = useRuntimeConfig();
const route = useRoute();
const marinaId = route.params.id as string;

const marina = ref<MarinaModel>();
const errorMessage = ref<string | null>(null);

const fetchMarina = async () => {
  if (!marinaId) return;

  try {
    const { data, error } = await useFetch(`/Data/marina/${marinaId}`, {
      baseURL: config.public.apiBaseUrl
    });

    if (error.value) {
      throw new Error(error.value.message || `Error fetching marina with id '${marinaId}' .`);
    }

    marina.value = data.value as MarinaModel;
    console.log(marina.value);
  } catch (error: any) {
    errorMessage.value = error.message || `Error fetching marina with id '${marinaId}' .`;
    console.error(error);
  }
};

fetchMarina();

</script>