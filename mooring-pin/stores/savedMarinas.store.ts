import {defineStore} from "pinia";
import {ref} from 'vue';
import {type MarinaModel} from '../api-client';

export const useSavedMarinasStore = defineStore("savedMarinaStore", () => {
    const savedMarinas = ref<Array<MarinaModel> | undefined>([]);

    function isMarinaSaved(marinaId:string):boolean{
        return (savedMarinas.value ?? []).some(x => x.id === marinaId);
    }

    function isMarinaSavedByGeoJsonId(geoJsonId:number):boolean{
        return (savedMarinas.value ?? []).some(x => x.geoJsonId === geoJsonId);
    }

    const saveMarina = (marina:MarinaModel) => {
        if(isMarinaSaved(marina?.id!)) return;
        savedMarinas.value?.push(marina);
    }

    const unSaveMarina = (marinaId:string) => {
        if(isMarinaSaved(marinaId) === false) return;
        savedMarinas.value = savedMarinas.value?.filter(x => x.id !== marinaId);
    }
    
    return{
        savedMarinas,
        saveMarina,
        unSaveMarina,
        isMarinaSaved,
        isMarinaSavedByGeoJsonId
    }
}, 
{
    persist: {
        storage: piniaPluginPersistedstate.localStorage(),
    }
});