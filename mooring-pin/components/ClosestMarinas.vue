<template v-show="searchStore.userLocation">
    <section id="closest">
        <div style="padding: 20px; padding-bottom: 0px;">
            <h1 class="text-2xl font-extrabold text-gray-700 md:text-5xl lg:text-6xl">
                <span class="text-transparent bg-clip-text bg-gradient-to-r to-sky-600 from-blue-700">
                    Marinas
                </span> 
                Closest To You
            </h1>
        </div>
        <div class="p-5">
          <div v-if="marinas.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <SimpleCard v-for="marina in marinas" :key="marina.id!" class="w-full">
              <NuxtLink :to="`/marina/name/${getMarinaSlug(marina.name!)}`">
                <h2 class="mb-2 text-2xl font-bold text-gray-700 md:text-2xl lg:text-3xl">{{ marina.name }}</h2>
                <p class="text-md font-normal text-gray-800 lg:text-xl">{{ marina.distanceFromUser?.toFixed(2) }} miles</p>
              </NuxtLink>
            </SimpleCard>
          </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { useSearchStore } from '~/stores/search.store';
import { type MarinaModel } from '~/api-client';

const {getMarinaSlug} = useGetMarinaSlug();
const searchStore = useSearchStore();
const config = useRuntimeConfig();

const marinas = ref<MarinaModel[]>([]);
const errorMessage = ref<string | null>(null);

const fetchClosestMarinas = async () => {
  if (!searchStore.userLocation) return;

  try {
    const userCoordinates = searchStore.userLocation;
    const numberOfMarinas = 4;

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

<style scoped>
.close-by-items{
    width: 800px;
    display: flex;
    justify-content:flex-start;
}
</style>