import { Switch, BrowserRouter } from 'react-router-dom';
import 'rsuite/dist/styles/rsuite-default.css';
import './styles/main.scss';
import PrivateRoute from './components/PrivateRoute';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import PublicRoute from './components/PublicRoute';
import { ProfileProvider } from './context/profile.context';
import { ErrorBoundary } from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ProfileProvider>
          <Switch>
            <PublicRoute path="/signin">
              <SignIn />
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
