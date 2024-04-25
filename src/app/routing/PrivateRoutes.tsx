import { lazy, FC, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { MasterLayout } from '../../_metronic/layout/MasterLayout';
import TopBarProgress from 'react-topbar-progress-indicator';
import HomePage from '../pages/home/HomePage';
import { MenuTestPage } from '../pages/MenuTestPage';
import { getCSSVariableValue } from '../../_metronic/assets/ts/_utils';
import { WithChildren } from '../../_metronic/helpers';
import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper';
import FacebookAds from '../pages/facebook-ads/FacebookAds';
import { FacebookCallback } from '../pages/facebook-ads/components';
import FacebookAdAccount from '../pages/facebook-ads/FacebookAdAccount';
import Reports from '../pages/reports/Reports';
import { useAuth } from '../modules/auth';

const PrivateRoutes = () => {
  const { isSubscriptionActive, currentUser } = useAuth();
  const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'));
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'));
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'));
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'));
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'));
  const UsersPage = lazy(
    () => import('../modules/apps/user-management/UsersPage')
  );

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Home after success login/registartion */}
        <Route
          path="auth/*"
          element={
            isSubscriptionActive ? (
              <Navigate to="/home" />
            ) : (
              <Navigate to="/pricing" />
            )
          }
        />
        {/* Pages */}
        <Route
          path="home"
          element={
            isSubscriptionActive ? <HomePage /> : <Navigate to="/pricing" />
          }
        />
        <Route
          path="facebook-ads"
          element={
            isSubscriptionActive ? <FacebookAds /> : <Navigate to="/pricing" />
          }
        />
        <Route
          path="/facebook-ads/:facebookId"
          element={
            isSubscriptionActive ? (
              <FacebookAdAccount />
            ) : (
              <Navigate to="/pricing" />
            )
          }
        />
        <Route
          path="callback/facebook-callback"
          element={<FacebookCallback />}
        />
        <Route
          path="reports/:reportId"
          element={
            isSubscriptionActive ? <Reports /> : <Navigate to="/pricing" />
          }
        />
        <Route path="builder" element={<BuilderPageWrapper />} />
        <Route path="menu-test" element={<MenuTestPage />} />
        {/* Lazy Modules */}
        <Route
          path="crafted/pages/profile/*"
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        />
        <Route
          path="crafted/pages/wizards/*"
          element={
            <SuspensedView>
              <WizardsPage />
            </SuspensedView>
          }
        />
        <Route
          path="crafted/widgets/*"
          element={
            <SuspensedView>
              <WidgetsPage />
            </SuspensedView>
          }
        />
        <Route
          path="crafted/account/*"
          element={
            <SuspensedView>
              <AccountPage />
            </SuspensedView>
          }
        />
        <Route
          path="apps/chat/*"
          element={
            <SuspensedView>
              <ChatPage />
            </SuspensedView>
          }
        />
        <Route
          path="apps/user-management/*"
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        />
        {/* Page Not Found */}
        <Route path="*" element={<Navigate to="/error/404" />} />
      </Route>
    </Routes>
  );
};

const SuspensedView: FC<WithChildren> = ({ children }) => {
  const baseColor = getCSSVariableValue('--bs-primary');
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  });
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
};

export { PrivateRoutes };
