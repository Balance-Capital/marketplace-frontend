import {
  Generic,
  PopupBroker,
  Segment,
  To,
} from '@monorepo/chrome-extension/msg-bridge';

export const onClickStore = (storeName: string, storeCategory: string[]) => {
  chrome.storage.local.get([Generic.UserInfo], function (result) {
    if (Object.keys(result).length && result[Generic.UserInfo]) {
      PopupBroker.dispatch(
        Generic.PostSegment,
        {
          url: Segment.TRACK_API,
          info: {
            userId: result[Generic.UserInfo].userId,
            event: Segment.STORE_CLICKED_EVENT,
            properties: {
              store: storeName,
              storeCategory: storeCategory.toString(),
              storeCategoryList: storeCategory,
            },
          },
        },
        To.Background,
        false
      );
    }
  });
};

export const onClickPopularStore = (
  storeName: string,
  storeCategory: string[]
) => {
  chrome.storage.local.get([Generic.UserInfo], function (result) {
    if (Object.keys(result).length && result[Generic.UserInfo]) {
      PopupBroker.dispatch(
        Generic.PostSegment,
        {
          url: Segment.TRACK_API,
          info: {
            userId: result[Generic.UserInfo].userId,
            event: Segment.STORE_CLICKED_EVENT,
            properties: {
              store: storeName,
              isStorePopular: true,
              storeCategory: storeCategory.toString(),
              storeCategoryList: storeCategory,
            },
          },
        },
        To.Background,
        false
      );
    }
  });
};

export const onClickTodaysDeal = (
  storeName: string,
  storeCategory: string[],
  dealTitle: string
) => {
  chrome.storage.local.get([Generic.UserInfo], function (result) {
    if (Object.keys(result).length && result[Generic.UserInfo]) {
      PopupBroker.dispatch(
        Generic.PostSegment,
        {
          url: Segment.TRACK_API,
          info: {
            userId: result[Generic.UserInfo].userId,
            event: Segment.DEAL_CLICKED_EVENT,
            properties: {
              store: storeName,
              isTodaysDeal: true,
              dealCode: dealTitle,
              storeCategory: storeCategory.toString(),
              storeCategoryList: storeCategory,
            },
          },
        },
        To.Background,
        false
      );
    }
  });
};

export const onClickTrendingDeal = (
  storeName: string,
  storeCategory: string[],
  dealTitle: string
) => {
  chrome.storage.local.get([Generic.UserInfo], function (result) {
    if (Object.keys(result).length && result[Generic.UserInfo]) {
      PopupBroker.dispatch(
        Generic.PostSegment,
        {
          url: Segment.TRACK_API,
          info: {
            userId: result[Generic.UserInfo].userId,
            event: Segment.DEAL_CLICKED_EVENT,
            properties: {
              store: storeName,
              isTrendingDeal: true,
              dealCode: dealTitle,
              storeCategory: storeCategory.toString(),
              storeCategoryList: storeCategory,
            },
          },
        },
        To.Background,
        false
      );
    }
  });
};

export const onClickStoreDeal = (
  storeName: string,
  storeCategory: string[],
  dealTitle: string
) => {
  chrome.storage.local.get([Generic.UserInfo], function (result) {
    if (Object.keys(result).length && result[Generic.UserInfo]) {
      PopupBroker.dispatch(
        Generic.PostSegment,
        {
          url: Segment.TRACK_API,
          info: {
            userId: result[Generic.UserInfo].userId,
            event: Segment.DEAL_CLICKED_EVENT,
            properties: {
              store: storeName,
              dealCode: dealTitle,
              storeCategory: storeCategory.toString(),
              storeCategoryList: storeCategory,
            },
          },
        },
        To.Background,
        false
      );
    }
  });
};

export const onSearched = (query: string) => {
  chrome.storage.local.get([Generic.UserInfo], function (result) {
    if (Object.keys(result).length && result[Generic.UserInfo]) {
      PopupBroker.dispatch(
        Generic.PostSegment,
        {
          url: Segment.TRACK_API,
          info: {
            userId: result[Generic.UserInfo].userId,
            event: Segment.SEARCHED_EVENT,
            properties: { searchQuery: query },
          },
        },
        To.Background,
        false
      );
    }
  });
};
