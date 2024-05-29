import { TopBar } from '../../components/TopBar/TopBar';
import {
  EmailForm,
  EmailFormElements,
} from '../../components/EmailForm/EmailForm';
import styles from './index.module.css';
import { FormEvent, useState } from 'react';
import {
  Generic,
  ISettings,
  PopupBroker,
  Segment,
  To,
} from '@monorepo/chrome-extension/msg-bridge';

export default function Login() {
  const [err, setErr] = useState('');

  const onSubmit = (e: FormEvent<EmailFormElements>) => {
    e.preventDefault();
    const { email, password } = e.currentTarget.elements;
    if (email.value !== '' && password.value !== '') {
      PopupBroker.dispatch(
        Generic.PostLogin,
        { username: email.value, password: password.value },
        To.Background,
        true
      )
        ?.then(({ token }: { token: string }) => {
          chrome.storage.local.set({ [Generic.GetAuthToken]: token });
          PopupBroker.dispatch(Generic.GetSettings, null, To.Background, true)
            ?.then((response: ISettings) => {
              PopupBroker.dispatch(
                Generic.PostSegment,
                {
                  url: Segment.IDENTIFY_API,
                  info: {
                    userId: response.userId,
                    traits: {
                      name: `${response.firstName} ${response.lastName ? response.lastName : ''
                        }`,
                      email: response.email,
                    },
                  },
                },
                To.Background,
                false
              );
              PopupBroker.dispatch(
                Generic.PostSegment,
                {
                  url: Segment.TRACK_API,
                  info: {
                    userId: response.userId,
                    event: Segment.LOGGED_IN_EVENT,
                  },
                },
                To.Background,
                false
              );
              chrome.storage.local.set({ [Generic.UserInfo]: response });
            });
        })
        .catch(({ msg }: { msg: string }) => {
          setErr(msg);
        });
    }
  };

  return (
    <div className={styles['container']}>
      <TopBar isBack={true} hexColor="#000" bgColor="bg-white-100" />
      <EmailForm
        errTxt={err}
        onSubmit={onSubmit}
        titleTxt={`${chrome.i18n.getMessage('loginWith')} Email`}
        btnTxt={'Log in'}
      />
    </div>
  );
}
