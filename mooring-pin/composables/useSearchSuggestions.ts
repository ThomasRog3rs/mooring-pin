import { ref } from 'vue';
import { SearchType, type SuggestionModel } from '@/types/search';
import { normalize, calculateScore } from '@/utils/searchHelpers';
import {getMapBoxSuggestions} from '@/services/mapbox';

export function useSearchSuggestions(
  marinaNames: Ref<string[] | null>,
  canalNames: Ref<string[] | null>
) {
  const suggestions = ref<SuggestionModel[]>([]);

  const setSuggestions = async (currentSearchValue: string) => {
    if (!currentSearchValue || currentSearchValue === '') {
      suggestions.value = [];
      return;
    }

    currentSearchValue = normalize(currentSearchValue);
    const mapBoxSuggestions = await getMapBoxSuggestions(currentSearchValue);

    const filteredMarinas = marinaNames.value?.map((marina) => ({
      name: marina,
      type: SearchType.Marina,
      score: calculateScore(currentSearchValue, marina, 'marina') ?? 0,
      coordinates: undefined
    } as SuggestionModel));

    const filteredCanals = canalNames.value?.map((canal) => ({
      name: canal,
      type: SearchType.Canal,
      score: calculateScore(currentSearchValue, canal, 'canal') ?? 0,
      coordinates: undefined
    } as SuggestionModel));

    const mapBoxResults = mapBoxSuggestions?.features.map((x: any) => ({
      name: x.properties.full_address ?? "NOPE",
      type: SearchType.Coordinates,
      score: calculateScore(currentSearchValue, x.properties.full_address ?? "NOPE", "coordinates") ?? 0,
      coordinates: `${x.properties.coordinates.latitude},${x.properties.coordinates.longitude}`
    } as SuggestionModel));

    const allSuggestions = [
      ...(mapBoxResults ?? []),
      ...(filteredMarinas ?? []),
      ...(filteredCanals ?? [])
    ];

    if (currentSearchValue.length < 3) {
      const maxPerType = 3;
      suggestions.value = [
        ...allSuggestions.filter(s => s.type === SearchType.Coordinates).slice(0, maxPerType),
        ...allSuggestions.filter(s => s.type === SearchType.Marina).slice(0, maxPerType),
        ...allSuggestions.filter(s => s.type === SearchType.Canal).slice(0, maxPerType)
      ];
    } else {
      suggestions.value = allSuggestions
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);
    }
  };

  return {
    suggestions,
    setSuggestions
  };
}