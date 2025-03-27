export default defineEventHandler(async (event) => {
  const acceptLanguage = getHeader(event, 'accept-language') || 'en'; // en is a default language

  const response = await fetch("https://tech-test.palazzinacreativa.it/api/categories", {
    headers: {
      "Accept-Language": acceptLanguage
    }
  });

  return response.json();
});