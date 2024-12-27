import * as client from "@/api-client";

export enum SearchType {
    Coordinates = 'Location',
    Canal = 'Canal name',
    Marina = 'Marina name',
    None = 'None' // Edge case for when no search type is set
}

export interface SuggestionModel {
    name: string;
    type: SearchType;
    coordinates: string | undefined;
    score: number
}

export type SearchPayload = {
    marina: string;
    service: string;
  };

//Define the type for sort options
export type SortOption = {
    name: string,
    active: boolean,
    id: number,
    enabled: boolean
}

export type FilterOption = {
    serviceType: client.ServiceTypeModel,
    active: boolean
}