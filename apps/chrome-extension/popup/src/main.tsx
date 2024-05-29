import * as ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import MainRoutes from './app/routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import CloseBtn from './app/components/Toast/CloseBtn';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <RecoilRoot>
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        closeOnClick={false}
        pauseOnHover={false}
        closeButton={CloseBtn}
        theme="colored"
      />
      <MainRoutes />
  </RecoilRoot>
);
