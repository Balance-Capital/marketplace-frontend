import { TopBar } from '../../components/TopBar/TopBar';
import {
  EmailForm,
  EmailFormElements,
} from '../../components/EmailForm/EmailForm';
import styles from './index.module.css';
import { FormEvent, useState } from 'react';

export default function CreateAcc() {
  const [err, setErr] = useState('');

  const onSubmit = (e: FormEvent<EmailFormElements>) => {
    e.preventDefault();
  };
  
  return (
    <div className={styles['container']}>
      <TopBar isBack={true} hexColor="#000" bgColor="bg-white-100" />
      <EmailForm
        errTxt={err}
        onSubmit={onSubmit}
        titleTxt={chrome.i18n.getMessage('createA')}
        btnTxt={'Create account'}
      />
    </div>
  );
}
