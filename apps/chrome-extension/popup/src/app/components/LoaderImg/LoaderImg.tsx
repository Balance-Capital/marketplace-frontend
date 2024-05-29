export default function LoaderImg() {
  return (
    <img
      className="w-20 h-20"
      src={chrome.runtime.getURL('assets/gif/logo-loader.gif')}
      alt="loading"
    />
  );
}
