export let cache: Cache;

export const openCache = async () => {
  cache = await caches.open(chrome.i18n.getMessage('extName'));
};

export const getCachedData = async (request: string) => {
  const responses = await cache.match(request);
  const responseText = responses?.text();
  return responseText ? JSON.parse(await responseText) : undefined;
};

export const setCacheData = async (request: string, commonFetchOptions) => {
  cache.add(new Request(request, commonFetchOptions));

  setTimeout(() => {
    cache.delete(request);
  }, 900000); // 15 minutes
};
