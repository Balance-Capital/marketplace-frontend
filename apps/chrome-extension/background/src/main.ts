import { Buffer } from 'buffer';
import * as api from './api';
import { openCache } from './cache';
import {
  BgBroker,
  Generic,
  IOffer,
  IProduct,
  IReferral,
  IReward,
  ISettings,
  IStore,
} from '@monorepo/chrome-extension/msg-bridge';
import { environment } from './environments/environment';

(async () => {
  await openCache();
})();

BgBroker.on(Generic.GetStores, (detail: any) => {
  api
    .getStores<{ data: IStore[] }>()
    .then(({ data }: { data: IStore[] }) => {
      detail.sendResponse({ success: data });
    })
    .catch((error) => {
      detail.sendResponse({ error });
    });
});

BgBroker.on(Generic.GetStoresByAlphabet, (detail: any) => {
  api
    .getStoresByAlphabet<IStore[]>(detail.request.data)
    .then((response: IStore[]) => {
      detail.sendResponse({ success: response });
    })
    .catch((error) => {
      detail.sendResponse({ error });
    });
});

BgBroker.on(Generic.GetStoresBySearchText, (detail: any) => {
  api
    .getStoresBySearch<IStore[]>(detail.request.data)
    .then((response: IStore[]) => {
      detail.sendResponse({ success: response });
    })
    .catch((error) => {
      detail.sendResponse({ error });
    });
});

BgBroker.on(Generic.GetStore, (detail: any) => {
  api
    .getStore<{ data: { store: IStore; offers: IOffer[] } }>(
      detail.request.data
    )
    .then((response: { data: { store: IStore; offers: IOffer[] } }) => {
      detail.sendResponse({ success: response.data });
    })
    .catch((error) => {
      detail.sendResponse({ error });
    });
});

BgBroker.on(Generic.GetReferrals, (detail: any) => {
  api
    .getReferrals<IReferral>()
    .then((response: IReferral) => {
      detail.sendResponse({ success: response });
    })
    .catch((error) => {
      detail.sendResponse({ error });
    });
});

BgBroker.on(Generic.GetRewards, (detail: any) => {
  api
    .getRewards<IReward>()
    .then((response: IReward) => {
      detail.sendResponse({ success: response });
    })
    .catch((error) => {
      detail.sendResponse({ error });
    });
});

BgBroker.on(Generic.GetSettings, (detail: any) => {
  api
    .getSettings<ISettings>()
    .then((response: ISettings) => {
      detail.sendResponse({ success: response });
    })
    .catch((error) => {
      detail.sendResponse({ error });
    });
});

BgBroker.on(Generic.GetProducts, (detail: any) => {
  api
    .getProducts<IProduct[]>()
    .then((data: IProduct[]) => {
      detail.sendResponse({ success: data });
    })
    .catch((error) => {
      detail.sendResponse({ error });
    });
});

BgBroker.on(Generic.GetProductsBySearchText, (detail: any) => {
  api
    .getProductsBySearch<IProduct[]>(detail.request.data)
    .then((response: IProduct[]) => {
      detail.sendResponse({ success: response });
    })
    .catch((error) => {
      detail.sendResponse({ error });
    });
});

BgBroker.on(Generic.PostLogin, (detail: any) => {
  api
    .postLogin<{ email: string; password: string }>(detail.request.data)
    .then((response) => {
      detail.sendResponse({ success: response });
    })
    .catch((error) => {
      detail.sendResponse({ error });
    });
});

BgBroker.on(Generic.PostSegment, (detail: any) => {
  const { url, info } = detail.request.data;
  const myHeaders = new Headers();
  myHeaders.append(
    'Authorization',
    `Basic ${Buffer.from(environment.SEGMENT_KEY + ':').toString('base64')}`
  );
  myHeaders.append('Content-Type', 'application/json');
  const raw = JSON.stringify(info);
  fetch(`${environment.SEGMENT_API}/${url}`, {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  });
});

BgBroker.on(Generic.GetAuthToken, (detail: any) => {
  const { token } = detail.request.data;
  chrome.storage.local.set({ [Generic.GetAuthToken]: token });
});

BgBroker.on(Generic.OpenAffiliateInTab, async (detail: any) => {
  const { redirectUrl } = detail.request.data;
  const tabInfo = await chrome.tabs.create({ url: redirectUrl, active: false });
  const listener = function (
    tabId: number,
    changeInfo: chrome.tabs.TabChangeInfo
  ) {
    if (changeInfo.status === 'complete' && tabId === tabInfo.id) {
      chrome.tabs.onUpdated.removeListener(listener);
      chrome.tabs.remove(tabId);
    }
  };
  detail.sendResponse({ success: true });
  chrome.tabs.onUpdated.addListener(listener);
});

BgBroker.on(Generic.ToolBarIconAndBadgeValue, (detail: any) => {
  const { id } = detail.sender.tab;
  const { icon16, offersCount } = detail.request.data;
  chrome.action.setIcon({
    path: { '16': chrome.runtime.getURL(icon16) },
    tabId: id,
  });
  chrome.action.setBadgeText({ tabId: id, text: offersCount });
  chrome.action.setBadgeBackgroundColor({ tabId: id, color: '#000' });
});

BgBroker.on(Generic.GetCurrentTabId, (detail: any) => {
  detail.sendResponse({ success: { tabId: detail.sender.tab.id } });
});
