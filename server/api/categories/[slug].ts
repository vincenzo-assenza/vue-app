export default defineEventHandler(async (event) => {
  const acceptLanguage = getHeader(event, 'accept-language') || 'en';
  const { slug } = event.context.params;

  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing category slug' });
  }

  const response = await fetch(`https://tech-test.palazzinacreativa.it/api/categories/${slug}`, {
    headers: {
      "Accept-Language": acceptLanguage
    }
  });

  if (!response.ok) {
    throw createError({ statusCode: response.status, statusMessage: 'Error fetching categories' });
  }

  return response.json();

});