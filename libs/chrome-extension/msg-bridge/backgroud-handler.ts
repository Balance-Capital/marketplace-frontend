import { From } from './enums';

function onMessage(
  request: any,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: any) => void
) {
  const { message } = request;
  globalThis.dispatchEvent(
    new CustomEvent(message, {
      detail: {
        request,
        sender,
        sendResponse,
      },
    })
  );
  return true;
}

const on = (event: any, subscriber: any) => {
  globalThis.addEventListener(event, (e: any) => {
    subscriber(e.detail);
  });
};

const dispatchSync = (message: any, data: any) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any) => {
    chrome.tabs.sendMessage(tabs[0]?.id, {
      source: From.Background,
      message,
      data,
    });
  });
};

const dispatchAsync = (message: any, data: any): Promise<any> =>
  new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any) => {
      const activeTabId = tabs[0]?.id || -1;
      chrome.tabs.sendMessage(
        activeTabId,
        {
          source: From.Background,
          message,
          data,
        },
        (response) => {
          if (response.error) {
            return reject(response.error);
          }
          return resolve(response.success);
        }
      );
    });
  });

const dispatch = (
  message: string,
  data: any,
  async: boolean
): Promise<any> | undefined => {
  if (async) {
    return dispatchAsync(message, data);
  }
  dispatchSync(message, data);
  return undefined;
};

if (!(globalThis as any).hasBackgroundMessageListener) {
  chrome.runtime.onMessage.addListener(onMessage);
  (globalThis as any).hasBackgroundMessageListener = true;
}

export const BgBroker = { on, dispatch };
