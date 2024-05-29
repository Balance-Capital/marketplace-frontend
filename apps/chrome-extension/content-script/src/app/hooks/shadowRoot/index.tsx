export default function shadowRoot(): ShadowRoot {
  const container = document.createElement(
    `${chrome.i18n.getMessage('extName')}-extension`
  );
  document.getElementsByTagName('html')[0].appendChild(container);
  (
    document.querySelector(
      `${chrome.i18n.getMessage('extName')}-extension`
    ) as HTMLDivElement
  ).attachShadow({
    mode: 'open',
  });

  return (
    document.querySelector(
      `${chrome.i18n.getMessage('extName')}-extension`
    ) as HTMLDivElement
  ).shadowRoot as ShadowRoot;
}
