import {defineStore} from "pinia";
import {ref} from 'vue';
import {type MarinaModel} from '../api-client';

export const useSavedMarinasStore = defineStore("savedMarinaStore", () => {
    const savedMarinas = ref<Array<MarinaModel> | undefined>([]);
    
    return{
        savedMarinas
    }
}, 
{
    persist: {
        storage: piniaPluginPersistedstate.localStorage(),
    }
});