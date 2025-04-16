import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './common/ctx/authContext';
import PrivateRoute from './common/routes/privateRoutes';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import { PreferenceProvider } from './common/ctx/preferenceContext';
import SettingsPage from './pages/SettingPage';

function App() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors">
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
              <Route path="/settings" element={
                <PrivateRoute>
                  <SettingsPage />
                </PrivateRoute>
              } />
            </Routes>
          </PreferenceProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
