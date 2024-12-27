<template>
    <section id="closest">
        <div style="padding: 20px; padding-bottom: 0px;">
            <h1 class="text-2xl font-extrabold text-gray-700 md:text-5xl lg:text-6xl">
                <span class="text-transparent bg-clip-text bg-gradient-to-r to-sky-600 from-blue-700">
                    Marinas
                </span> 
                Closest To You
            </h1>
        </div>
        <p class="p-[20px]" v-if="searchStore.userLocation">
            We can show closest Marinas: {{ searchStore.userLocation }}

            <span v-if="marinas.length > 0" v-for="marina in marinas">
                {{ marina.name }}
            </span>
        </p>
        <span v-else>We can not showclosest Marinas</span>
    </section>
</template>

<script setup lang="ts">
import { useSearchStore } from '~/stores/searchStore';
import { type MarinaModel } from '~/api-client';

const searchStore = useSearchStore();
const config = useRuntimeConfig();

const marinas = ref<MarinaModel[]>([]);
const errorMessage = ref<string | null>(null);

const fetchClosestMarinas = async () => {
  if (!searchStore.userLocation) return;

  try {
    const userCoordinates = searchStore.userLocation;
    const numberOfMarinas = 10;

    const { data, error } = await useFetch('/Data/marinas/closest', {
      baseURL: config.public.apiBaseUrl,
      params: {
        userCoordinates,
        numberOfMarinas,
      },
    });

    if (error.value) {
      throw new Error(error.value.message || 'Error fetching closest marinas.');
    }

    marinas.value = data.value as Array<MarinaModel> || [];
    console.log(marinas.value);
  } catch (error: any) {
    errorMessage.value = error.message || 'Failed to fetch marinas closest to you.';
    console.error(error);
  }
};

watch(
  () => searchStore.userLocation,
  async (newLocation) => {
    if (newLocation) await fetchClosestMarinas();
  }
);

onMounted(async () => {
    if (searchStore.userLocation) await fetchClosestMarinas();
});

</script>