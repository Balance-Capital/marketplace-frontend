import { MemoryRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '../pages/home/Home';
import { Search } from '../pages/search/Search';
import { NetworkIssue } from '../pages/network-issue/NetworkIssue';
import { Profile } from '../pages/profile/Profile';
import { Store } from '../pages/store/Store';
import Location from './Location';
import Join from '../pages/join/Join';
import useNetworkStatus from '../hooks/useNetworkStatus';
import Login from '../pages/login/Login';
import CreateAcc from '../pages/create-acc/CreateAcc';
import Settings from '../pages/profile/pages/Settings/Settings';
import UserProfile from '../pages/profile/pages/UserProfile/UserProfile';
import Rewards from '../pages/profile/pages/Rewards/Rewards';
import Referrals from '../pages/profile/pages/Referrals/Referrals';
import Stores from '../pages/stores/Stores';
import { AuthProvider, useAuth } from './auth';
import { ReactNode } from 'react';

const PrivateRoutes = ({ children }: { children: ReactNode }) => {
  const { token } = useAuth();
  return token ? <>{children}</> : <Navigate to="/join" replace />;
};

const PublicRoutes = ({ children }: { children: ReactNode }) => {
  const { token } = useAuth();
  return token ? <Navigate to="/" replace /> : <>{children}</>;
};

export default function MainRoutes() {
  const { isOnline } = useNetworkStatus();

  return (
    <div>
      {isOnline ? (
        <AuthProvider>
          <MemoryRouter>
            <Location />
            <Routes>
              <Route
                path=""
                element={
                  <PrivateRoutes>
                    <Home />
                  </PrivateRoutes>
                }
              />
              <Route
                path="search"
                element={
                  <PrivateRoutes>
                    <Search />
                  </PrivateRoutes>
                }
              />
              <Route
                path="profile"
                element={
                  <PrivateRoutes>
                    <Profile />
                  </PrivateRoutes>
                }
              >
                <Route path="" element={<Settings />} />
                <Route path="user-profile" element={<UserProfile />} />
                <Route path="rewards" element={<Rewards />} />
                <Route path="referrals" element={<Referrals />} />
              </Route>
              <Route
                path="store/:domain"
                element={
                  <PrivateRoutes>
                    <Store />
                  </PrivateRoutes>
                }
              />
              <Route
                path="stores"
                element={
                  <PrivateRoutes>
                    <Stores />
                  </PrivateRoutes>
                }
              />
              <Route
                path="/join"
                element={
                  <PublicRoutes>
                    <Join />
                  </PublicRoutes>
                }
              />
              <Route
                path="/login"
                element={
                  <PublicRoutes>
                    <Login />
                  </PublicRoutes>
                }
              />
              <Route
                path="/create-acc"
                element={
                  <PublicRoutes>
                    <CreateAcc />
                  </PublicRoutes>
                }
              />
            </Routes>
          </MemoryRouter>
        </AuthProvider>
      ) : (
        <NetworkIssue />
      )}
    </div>
  );
}
