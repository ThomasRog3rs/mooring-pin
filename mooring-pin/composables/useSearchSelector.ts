import { ref } from "vue";
import { useGetSearchResults, type SearchResponse } from '~/composables/useGetSearchResults';
import { useSearchStore } from "~/stores/search.store";
import { SearchType } from "~/types/search";

export function useSearchSelector() {
  const searchErrorMsg = ref<string | null>(null);
  const searchHasError = ref<boolean>(false);
  const searchStore = useSearchStore();
  const { getLocationSearchResults, getCanalSearchResults, getMarinaSearchResults } = useGetSearchResults();

  const searchByType = async () => {
    searchHasError.value = false;
    searchErrorMsg.value = null;

    let searchResult: SearchResponse;

    switch (searchStore.currentSearchType) {
      case SearchType.Coordinates:
        searchResult = await getLocationSearchResults();
        break;
      case SearchType.Marina:
        searchResult = await getMarinaSearchResults();
        break;
      case SearchType.Canal:
        searchResult = await getCanalSearchResults();
        break;
      default:
        searchResult = await getLocationSearchResults();
    }

    if (searchResult.hasError) {
      searchErrorMsg.value = searchResult.errorMessage ?? "Something has gone wrong with the search";
      searchHasError.value = true;
      return;
    }

    searchStore.marinaSearchResults = searchResult.data ?? [];

  };

  return {
    searchByType,
    searchErrorMsg,
    searchHasError,
  };
}
