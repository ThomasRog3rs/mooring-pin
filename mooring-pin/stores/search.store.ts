import { defineStore } from 'pinia';
import { ref } from 'vue';
import * as client from '../api-client';
import {SearchType, type SortOption, type FilterOption, type SuggestionModel} from '@/types/search';


export const useSearchStore = defineStore('searchStore', () => {
    const currentSearchType = ref<SearchType>(SearchType.None);

    const searchValue = ref<string |undefined>(undefined);
    const searchLocationCoordinatesValue = ref<string | undefined>(undefined);
    const searchRadiusValue = ref<number | undefined>(12);
    const selectedSuggestion = ref<SuggestionModel | undefined>(undefined);
    
    const marinaSearchResults = ref<Array<client.MarinaModel>>();

    const userLocation = ref<string | undefined>(undefined);

    const sortOptions =  ref<Array<SortOption>>(); 
    const serviceFilterOptions = ref<Array<FilterOption>>([]);

    //Perhaps refactor this? Enums?
    sortOptions.value = [
        {name: "Alphabetically", active: false, enabled: true, id: 1},
        {name: "Number Of Services", active: false, enabled: true, id: 2},
        {name: "Distance From Search", active: true, enabled: true, id: 3},
        {name: "Distance From You", active: false, enabled: true, id: 4}
    ];

    async function searchMarinas(){
        const { searchByType, searchErrorMsg, searchHasError } = useSearchSelector();

        await searchByType();
    
        if(searchHasError.value){
          alert(`Failed to search marinas: ${searchErrorMsg.value}`);
          console.error(searchErrorMsg.value);
          return;
        }
    }

    function setServiceFilterOptions(){
        serviceFilterOptions.value = [];
        marinaSearchResults.value?.forEach(marina => {
            marina.services?.forEach(service => {
                if(!serviceFilterOptions.value.some(x => x.serviceType.value === service.serviceType?.value)){
                    const newFilterOption : FilterOption = {
                        serviceType: service.serviceType!,
                        active: false
                    }

                    serviceFilterOptions.value.push(newFilterOption);
                }
            });
        });

        serviceFilterOptions.value?.sort((a:FilterOption, b:FilterOption) => {
            return a?.serviceType.value!.localeCompare(b?.serviceType.value!);
        });
    }

    async function resetServiceFilterOptions(){
        if(serviceFilterOptions.value === undefined) return;

        serviceFilterOptions.value = serviceFilterOptions.value.map(option => ({
            serviceType: option.serviceType,
            active: false,
          }))!;

        serviceFilterOptions.value?.sort((a:FilterOption, b:FilterOption) => {
            return a?.serviceType.value!.localeCompare(b?.serviceType.value!);
        });

        await searchMarinas();
    }

    async function toggleServiceFilterOption(key: string){
        const option = serviceFilterOptions.value?.find(x => x.serviceType.key === key);
        if(option){
            option.active = !option.active;
        }

        await searchMarinas();
    }

    function resetSortOptions(){
        sortOptions.value = [
            {name: "Alphabetically", active: false, enabled: true, id: 1},
            {name: "Number Of Services", active: false, enabled: true, id: 2},
            {name: "Distance From Search", active: true, enabled: true, id: 3},
            {name: "Distance From You", active: false, enabled: true, id: 4}
        ];

        setSortOption(3);
    }

    function setSortOption(id:number){
        const sortItem : SortOption | undefined = sortOptions.value?.find(x => x.id === id);
        if(sortItem === undefined) return;
        sortOptions.value?.forEach(o => o.active = false);
        sortItem.active = true;
        sortrBy(sortItem);
    }

    //refactor this, consider enum rather than a magic string
    function sortrBy(sortItem:SortOption){
        if(marinaSearchResults.value === undefined) return;
        switch(sortItem.name){
            case "Distance From Search":
                marinaSearchResults.value.sort((a: client.MarinaModel, b: client.MarinaModel) => {
                    return  (a.distanceFromSearch || 0) - (b.distanceFromSearch || 0);
                });
                break;
            case "Distance From You":
                if(userLocation.value === undefined) return;
                marinaSearchResults.value.sort((a: client.MarinaModel, b: client.MarinaModel) => {
                    return  (a.distanceFromUser || 0) - (b.distanceFromUser || 0);
                });
                break
            case "Alphabetically":
                marinaSearchResults.value.sort((a: client.MarinaModel, b: client.MarinaModel) => {
                    return a?.name!.localeCompare(b?.name!);
                });
                break;
            case "Number Of Services":
                marinaSearchResults.value.sort((a: client.MarinaModel, b: client.MarinaModel) => {
                    return  (b.services?.length || 0) - (a.services?.length || 0);
                });
                break;
            default:
                break;
        }
    }

    return { 
        currentSearchType,
        selectedSuggestion,
        searchMarinas,
        searchValue,
        searchLocationCoordinatesValue,
        searchRadiusValue,
        marinaSearchResults ,
        sortOptions,
        setSortOption,
        resetSortOptions,
        userLocation,
        resetServiceFilterOptions,
        serviceFilterOptions,
        setServiceFilterOptions,
        toggleServiceFilterOption
    };
});