import { From } from './enums';

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

const dispatchSync = (message: any, data: any) =>
  chrome.runtime.sendMessage({ source: From.Content, message, data });

const dispatchAsync = (message: any, data: any): Promise<any> =>
  new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(
      { source: From.Content, message, data },
      (response) => {
        if (response.error) return reject(response.error);
        return resolve(response.success);
      }
    );
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

if (!(globalThis as any).hasContentMessageListener) {
  chrome.runtime.onMessage.addListener(onMessage);
  (globalThis as any).hasContentMessageListener = true;
}

export const ContentBroker = { on, dispatch };
