import { defineEventHandler, getQuery } from 'h3';
import { DataMarinasSearchGetRequest, MarinaModel } from '~/api-client';

export default defineEventHandler(async (event) => {
  const query = getQuery(event) as DataMarinasSearchGetRequest;

  const {
    name,
    canalName,
    searchCoordinates,
    userCoordinates,
    searchDistance,
    limit,
    offset,
    serviceTypes,
    matchAllServices,
  } = query;

  const config = useRuntimeConfig();
  const baseURL = config.apiBaseUrl;

  try {
    const foundMarinaData: MarinaModel[] = await $fetch('/Data/marinas/search', {
      baseURL,
      params: {
        name,
        canalName,
        searchCoordinates,
        userCoordinates,
        searchDistance,
        limit,
        offset,
        serviceTypes,
        matchAllServices,
      },
    });

    return foundMarinaData;
  } catch (error: any) {
    if (error.response?.status === 404) {
      return [];
    }

    throw createError({
      statusCode: error.response?.status || 500,
      message: error.message || 'Failed to fetch marinas',
    });
  }
});
