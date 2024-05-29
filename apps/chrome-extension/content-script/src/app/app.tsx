import {
  ContentBroker,
  Generic,
  ISettings,
  Segment,
} from '@monorepo/chrome-extension/msg-bridge';
import { getCookie } from './helpers';

import Store from './pages/store/Store';

export default function App() {
  return (
    <div className="fixed z-[2147483647]">
      <Store />
    </div>
  );
}

chrome.storage.local.get([Generic.AuthTabId], function (result) {
  if (Object.keys(result).length && result[Generic.AuthTabId]) {
    ContentBroker.dispatch(Generic.GetCurrentTabId, null, true)?.then(
      (response) => {
        if (response.tabId === result[Generic.AuthTabId]) {
          if (window.document.cookie) {
            const token = getCookie('token');
            if (token) {
              chrome.storage.local.set({ [Generic.GetAuthToken]: token });
              ContentBroker.dispatch(Generic.GetSettings, null, true)?.then(
                (response: ISettings) => {
                  chrome.storage.local.set({ [Generic.UserInfo]: response });
                  ContentBroker.dispatch(
                    Generic.PostSegment,
                    {
                      url: Segment.IDENTIFY_API,
                      info: {
                        userId: response.userId,
                        traits: {
                          name: `${response.firstName} ${
                            response.lastName ? response.lastName : ''
                          }`,
                          email: response.email,
                        },
                      },
                    },
                    false
                  );
                  ContentBroker.dispatch(
                    Generic.PostSegment,
                    {
                      url: Segment.TRACK_API,
                      info: {
                        userId: response.userId,
                        event: Segment.LOGGED_IN_EVENT,
                      },
                    },
                    false
                  );
                  setTimeout(() => {
                    window.close();
                  }, 500);
                }
              );
            }
          }
        }
      }
    );
  }
});
