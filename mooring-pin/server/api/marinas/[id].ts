export default defineEventHandler(async (event) => {
    if(event.context.params == null) return;

    setResponseHeaders(event, {
        'Cache-Control': 'public, max-age=43200, stale-while-revalidate=21600'
    });

    const id = event.context.params.id;
    const config = useRuntimeConfig();

    const storage = useStorage();
    const cacheKey = `marina:${id}`;
    const cached = await  storage.getItem(cacheKey);

    if(cached){
        return cached;
    }
    
    const response = await fetch(`${config.apiBaseUrl}/Data/marina/${id}`);
    const data = await response.json();
    
    if (!response.ok) {
      throw createError({
        statusCode: response.status,
        message: 'Failed to fetch marina data'
      });
    }

    //To do: add a way/an endpoint to invalidate cache when we want immediate changes
    await storage.setItem(cacheKey, data, {
        ttl: 43200 // 12hours (an aggresive cache because this data shoud not change often)
    });
    
    return data;
  });