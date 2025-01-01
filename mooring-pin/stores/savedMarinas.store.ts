import {defineStore} from "pinia";
import {ref} from 'vue';
import {type MarinaModel} from '../api-client';

export const useSavedMarinasStore = defineStore("savedMarinaStore", () => {
    const savedMarinas = ref<Array<MarinaModel> | undefined>([]);

    function isMarinaSaved(marina:MarinaModel):boolean{
        return (savedMarinas.value ?? []).some(x => x.id === marina.id)
    }

    const saveMarina = (marina:MarinaModel) => {
        if(isMarinaSaved(marina)) return;
        savedMarinas.value?.push(marina);
    }

    const unSaveMarina = (marina:MarinaModel) => {
        if(isMarinaSaved(marina) === false) return;
        savedMarinas.value = savedMarinas.value?.filter(x => x.id !== marina.id);
    }
    
    return{
        savedMarinas,
        saveMarina,
        unSaveMarina,
        isMarinaSaved
    }
}, 
{
    persist: {
        storage: piniaPluginPersistedstate.localStorage(),
    }
});