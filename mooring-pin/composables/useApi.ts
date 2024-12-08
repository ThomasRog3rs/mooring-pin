export const useApi = () => {
    const config = useRuntimeConfig();
    const apiBaseUrl = config.public.apiBaseUrl;
    
    const apiFetch = async <T>(endpoint: string): Promise<T> => {
      try {
        const response = await $fetch(`${apiBaseUrl}${endpoint}`);
        return response as T;
      } catch (error) {
        console.error('Error fetching data from API:', error);
        throw error;
      }
    };
  
    return {
      apiFetch,
    };
  };
  