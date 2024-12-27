// composables/searchUserLocation.ts
import { useSearchStore } from '~/stores/searchStore';
import { buildQueryString } from "~/services/mapbox";
import { useRuntimeConfig } from 'nuxt/app'; 
import { SearchType } from '~/types/search';

export const useSearchUserLocation = () => {
    const searchStore = useSearchStore();
    const config = useRuntimeConfig();

    const searchUserLocation = async () => {
        searchStore.currentSearchType = SearchType.Coordinates;
        searchStore.selectedSuggestion = undefined;
        
        const apiKey: string = config.public.apiKey as string;
        const baseURL = 'https://api.mapbox.com/search/geocode/v6/reverse';
        const userCoordinates = searchStore.userLocation?.split(",");

        try {
            const params : Record<string, string | boolean> = {
                longitude: userCoordinates![0],
                latitude: userCoordinates![1],
                access_token: apiKey,
            };

            const queryString = buildQueryString(params);
            const response = await fetch(`${baseURL}?${queryString}`);

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            console.log("USER LOCATION SEARCH REVERSE: ", data);
            searchStore.searchValue = data.features[0].properties.full_address;

            return data;
        } catch (error) {
            console.error('Error fetching geocoding data:', error);
            throw error;
        }
    };

    return {
        searchUserLocation
    };
};