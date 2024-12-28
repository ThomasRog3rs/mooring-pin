<template>
    <!-- Add the marina navbar (back button, title and save button) -->
    <h1>Hello, World!</h1>
    <h2>{{ marinaId }}</h2>

    <h3>{{ marina?.name }}</h3>
</template>

<script setup lang="ts">
import { type MarinaModel } from '~/api-client';

const route = useRoute();
const marinaId = route.params.id as string;

const { data: marina } = await useFetch<MarinaModel>(`/api/marinas/${marinaId}`, {
  server: true
});

if (!marina.value) {
  throw createError({
    statusCode: 404,
    message: 'Marina not found'
  });
}

</script>