import { Switch, BrowserRouter } from 'react-router-dom';
import 'rsuite/dist/styles/rsuite-default.css';
import './styles/main.scss';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import PublicRoute from './components/PublicRoute';
import { ProfileProvider } from './context/profile.context';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Suspense, lazy } from 'react';

const SignIn = lazy(() => import('./pages/SignIn'));

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ProfileProvider>
          <Switch>
            <PublicRoute path="/signin">
              <Suspense fallback={<div>Loading...</div>}>
                <SignIn />
              </Suspense>
            </PublicRoute>
            <PrivateRoute path="/">
              <Home />
            </PrivateRoute>
          </Switch>
        </ProfileProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
