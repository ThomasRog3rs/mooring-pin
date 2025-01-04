<template>
    <span class="text-blue-700" v-if="searchType === SearchType.Coordinates">
        <font-awesome-icon :icon="['fas', 'location-dot']" />
    </span>
    <span class="text-green-700" v-if="searchType === SearchType.Marina">
        <font-awesome-icon :icon="['fas', 'anchor']" />
    </span>
    <span class="text-amber-700" v-if="searchType === SearchType.Canal">
        <font-awesome-icon :icon="['fas', 'water']" />
    </span>
</template>

<script setup lang="ts">
import { SearchType } from '@/types/search';

const props = defineProps({
  searchType: {
    type: Object as () => SearchType,
    required: true
  }
});
</script>