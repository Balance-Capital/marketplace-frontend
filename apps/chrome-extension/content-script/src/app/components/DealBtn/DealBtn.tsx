export default function DealBtn({ redirectUrl }: { redirectUrl: string }) {
  return (
    <a
      href={redirectUrl}
      target="_blank"
      rel="noreferrer"
      className="w-24 h-8 flex items-center justify-center font-PPNeueMachina text-xs text-white-0 bg-black rounded-full"
    >
      {chrome.i18n.getMessage('homePageBtnTitle')}
    </a>
  );
}
