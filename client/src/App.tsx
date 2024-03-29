import { Navigate, Route, Routes } from 'react-router-dom';

import { ROUTES } from './constants';
import Layout from './layouts/Layout';
import ProtectedRoute from './components/ProtectedRoute';

import Feed from './pages/feed';
import SignIn from './pages/sign-in';
import Dashboard from './pages/dashboard';

export default function App() {
  return (
    <Routes>
      <Route path={ROUTES.ROOT} element={<Layout />}>
        <Route path={ROUTES.ROOT} element={<Navigate to={ROUTES.FEED} />} />
        <Route path={ROUTES.FEED} element={<Feed />} />
        <Route path={ROUTES.SIGNIN} element={<SignIn />} />
        <Route
          path={ROUTES.DASHBOARD}
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}
