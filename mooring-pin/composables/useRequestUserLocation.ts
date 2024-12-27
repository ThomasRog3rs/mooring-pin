import { type UserLocation, type LocationResult } from "~/types/userLocation";

export const useRequestUserLocation = () => {
    const userLocation = ref<UserLocation | null>(null);
    const error = ref<string | null>(null);

    const requestUserLocation = () : Promise<LocationResult> => {
        return new Promise<LocationResult>((resolve, reject) => {
            if(!navigator.geolocation){
                error.value = "Geolocation is not supported by this browser";
                console.warn(error.value);
                resolve({userLocation, error});
                return;
            }
    
            navigator.geolocation.getCurrentPosition(
                (position) => {
                  userLocation.value = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                  };
    
                  console.log('Location:', userLocation.value);
    
                  resolve({userLocation, error});
                },
                (err) => {
                  switch (err.code) {
                    case err.PERMISSION_DENIED:
                      error.value = "User denied the request for Geolocation.";
                      break;
                    case err.POSITION_UNAVAILABLE:
                      error.value = "Location information is unavailable.";
                      break;
                    case err.TIMEOUT:
                      error.value = "The request to get user location timed out.";
                      break;
                    default:
                      error.value = "An unknown error occurred.";
                      break;
                  }

                  console.log('Error:', error.value);

                  resolve({userLocation, error});
                }
            )
        });
    };

    return{
        requestUserLocation
    }
}