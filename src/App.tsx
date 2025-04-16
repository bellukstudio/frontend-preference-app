import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './common/ctx/authContext';
import PrivateRoute from './common/routes/privateRoutes';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import { PreferenceProvider } from './common/ctx/preferenceContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PreferenceProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            } />
          </Routes>
        </PreferenceProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
