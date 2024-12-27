export interface UserLocation {
    latitude: number;
    longitude: number;
}

export interface LocationResult {
    userLocation: Ref<UserLocation | null>,
    error: Ref<string | null>
}