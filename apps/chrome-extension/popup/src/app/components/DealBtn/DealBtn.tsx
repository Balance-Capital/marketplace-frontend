import styles from './index.module.css';

export default function DealBtn({ redirectUrl }: { redirectUrl: string }) {
  return (
    <a
      href={redirectUrl}
      target="_blank"
      rel="noreferrer"
      className={styles['btn']}
    >
      {chrome.i18n.getMessage('homePageBtnTitle')}
    </a>
  );
}
