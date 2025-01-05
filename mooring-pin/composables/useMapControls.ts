import { useSearchStore } from "~/stores/search.store";
import{SearchType} from '~/types/search';

export const useMapControls = () => {
    const searchStore = useSearchStore();
    const {searchRadiusValue, currentSearchType, mapRadius} = storeToRefs(searchStore);

    const calculateCenterCoords = () : number[] => {
        let centerCoordinates : number[];

        switch(searchStore.currentSearchType){
          case SearchType.Marina:
            centerCoordinates = searchStore.marinaSearchResults![0].coordinates?.split(",").map(Number) as number[];
            mapRadius.value = undefined;
            break;
          case SearchType.Canal:
            //Work out centre and zoom for canal name search type
            // Sort results by latitude (north-south)
            const sortedMarinas = searchStore.marinaSearchResults!.sort((a, b) => {
              const aCoords = a.coordinates!.split(",").map(Number);
              const bCoords = b.coordinates!.split(",").map(Number);
              return aCoords[0] - bCoords[0]; // Compare latitudes
            });
    
            // Get the northernmost and southernmost marinas
            const northernmost = sortedMarinas[0].coordinates!.split(",").map(Number);
            const southernmost = sortedMarinas[sortedMarinas.length - 1].coordinates!.split(",").map(Number);
    
            // Calculate center coordinates as the midpoint between northernmost and southernmost marinas
            const centerLat = (northernmost[1] + southernmost[1]) / 2;
            const centerLng = (northernmost[0] + southernmost[0]) / 2;

            centerCoordinates = [centerLng, centerLat];
    
            //Calculate the distance between the northernmost and southernmost marinas
            const distance = calculateDistance(northernmost, southernmost);
            // alert(distance)
            // Use the distance to set the searchRadius
            mapRadius.value = distance;
            break;
          default:
            centerCoordinates = searchStore.searchLocationCoordinatesValue?.split(",").map(Number) as number[];
            mapRadius.value = searchStore.searchRadiusValue;
        }

        return centerCoordinates;
    }

    const calculateZoomLevel =  (mapRadius: number | undefined) : number => {
        if(mapRadius === undefined){
            return 15;
        }   

        // Define the min and max zoom levels
        const minZoom = 6;
        const maxZoom = 10;
        
        // Define the min and max search radius
        const minRadius = 1;  // 1 mile
        const maxRadius = 30; // 30 miles
        
        // Clamp the searchRadius within the min/max bounds
        mapRadius = Math.max(minRadius, Math.min(mapRadius, maxRadius));
        
        // Linear interpolation to get the zoom level
        const zoomLevel = maxZoom - ((mapRadius - minRadius) / (maxRadius - minRadius)) * (maxZoom - minZoom);

        return zoomLevel;
    };

    const calculateDistance = (coord1 : number[], coord2: number[]) : number => {
        const R = 3958.8; // Earth's radius in miles
        const lat1 = coord1[0] * (Math.PI / 180);  // Convert latitude to radians
        const lat2 = coord2[0] * (Math.PI / 180);  // Convert latitude to radians
        const deltaLat = lat2 - lat1;
        const deltaLng = (coord2[1] - coord1[1]) * (Math.PI / 180);  // Convert longitude to radians
      
        // Haversine formula
        const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
                  Math.cos(lat1) * Math.cos(lat2) *
                  Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
      
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in miles
    }
  
    return {
        calculateZoomLevel,
        calculateCenterCoords
    };
  };
    