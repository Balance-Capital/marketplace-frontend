import {
  Generic,
  PopupBroker,
  To,
} from '@monorepo/chrome-extension/msg-bridge';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { lastLocation } from '../recoil';
import { useAuth } from './auth';

export default function Location() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setToken } = useAuth();
  const [loc, setLocation] = useRecoilState(lastLocation);

  useEffect(() => {
    setLocation(location);
  }, [location]);

  useEffect(() => {
    chrome.storage.local.get([Generic.GetAuthToken], function (result) {
      if (Object.keys(result).length && result[Generic.GetAuthToken]) {
        setToken(result[Generic.GetAuthToken]);
        PopupBroker.dispatch(Generic.CheckStore, {}, To.Content, true)
          ?.then((response) => {
            if (response.domainName) {
              navigate(`/store/${response.domainName}`);
            } else {
              navigate(loc.pathname);
            }
          })
          .catch(() => {
            navigate(loc.pathname);
          });
      } else {
        setToken('');
        navigate('/join');
      }
    });
  }, []);

  useEffect(() => {
    chrome.storage.onChanged.addListener(function (changes) {
      if (Object.keys(changes).length) {
        if (changes[Generic.GetAuthToken]?.newValue) {
          setToken(changes[Generic.GetAuthToken]?.newValue);
          navigate('/');
        } else if (changes[Generic.GetAuthToken]?.newValue === null) {
          setToken('');
          navigate('/join');
        }
      }
    });
  }, []);

  return <></>;
}
