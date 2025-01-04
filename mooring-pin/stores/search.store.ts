import { defineStore } from 'pinia';
import { ref } from 'vue';
import * as client from '../api-client';
import { TypesApi, DataApi } from '../api-client';
import {SearchType, type SortOption, type FilterOption, type SuggestionModel} from '@/types/search';


export const useSearchStore = defineStore('searchStore', () => {
    const types = new TypesApi();
    const dataApi = new DataApi();

    const currentSearchType = ref<SearchType>(SearchType.None);

    const searchValue = ref<string |undefined>(undefined);
    const searchLocationCoordinatesValue = ref<string | undefined>(undefined);
    const searchRadiusValue = ref<number | undefined>(12);

    const marinaSearchValue = ref<string | undefined>(undefined);

    const serviceTypes = ref<Array<client.ServiceTypeModel> | undefined>();
    
    const marinaSearchResults = ref<Array<client.MarinaModel>>();

    const userLocation = ref<string | undefined>(undefined);

    const sortOptions =  ref<Array<SortOption>>(); 

    const serviceFilterOptions = ref<Array<FilterOption>>([]);

    const selectedSuggestion = ref<SuggestionModel | undefined>(undefined);

    sortOptions.value = [
        {name: "Alphabetically", active: false, enabled: true, id: 1},
        {name: "Number Of Services", active: false, enabled: true, id: 2},
        {name: "Distance From Search", active: true, enabled: true, id: 3},
        {name: "Distance From You", active: false, enabled: true, id: 4}
    ];

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

    async function searchMarinas(searchParams: client.DataMarinasSearchGetRequest) {
        let foundMarinas : Array<client.MarinaModel> | undefined = undefined;
        switch (currentSearchType.value) {
            case SearchType.Marina:
                // alert("Marina Search by Marina Name");
                if (!searchParams.name) {
                    throw new Error("Marina search params MUST include a name");
                }
                foundMarinas = await dataApi.dataMarinasSearchGet(searchParams);
                marinaSearchResults.value = foundMarinas ?? [] as Array<client.MarinaModel>;
                break;
    
            case SearchType.Canal:
                // alert("Marina Search by Canal Name");
                if (!searchParams.canalName) {
                    throw new Error("Marina search params MUST include a canalName");
                }
                foundMarinas = await dataApi.dataMarinasSearchGet(searchParams);
                marinaSearchResults.value = foundMarinas ?? [] as Array<client.MarinaModel>;
                break;
    
            case SearchType.Coordinates:
                // alert("Marina Search by Coordinates with a radius");
                if (!searchParams.searchCoordinates || !searchParams.searchDistance) {
                    throw new Error("Marina search params MUST include searchCoordinates AND searchDistance");
                }
                foundMarinas = await dataApi.dataMarinasSearchGet(searchParams);
                marinaSearchResults.value = foundMarinas ?? [] as Array<client.MarinaModel>;
                break;
    
            default:
                console.warn("No valid search type selected");
                //throw new Error("Invalid search type");
        }
    }

    function getCurrentSearchIcon() : string{
        switch (currentSearchType.value) {
            case SearchType.Marina:
                return `
                    <svg width="24px" height="24px" viewBox="0 0 50 50" version="1.2" xmlns="http://www.w3.org/2000/svg" fill="#008000">
                    <path d="M25.117 10.335c-1.475 0-2.691-1.222-2.691-2.72 0-1.508 1.216-2.719 2.691-2.719 1.501 0 2.705 1.211 2.705 2.719 
                    0 1.498-1.204 2.72-2.705 2.72zm21.836 23.806l-1.441-9.027c-.164-.844-.898-1.486-1.771-1.486-.531 0-1.004.226-1.347.595
                    l-6.639 6.26c-.104.095-.211.201-.307.333-.624.854-.446 2.066.404 2.708.162.117.342.201.519.273l1.663.559c-1.602 
                    4.559-6.216 8.683-11.034 9.644v-30c2.361-1.01 4.695-3.652 4.695-6.385 0-3.658-2.942-6.615-6.578-6.615-3.623 0-6.576
                    2.957-6.576 6.615 0 2.733 2.108 5.375 4.458 6.385v30c-4.924-.891-9.406-5-11.048-9.645l1.678-.559c.177-.072.353-.156.519-.273
                    .849-.642 1.038-1.854.402-2.708-.096-.132-.189-.238-.308-.333l-6.638-6.26c-.331-.369-.815-.595-1.335-.595-.885 0-1.63.642-1.783
                    1.486l-1.441 9.027c-.033.143-.045.297-.045.453 0 1.066.862 1.936 1.926 1.936.2 0 .389-.025.566-.085l1.559-.51c2.48 
                    7.578 9.575 13.066 17.949 13.066 8.373 0 15.471-5.488 17.951-13.078l1.56.521c.175.06.367.085.565.085 1.063 0 
                    1.925-.869 1.925-1.936-.001-.155-.012-.309-.048-.451z"></path>
                    </svg>
                `;
            case SearchType.Canal:
                return `    <svg height="24px" width="24px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> .st0{fill:#D97706;} </style> <g> <path class="st0" d="M492.346,41.403c-10.57,3.222-18.868,9.015-25.208,14.756c-4.793,4.326-8.66,8.652-12.12,12.437 c-5.186,5.719-9.459,10.068-13.497,12.631c-2.029,1.311-3.992,2.251-6.296,2.955c-2.304,0.689-5,1.148-8.571,1.148 c-3.63,0-6.356-0.482-8.689-1.186c-4.022-1.252-7.238-3.296-11.142-6.785c-2.896-2.593-6-5.978-9.541-9.86 c-5.319-5.786-11.63-12.852-20.802-18.83c-4.578-2.964-9.874-5.571-15.801-7.349c-5.933-1.792-12.452-2.756-19.379-2.748 c-7.037-0.008-13.653,0.985-19.653,2.83c-10.564,3.222-18.868,9.015-25.209,14.756c-4.793,4.326-8.66,8.652-12.127,12.437 c-5.178,5.719-9.452,10.068-13.482,12.631c-2.03,1.311-3.993,2.251-6.297,2.955c-2.304,0.689-4.993,1.148-8.571,1.148 c-3.63,0-6.348-0.482-8.682-1.186c-4.015-1.252-7.23-3.296-11.134-6.778c-2.896-2.593-6-5.978-9.534-9.868 c-5.326-5.778-11.63-12.852-20.809-18.83c-4.57-2.964-9.874-5.571-15.801-7.349c-5.926-1.792-12.445-2.756-19.375-2.748 c-7.034-0.008-13.649,0.985-19.649,2.83c-10.56,3.222-18.864,9.015-25.202,14.756c-4.789,4.326-8.652,8.66-12.115,12.437 c-5.175,5.726-9.453,10.068-13.483,12.631c-2.03,1.311-3.989,2.251-6.289,2.955c-2.304,0.689-4.993,1.148-8.564,1.148 c-3.63,0-6.352-0.482-8.678-1.186c-4.019-1.252-7.237-3.296-11.142-6.778c-2.889-2.593-5.989-5.978-9.53-9.868 c-5.323-5.778-11.63-12.852-20.801-18.83c-4.575-2.964-9.875-5.571-15.804-7.349C13.441,39.528,6.926,38.565,0,38.573v37.41 c3.63,0.007,6.348,0.481,8.678,1.185c4.023,1.259,7.237,3.297,11.142,6.778c2.892,2.6,5.993,5.985,9.53,9.867 c5.323,5.779,11.63,12.853,20.805,18.831c4.57,2.963,9.867,5.57,15.801,7.356c5.93,1.785,12.445,2.748,19.371,2.74 c7.034,0.008,13.645-0.978,19.649-2.837c10.564-3.215,18.864-9.008,25.206-14.749c4.789-4.327,8.652-8.66,12.116-12.438 c5.17-5.726,9.452-10.067,13.482-12.638c2.03-1.304,3.986-2.252,6.289-2.948c2.3-0.689,4.989-1.141,8.56-1.148 c3.634,0.007,6.352,0.481,8.686,1.185c4.015,1.259,7.237,3.297,11.142,6.778c2.889,2.6,5.985,5.985,9.526,9.867 c5.327,5.779,11.63,12.853,20.809,18.831c4.57,2.963,9.868,5.57,15.801,7.356c5.926,1.785,12.445,2.748,19.371,2.74 c7.038,0.008,13.653-0.978,19.653-2.829c10.564-3.222,18.869-9.008,25.209-14.756c4.793-4.327,8.66-8.653,12.119-12.438 c5.186-5.719,9.46-10.06,13.49-12.63c2.029-1.304,3.992-2.252,6.296-2.956c2.305-0.689,4.993-1.141,8.571-1.148 c3.63,0.007,6.348,0.481,8.682,1.185c4.022,1.259,7.244,3.297,11.149,6.778c2.888,2.6,5.992,5.985,9.534,9.874 c5.319,5.771,11.63,12.846,20.809,18.824c4.57,2.963,9.874,5.57,15.801,7.356c5.934,1.785,12.452,2.748,19.379,2.74 c7.037,0.008,13.645-0.978,19.653-2.829c10.564-3.222,18.868-9.008,25.209-14.756c4.793-4.327,8.66-8.653,12.12-12.431 c5.186-5.726,9.46-10.068,13.497-12.638c2.03-1.304,3.993-2.252,6.297-2.948c2.304-0.696,4.993-1.148,8.571-1.155v-37.41 C504.962,38.565,498.348,39.558,492.346,41.403z"></path> <path class="st0" d="M467.138,231.502c-4.793,4.318-8.66,8.652-12.12,12.438c-5.186,5.719-9.459,10.067-13.497,12.63 c-2.029,1.304-3.992,2.252-6.296,2.948c-2.304,0.696-5,1.155-8.571,1.155c-3.63,0-6.356-0.482-8.689-1.185 c-4.022-1.252-7.238-3.297-11.142-6.786c-2.896-2.593-6-5.978-9.541-9.86c-5.319-5.786-11.63-12.852-20.802-18.83 c-4.578-2.963-9.874-5.571-15.801-7.348c-5.933-1.793-12.452-2.756-19.379-2.749c-7.037-0.007-13.653,0.985-19.653,2.83 c-10.564,3.222-18.868,9.008-25.209,14.756c-4.793,4.326-8.66,8.652-12.127,12.438c-5.178,5.719-9.452,10.067-13.482,12.63 c-2.03,1.304-3.993,2.252-6.297,2.948c-2.304,0.696-4.993,1.155-8.571,1.155c-3.63,0-6.348-0.482-8.682-1.185 c-4.015-1.252-7.23-3.297-11.134-6.778c-2.896-2.593-6-5.978-9.534-9.868c-5.326-5.778-11.63-12.852-20.809-18.83 c-4.57-2.963-9.874-5.571-15.801-7.348c-5.926-1.793-12.445-2.756-19.375-2.749c-7.034-0.007-13.649,0.985-19.649,2.83 c-10.56,3.222-18.864,9.016-25.202,14.756c-4.789,4.326-8.652,8.66-12.115,12.438c-5.175,5.726-9.453,10.067-13.483,12.63 c-2.03,1.304-3.989,2.252-6.289,2.948c-2.304,0.696-4.993,1.155-8.564,1.155c-3.63,0-6.352-0.482-8.678-1.185 c-4.019-1.252-7.237-3.297-11.142-6.778c-2.889-2.593-5.989-5.978-9.53-9.868c-5.323-5.778-11.63-12.852-20.801-18.83 c-4.575-2.963-9.875-5.571-15.804-7.348c-5.931-1.793-12.445-2.756-19.372-2.749v37.41c3.63,0.008,6.348,0.482,8.678,1.185 c4.023,1.252,7.237,3.297,11.142,6.778c2.892,2.593,5.993,5.986,9.53,9.868c5.323,5.778,11.63,12.852,20.805,18.83 c4.57,2.963,9.867,5.571,15.801,7.348c5.93,1.793,12.445,2.756,19.371,2.749c7.034,0.007,13.645-0.985,19.649-2.838 c10.564-3.215,18.864-9.008,25.206-14.749c4.789-4.326,8.652-8.66,12.116-12.438c5.17-5.726,9.452-10.067,13.482-12.638 c2.03-1.303,3.986-2.251,6.289-2.948c2.3-0.69,4.989-1.141,8.56-1.148c3.634,0.008,6.352,0.482,8.686,1.185 c4.015,1.252,7.237,3.297,11.142,6.778c2.889,2.593,5.985,5.986,9.526,9.868c5.327,5.778,11.63,12.852,20.809,18.83 c4.57,2.963,9.868,5.571,15.801,7.348c5.926,1.793,12.445,2.756,19.371,2.749c7.038,0.007,13.653-0.985,19.653-2.83 c10.564-3.222,18.869-9.008,25.209-14.756c4.793-4.326,8.66-8.652,12.119-12.438c5.186-5.719,9.46-10.06,13.49-12.63 c2.029-1.304,3.992-2.252,6.296-2.955c2.305-0.69,4.993-1.141,8.571-1.148c3.63,0.008,6.348,0.482,8.682,1.185 c4.022,1.252,7.244,3.297,11.149,6.778c2.888,2.593,5.992,5.986,9.534,9.868c5.319,5.778,11.63,12.852,20.809,18.83 c4.57,2.963,9.874,5.571,15.801,7.348c5.934,1.793,12.452,2.756,19.379,2.749c7.037,0.007,13.645-0.985,19.653-2.83 c10.564-3.222,18.868-9.008,25.209-14.756c4.793-4.326,8.66-8.652,12.12-12.431c5.186-5.726,9.46-10.067,13.497-12.638 c2.03-1.304,3.993-2.252,6.297-2.948c2.304-0.696,4.993-1.148,8.571-1.155v-37.41c-7.038-0.007-13.652,0.985-19.654,2.83 C481.776,219.968,473.479,225.754,467.138,231.502z"></path> <path class="st0" d="M467.138,406.845c-4.793,4.319-8.66,8.653-12.12,12.43c-5.186,5.726-9.459,10.068-13.497,12.638 c-2.029,1.304-3.992,2.252-6.296,2.948c-2.304,0.696-5,1.148-8.571,1.155c-3.63-0.007-6.356-0.481-8.689-1.185 c-4.022-1.259-7.238-3.297-11.142-6.785c-2.896-2.593-6-5.978-9.541-9.868c-5.319-5.778-11.63-12.846-20.802-18.824 c-4.578-2.963-9.874-5.57-15.801-7.356c-5.933-1.785-12.452-2.748-19.379-2.74c-7.037-0.008-13.653,0.978-19.653,2.829 c-10.564,3.222-18.868,9.008-25.209,14.756c-4.793,4.327-8.66,8.653-12.127,12.43c-5.178,5.726-9.452,10.068-13.482,12.638 c-2.03,1.304-3.993,2.252-6.297,2.948c-2.304,0.696-4.993,1.148-8.571,1.155c-3.63-0.007-6.348-0.481-8.682-1.185 c-4.015-1.259-7.23-3.297-11.134-6.778c-2.896-2.6-6-5.985-9.534-9.874c-5.326-5.771-11.63-12.846-20.809-18.824 c-4.57-2.963-9.874-5.57-15.801-7.356c-5.926-1.785-12.445-2.748-19.375-2.74c-7.034-0.008-13.649,0.978-19.649,2.829 c-10.56,3.222-18.864,9.016-25.202,14.756c-4.789,4.327-8.652,8.66-12.115,12.438c-5.175,5.726-9.453,10.067-13.483,12.63 c-2.03,1.304-3.989,2.252-6.289,2.948c-2.304,0.696-4.993,1.148-8.564,1.155c-3.63-0.007-6.352-0.481-8.678-1.185 c-4.019-1.259-7.237-3.297-11.142-6.778c-2.889-2.6-5.989-5.985-9.53-9.867c-5.323-5.779-11.63-12.853-20.801-18.831 c-4.575-2.963-9.875-5.57-15.804-7.356c-5.931-1.785-12.445-2.748-19.372-2.74v37.409c3.63,0,6.348,0.482,8.678,1.186 c4.023,1.252,7.237,3.296,11.142,6.778c2.892,2.593,5.993,5.978,9.53,9.868c5.323,5.778,11.63,12.852,20.805,18.83 c4.57,2.964,9.867,5.571,15.801,7.349c5.93,1.792,12.445,2.756,19.371,2.748c7.034,0.008,13.645-0.985,19.649-2.837 c10.564-3.216,18.864-9.008,25.206-14.75c4.789-4.326,8.652-8.66,12.116-12.438c5.17-5.726,9.452-10.068,13.482-12.638 c2.03-1.304,3.986-2.252,6.289-2.948c2.3-0.689,4.989-1.148,8.56-1.148c3.634,0,6.352,0.482,8.686,1.186 c4.015,1.252,7.237,3.296,11.142,6.778c2.889,2.593,5.985,5.978,9.526,9.868c5.327,5.778,11.63,12.852,20.809,18.83 c4.57,2.964,9.868,5.571,15.801,7.349c5.926,1.792,12.445,2.756,19.371,2.748c7.038,0.008,13.653-0.985,19.653-2.83 c10.564-3.222,18.869-9.015,25.209-14.756c4.793-4.326,8.66-8.652,12.119-12.438c5.186-5.719,9.46-10.068,13.49-12.631 c2.029-1.311,3.992-2.251,6.296-2.955c2.305-0.689,4.993-1.148,8.571-1.148c3.63,0,6.348,0.482,8.682,1.186 c4.022,1.252,7.244,3.296,11.149,6.778c2.888,2.593,5.992,5.978,9.534,9.868c5.319,5.778,11.63,12.852,20.809,18.83 c4.57,2.964,9.874,5.571,15.801,7.349c5.934,1.792,12.452,2.756,19.379,2.748c7.037,0.008,13.645-0.985,19.653-2.83 c10.564-3.222,18.868-9.015,25.209-14.756c4.793-4.326,8.66-8.652,12.12-12.438c5.186-5.719,9.46-10.068,13.497-12.631 c2.03-1.311,3.993-2.251,6.297-2.948c2.304-0.696,4.993-1.156,8.571-1.156V389.26c-7.038-0.008-13.652,0.978-19.654,2.829 C481.776,395.311,473.479,401.097,467.138,406.845z"></path> </g> </g></svg>
`;
            case SearchType.Coordinates:
                return `
                    <svg height="24px" width="24px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="#0000FF">
                    <g>
                        <path d="M32,2C18.746,2,8,12.746,8,26c0,16.294,22.127,35.283,22.83,35.903c0.378,0.328,0.848,0.491,1.317,0.491
                        c0.469,0,0.939-0.163,1.317-0.491C33.873,61.283,56,42.294,56,26C56,12.746,45.254,2,32,2z M32,36c-5.523,0-10-4.477-10-10
                        s4.477-10,10-10s10,4.477,10,10S37.523,36,32,36z"></path>
                    </g>
                    </svg>
                `;
    
            default:
                console.warn("No valid search type selected, can't get search icon");
                return '';
                break;
                // throw new Error("Invalid search type");
        }
    }
    
    async function getServiceTypes(){
        try {
            const response:Array<client.ServiceTypeModel> = await types.typesServiceTypesGet();
            serviceTypes.value = response;
            console.log(serviceTypes.value);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
    }

    async function resetServiceFilterOptions(){
        if(serviceFilterOptions === undefined) return;

        serviceFilterOptions.value = serviceFilterOptions.value.map(x => {
            return {
                serviceType: x,
                active: false
            } as FilterOption;
        }).sort((a:FilterOption, b:FilterOption) => {
            return a?.serviceType.value!.localeCompare(b?.serviceType.value!);
        });
    }

    function setServiceFilterOptionActive(key: string){
        const option = serviceFilterOptions.value?.find(x => x.serviceType.key === key);
        if(option){
            option.active = true;
        }
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
                // alert("sorting abc")
                break;
            case "Number Of Services":
                marinaSearchResults.value.sort((a: client.MarinaModel, b: client.MarinaModel) => {
                    return  (b.services?.length || 0) - (a.services?.length || 0);
                });
                // alert("sorting #services");
                break;
            default:
                break;
        }
    }

    return { 
        currentSearchType,
        selectedSuggestion,
        searchMarinas,
        getCurrentSearchIcon,
        serviceTypes,
        marinaSearchValue, 
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
        setServiceFilterOptionActive
    };
});