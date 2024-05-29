import { createContext, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Navbar from '../Navbar';
import Footer from '../Footer';
import CloseBtn from '../Toast/CloseBtn';

export const UserAvatarImageContext = createContext({
  setUserAvatarImage: (_userAvatarImage: string): void => undefined,
  userAvatarImage: null
});

export const UserBalanceContext = createContext({
  setUserBalance: (_userBalance: number): void => undefined,
  userBalance: 0
});

export const NavbarFooterContext = createContext({
  setIsNavbar: (_isNavbar: boolean): void => undefined,
  setIsFooter: (_isFooter: boolean): void => undefined,
});

export default function Layout({ children }) {
  const [isNavbar, setIsNavbar] = useState(true);
  const [isFooter, setIsFooter] = useState(true);
  const [userBalance, setUserBalance] = useState(0);
  const [userAvatarImage, setUserAvatarImage] = useState(null);
  return (
    <>
      <NavbarFooterContext.Provider value={{ setIsNavbar, setIsFooter }}>
        <UserBalanceContext.Provider value={{ userBalance, setUserBalance }}>
          <UserAvatarImageContext.Provider value={{ userAvatarImage, setUserAvatarImage }}>
            <ToastContainer
              bodyClassName={() => 'pl-2 flex [&>div]:first-letter:uppercase'}
              className="bottom-0 left-2 pr-4"
              autoClose={10000}
              closeButton={CloseBtn}
              closeOnClick={false}
              pauseOnHover={false}
            />
            {isNavbar && <Navbar />}
            <main>{children}</main>
            {isFooter && <Footer />}
          </UserAvatarImageContext.Provider>
        </UserBalanceContext.Provider>
      </NavbarFooterContext.Provider>
    </>
  );
}
