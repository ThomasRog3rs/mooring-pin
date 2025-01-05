import { type SuggestionModel, SearchType } from '~/types/search';

export async function getMapBoxSuggestions(currentSearchValue: string) {
    const config = useRuntimeConfig();

    currentSearchValue = currentSearchValue.trim();
    const apiKey: string = config.public.apiMapboxKey as string;
    const baseURL = 'https://api.mapbox.com/search/geocode/v6/forward';

    try {
        const params : Record<string, string | boolean> = {
            q: currentSearchValue,
            access_token: apiKey,
            autocomplete: "true",
            country: 'GB'
        };

        const queryString = buildQueryString(params);
        const response = await fetch(`${baseURL}?${queryString}`);

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        console.log("LOCATION SEARCH: ", data);
        return data;
    } catch (error) {
        console.error('Error fetching geocoding data:', error);
        // throw error;
    }
}

export function buildQueryString(params: Record<string, string | boolean>): string {
    return Object.entries(params)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
}