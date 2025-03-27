export default defineEventHandler(async (event) => {
  const acceptLanguage = getHeader(event, 'accept-language') || 'en';
  const { slug } = event.context.params;

  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing products slug' });
  }

  const response = await fetch(`https://tech-test.palazzinacreativa.it/api/products/${slug}`, {
    headers: {
      "Accept-Language": acceptLanguage
    }
  });

  if (!response.ok) {
    throw createError({ statusCode: response.status, statusMessage: 'Error fetching products' });
  }

  return response.json();

});