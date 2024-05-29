import { From, To } from './enums';

function onMessage(
  request: any,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: any) => void
) {
  const { message } = request;
  globalThis.top?.document.dispatchEvent(
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
  globalThis.top?.document.addEventListener(event, (e: any) => {
    subscriber(e.detail);
  });
};

const dispatchSyncToBackground = (message: any, data: any) => {
  chrome.runtime.sendMessage({ source: From.Popup, message, data });
};

const dispatchAsyncToBackground = (message: any, data: any): Promise<any> =>
  new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(
      { source: From.Popup, message, data },
      (response) => {
        if (response.error) return reject(response.error);
        return resolve(response.success);
      }
    );
  });

const dispatchSyncToContent = (message: any, data: any) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any) => {
    chrome.tabs.sendMessage(tabs[0]?.id, {
      source: From.Popup,
      message,
      data,
    });
  });
};

const dispatchAsyncToContent = (message: any, data: any): Promise<any> =>
  new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any) => {
      const activeTabId = tabs[0]?.id || -1;
      chrome.tabs.sendMessage(
        activeTabId,
        {
          source: From.Popup,
          message,
          data,
        },
        (response) => {
          const { lastError } = chrome.runtime;
          if (lastError) {
            return reject(lastError);
          }
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
  destination: string,
  async: boolean
): Promise<any> | undefined => {
  if (async) {
    return destination === To.Content
      ? dispatchAsyncToContent(message, data)
      : dispatchAsyncToBackground(message, data);
  }

  if (destination === To.Content) {
    dispatchSyncToContent(message, data);
  } else {
    dispatchSyncToBackground(message, data);
  }
  return undefined;
};

if (!(globalThis as any).hasPopupMessageListener) {
  chrome.runtime.onMessage.addListener(onMessage);
  (globalThis as any).hasPopupMessageListener = true;
}

export const PopupBroker = { on, dispatch };
