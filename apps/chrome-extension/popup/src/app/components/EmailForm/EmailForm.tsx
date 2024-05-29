import { FormEvent, useState } from 'react';
import { environment } from '../../../environments/environment';
import styles from './index.module.css';

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
}
export interface EmailFormElements extends HTMLFormElement {
  readonly elements: FormElements;
}

export function EmailForm({
  titleTxt,
  btnTxt,
  errTxt,
  onSubmit,
}: {
  titleTxt: string;
  btnTxt: string;
  errTxt: string;
  onSubmit: (e: FormEvent<EmailFormElements>) => void;
}) {
  const [inputType, setInputType] = useState('password');

  const toggleInputType = () => {
    inputType === 'password' ? setInputType('text') : setInputType('password');
  };

  return (
    <div className={styles['container']}>
      <div className={styles['title']}>
        <h2>{titleTxt}</h2>
      </div>
      <form
        onSubmit={(e: FormEvent<EmailFormElements>) => onSubmit(e)}
        className={styles['form']}
      >
        <label>
          <input
            placeholder="Enter email"
            type="email"
            name="email"
            id="email"
          />
        </label>
        <label>
          <input
            placeholder="Enter password"
            type={inputType}
            name="password"
            id="password"
          />
          <span onClick={() => toggleInputType()}>
            {inputType === 'password' ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23.347"
                height="18.597"
                viewBox="0 0 23.347 18.597"
              >
                <g
                  id="_9041858_eye_no_icon_1_"
                  name="9041858_eye_no_icon (1)"
                  transform="translate(0.5 0.707)"
                >
                  <path
                    id="Path_4078"
                    name="Path 4078"
                    d="M5.536,2.655A19.253,19.253,0,0,0,0,8.23q5,7.23,11.174,7.23a10.511,10.511,0,0,0,5.371-1.495m2.087-1.5A22.152,22.152,0,0,0,22.347,8.23Q17.345,1,11.174,1a10.2,10.2,0,0,0-3.193.509"
                    transform="translate(0 0.315)"
                    fill="none"
                    stroke="#000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    fillRule="evenodd"
                  />
                  <line
                    id="Line_393"
                    name="Line 393"
                    x2="17.089"
                    y2="17.182"
                    transform="translate(2.629)"
                    fill="none"
                    stroke="#000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                  />
                </g>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23.697"
                height="15.686"
                viewBox="0 0 23.697 15.686"
              >
                <g
                  id="_9041858_eye_no_icon_1_"
                  name="9041858_eye_no_icon (1)"
                  transform="translate(0.5 0.5)"
                >
                  <g id="_9041806_eye_icon_1_" name="9041806_eye_icon (1)">
                    <path
                      id="Path_4088"
                      name="Path 4088"
                      d="M11.348,14.686q6.268,0,11.348-7.343Q17.616,0,11.348,0T0,7.343Q5.081,14.686,11.348,14.686Z"
                      fill="none"
                      stroke="#000"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      fillRule="evenodd"
                    />
                    <path
                      id="Path_4089"
                      name="Path 4089"
                      d="M9.673,2a4.708,4.708,0,0,1,.725.056,3.248,3.248,0,0,0-.057.612A3.341,3.341,0,0,0,14.289,5.95a4.59,4.59,0,0,1,.057.723A4.673,4.673,0,1,1,9.673,2Z"
                      transform="translate(1.676 0.67)"
                      fill="none"
                      stroke="#000"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      fillRule="evenodd"
                    />
                  </g>
                </g>
              </svg>
            )}
          </span>
        </label>
        {errTxt && <span className='mx-auto font-PPNeueMachina text-sm text-colorRed'>{errTxt}</span>}
        <a className='text-sm ml-auto underline' href={environment.FORGOT_PASSWORD_URL} target="_blank" rel="noreferrer">
          Forgot password?
        </a>
        <input type="submit" className={styles['submitBtn']} value={btnTxt} />
      </form>
    </div>
  );
}
