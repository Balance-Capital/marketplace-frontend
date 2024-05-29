import { Generic } from '@monorepo/chrome-extension/msg-bridge';
import { cache, getCachedData, setCacheData } from '../cache';
import { environment } from '../environments/environment';
import { v4 } from 'uuid';

let sessionId = '';
chrome.storage.local.get([Generic.GetSessionId], function (result) {
  if (Object.keys(result).length && result[Generic.GetSessionId]) {
    sessionId = result[Generic.GetSessionId];
  } else {
    sessionId = v4();
    chrome.storage.local.set({ [Generic.GetSessionId]: sessionId });
  }
});

const getToken = () =>
  new Promise((resolve) => {
    chrome.storage.local.get([Generic.GetAuthToken], function (result) {
      if (Object.keys(result).length && result[Generic.GetAuthToken]) {
        resolve(result[Generic.GetAuthToken]);
      }
    });
  });

export const callApi = async (request: string, commonFetchOptions) => {
  const response = await fetch(request, commonFetchOptions);
  if (response.ok) {
    const responseText = await response.text();
    return JSON.parse(responseText);
  } else {
    if (response.status === 401) {
      setTimeout(() => {
        chrome.storage.local.set({ [Generic.GetAuthToken]: null });
      }, 1000);
    }
  }
  throw { status: response.status, statusText: response.statusText };
};

export const get = async <T>(path: string, isCaching: boolean): Promise<T> => {
  const url = `${environment.API_ADDRESS}/${path}sessionId=${sessionId}`;
  const token = await getToken();
  const commonFetchOptions = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  if (isCaching) {
    const isCacheAvailable = await cache.keys(url);
    if (isCacheAvailable[0]) {
      return await getCachedData(url);
    } else {
      const data = await callApi(url, commonFetchOptions);
      setCacheData(url, commonFetchOptions);
      return data;
    }
  } else {
    return await callApi(url, commonFetchOptions);
  }
};

export const post = async <T>(path: string, fields): Promise<T> => {
  const url = `${environment.API_ADDRESS}/${path}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ ...fields }),
  });
  if (response.ok) {
    const responseText = await response.text();
    return JSON.parse(responseText);
  }
  throw await response.json();
};
