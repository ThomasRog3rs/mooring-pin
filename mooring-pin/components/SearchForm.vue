<template>
    <div class="search-container shadow-xl border-4 border-yellow-400 rounded-lg">
        <form class="mx-w-md mx-auto" @submit.prevent="">
            <label for="search-location" class="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
            <div class="relative bg-transparent">
                <div class="relative form-border-bottom">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input
                        type="search"
                        autocomplete="off"
                        id="search-location"
                        class="block p-6 pl-11 pr-12 text-lg text-gray-900 bg-transparent w-full"
                        placeholder="Location, Marina or Canal"
                        required
                        v-model="searchStore.searchValue"
                        @focus="showSuggestions = true"
                        @blur="handleBlur"
                        @keyup="setSuggestions(searchStore.searchValue ?? '')"
                    />
                    
                    <div v-if="searchStore.currentSearchType !== SearchType.None" class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                        <span class="flex-shrink-0 p-2 bg-gray-300 rounded" v-html="searchStore.getCurrentSearchIcon()"></span>
                    </div>
                </div>
                <div
                    id="suggestions"
                    ref="suggestionsBox"
                    v-if="showSuggestions"
                    class="absolute w-full mt-1 bg-white shadow-xl z-10 p-4"
                    style="top: 100%; left: 0;"
                >
                    <ul>
                        <li v-if="searchStore.userLocation" class="flex p-2 border-b border-grey-100 cursor-pointer text-blue-700 hover:bg-gray-100 hover:text-blue-900" @click="searchUserLocation">
                            <svg class="mr-2 w-6 h-6 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z" clip-rule="evenodd"/>
                            </svg>
                            <span>Search My Current Location</span> 
                        </li>
          
                        <li v-if="searchStore.searchValue === '' || searchStore.searchValue === undefined" class="p-2 text-gray-700">
                            Start typing for suggestions
                        </li>
                        <li v-else-if="suggestions && suggestions!.length == 0" class="p-2 text-gray-700">
                            No results found
                        </li>
                        <template v-for="suggestion in suggestions" :key="suggestion.name">
                            <li 
                            class="p-2 border-b border-grey-100 cursor-pointer hover:bg-gray-100 hover:text-gray-900 flex items-center" 
                            :class="{
                                'bg-blue-100 text-blue-700': suggestion.type === SearchType.Coordinates,
                                'bg-green-100 text-green-700': suggestion.type === SearchType.Marina,
                                'bg-orange-100 text-orange-700': suggestion.type === SearchType.Canal
                            }"
                            @click="setSelectedSuggestion(suggestion)">
                            
                            <span class="mr-2" v-html="getIcon(suggestion.type)"></span>
                            {{ suggestion.name }}
                            </li>
                        </template>
                    </ul>
                </div>
            </div>
            <!-- <div style="width: 100%;">
                <label for="" style="text-align: left; display: block; width: 90%; margin: 0 auto; margin-top: 20px;">
                    Search Radius: x Miles
                </label>
                <input
                    type="range"
                    placeholder="Radius (miles)"
                    max="30"
                    min="1"
                    value="1"
                    style="display: block; width: 90%; margin: 0 auto; margin-bottom: 12px; margin-top: 12px;"
                />
            </div> -->
        </form>
        <div class="container-footer">
            <button class="bg-blue-700 text-white w-full font-medium p-4 rounded-bl-[4px] rounded-br-[4px]" @click="search">Search</button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { type ServiceTypeModel } from '@/api-client/';
    import { SearchType, type SuggestionModel } from '@/types/search';
    import { useSearchStore } from '~/stores/search.store'
    import { useSearchSuggestions } from '~/composables/useSearchSuggestions';
    import { getIcon } from '@/utils/getIcon';
    import { useSearchUserLocation } from '~/composables/useSearchUserLocation';

    const searchStore = useSearchStore();

    const emit = defineEmits<{
        (e: 'searched'): void;
    }>();

    const { searchUserLocation } = useSearchUserLocation();

    //Get required data ==================================================================
    const canalNames = ref<string[] | null>(null);
    const marinaNames = ref<string[] | null>(null);
    const serviceTypes = ref<ServiceTypeModel[] | null>(null);
    const fetchError = ref<string | null>(null);

    //server side
    const { data: fetchedData, error } = await useAsyncData('initialData', async () => {
      try {
        const baseURL = "http://localhost:5000";
        
        const [marinaData, canalData, serviceData] = await Promise.all([
          $fetch<string[]>('/Data/marina/getAllNames', { baseURL }),
          $fetch<string[]>('/Data/canal/getAllCanalNames', { baseURL }),
          $fetch<ServiceTypeModel[]>('/Types/service-types', { baseURL })
        ]);

        return {
          marina: marinaData,
          canal: canalData,
          services: serviceData
        }
      } catch (error : any) {
        fetchError.value = `Unexpected error: ${error.message}`;
        throw error;
      }
    });

    //get the data when fetchData returns new data (client side)
    watch(fetchedData, (newData) => {
      if (newData) {
        marinaNames.value = newData.marina;
        canalNames.value = newData.canal;
        serviceTypes.value = newData.services;
      }
    }, { immediate: true });


    //watch for the thrown error form useAsyncData (client side)
    watch(error, (newError) => {
      if (newError) {
        fetchError.value = `API Error: ${newError.message}`;
      }
    }, { immediate: true });

    // End Get required data===============================================================

    const {suggestions, setSuggestions} = useSearchSuggestions(
        marinaNames,
        canalNames
    );

    const showSuggestions = ref<boolean>(false);

    function setSelectedSuggestion(suggestion: SuggestionModel){
      searchStore.searchValue = suggestion.name!;
      searchStore.selectedSuggestion = suggestion;
      searchStore.currentSearchType = suggestion.type;
    }

    const handleBlur = (event : FocusEvent) => {
        setTimeout(() => {
        showSuggestions.value = false;
        }, 200); // Slight delay so click event actually works
    }

    const search = async () => {
        alert(searchStore.searchValue);
        emit("searched")
    }
</script>

