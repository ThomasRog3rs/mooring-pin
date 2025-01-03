import { useSearchStore } from "~/stores/search.store";
import { getMapBoxSuggestions } from "~/services/mapbox";
import { type DataMarinasSearchGetRequest, type MarinaModel } from "~/api-client";

interface SearchResponse{
    hasError: boolean,
    errorMessage: string | null,
    data: MarinaModel[] | null
};

export const useGetSearchResults = () => {
    const searchStore = useSearchStore();

    const areSearchParamsValid = () : boolean => {
        if (
            (searchStore.searchValue === undefined || searchStore.searchValue === null || searchStore.searchValue === '') ||
            (searchStore.searchRadiusValue === undefined || searchStore.searchRadiusValue=== null)
        ) {
            return false;
        }

        return true;
    }

    const getLocationSearchResults = async (): Promise<SearchResponse> => {
        if(areSearchParamsValid() === false) return {
            hasError: true,
            errorMessage: "Please complete the search form",
            data: null
        };

        const mapBoxSuggestions = await getMapBoxSuggestions(searchStore.searchValue!);

        if(mapBoxSuggestions.features.length <= 0){
            return {
                hasError: true,
                errorMessage: "We can't find that location",
                data: null
            }
        }

        let locationCoordinates: string | null = null;

        try{
            //Just get the fist location suggestion mapBox provides, maybe rethink how to just get one or to cache results
            locationCoordinates = `${mapBoxSuggestions.features[0].properties.coordinates.longitude}, ${mapBoxSuggestions.features[0].properties.coordinates.latitude}`;

            searchStore.searchLocationCoordinatesValue = locationCoordinates;

            searchStore.searchValue = mapBoxSuggestions.features[0].properties.full_address ?? searchStore.searchValue;
        }catch(error:any){
            //To do: Add some error loggin here
            console.error('MapBox location parsing error:', error);
            return{
                hasError: true,
                errorMessage: "Something has gone wrong with your search, please try agian",
                data: null
            }
        }

        const searchParams : DataMarinasSearchGetRequest = {
            searchCoordinates: locationCoordinates,
            searchDistance: searchStore.searchRadiusValue ?? 12,
            userCoordinates: searchStore.userLocation ?? undefined,
        } 

        try {
            const foundMarinas: MarinaModel[] = await $fetch<MarinaModel[]>('/api/marinas/search', {
                params: searchParams,
            });

            return {
                hasError: false,
                errorMessage: null,
                data: foundMarinas,
            };
        } catch (error: any) {
            console.error('Error fetching marinas:', error);
            return {
                hasError: true,
                errorMessage: "An unexpected error occurred. Please try again later.",
                data: null,
            };
        }
    };
  
    return {
        getLocationSearchResults,
    };
  };
    