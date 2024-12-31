export default defineEventHandler(async (event) => {
  const query = getQuery(event); 
  const qname = query.name as string;

  if (!qname) {
    throw createError({
      statusCode: 400,
      message: 'The "name" query parameter is required.',
    });
  }

  const decodedName = decodeURIComponent(qname);

  const config = useRuntimeConfig();

  const response = await fetch(`${config.apiBaseUrl}/Data/marina/by-name/${decodedName}`);
  const data = await response.json();
  
  if (!response.ok) {
    throw createError({
      statusCode: response.status,
      message: 'Failed to fetch marina data by name'
    });
  }

  return data;
});