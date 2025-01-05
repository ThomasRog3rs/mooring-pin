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

export function calculateZoomLevel(searchRadius: number | undefined) : number{
    if(searchRadius === undefined){
        return 15;
    }
    
    // Define the min and max zoom levels
    const minZoom = 6;
    const maxZoom = 10;
    
    // Define the min and max search radius
    const minRadius = 1;  // 1 mile
    const maxRadius = 30; // 30 miles
    
    // Clamp the searchRadius within the min/max bounds
    searchRadius = Math.max(minRadius, Math.min(searchRadius, maxRadius));
    
    // Linear interpolation to get the zoom level
    const zoomLevel = maxZoom - ((searchRadius - minRadius) / (maxRadius - minRadius)) * (maxZoom - minZoom);
    
    return zoomLevel;
}

// export function calculateCenterCoords(currentSearchType : SearchType, selectedSuggestion: SuggestionModel):number[]{
//     let centerCoordinates : number[];
//     let searchRadius;

//     switch(currentSearchType){
//       case SearchType.Marina:
//         centerCoordinates = selectedSuggestion.coordinates?.split(",").map(Number) as number[];
//         break;
//       case SearchType.Canal:
//         //Work out centre and zoom for canal name search type
//         // Sort results by latitude (north-south)
//         const sortedMarinas = searchStore.marinaSearchResults!.sort((a, b) => {
//           const aCoords = a.coordinates!.split(",").map(Number);
//           const bCoords = b.coordinates!.split(",").map(Number);
//           return aCoords[0] - bCoords[0]; // Compare latitudes
//         });

//         // Get the northernmost and southernmost marinas
//         const northernmost = sortedMarinas[0].coordinates!.split(",").map(Number);
//         const southernmost = sortedMarinas[sortedMarinas.length - 1].coordinates!.split(",").map(Number);

//         // Calculate center coordinates as the midpoint between northernmost and southernmost marinas
//         const centerLng = (northernmost[0] + southernmost[0]) / 2;
//         const centerLat = (northernmost[1] + southernmost[1]) / 2;
//         centerCoordinates = [centerLng, centerLat];

//         // //Calculate the distance between the northernmost and southernmost marinas
//         // const distance = calculateDistance(northernmost, southernmost);
//         // // alert(distance)
//         // // Use the distance to set the searchRadius
//         // searchRadius = distance;
//         break;
//       default:
//         centerCoordinates = searchStore.searchLocationCoordinatesValue?.split(",");
//         searchRadius = searchStore.searchRadiusValue
//     }
}