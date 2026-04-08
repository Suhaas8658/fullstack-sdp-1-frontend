import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import FarmerDashboard from './components/FarmerDashboard';
import BuyerDashboard from './components/BuyerDashboard';
import AdminDashboard from './components/AdminDashboard';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard');

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('dashboard');
  };

  const showCart = () => setCurrentView('cart');
  const showDashboard = () => setCurrentView('dashboard');

  return (
    <>
      {!currentUser ? (
        <div className="auth-page">
          <div className="auth-split">
            <div className="auth-visual" aria-hidden="true" />
            <aside className="auth-panel">
              <div className="auth-form-shell">
                <LoginForm onAuthenticated={setCurrentUser} />
              </div>
            </aside>
          </div>
        </div>
      ) : (
        <div className="app-shell">
          <Navbar currentUser={currentUser} onLogout={handleLogout} onShowCart={showCart} isCartActive={currentView === 'cart'} />
          <main className="app-main">
            <div className="app-container">
              {currentUser.role === 'FARMER' ? (
                <FarmerDashboard farmer={currentUser} view={currentView} onBack={showDashboard} />
              ) : currentUser.role === 'BUYER' ? (
                <BuyerDashboard buyer={currentUser} view={currentView} onBack={showDashboard} />
              ) : (
                <AdminDashboard />
              )}
            </div>
          </main>
        </div>
      )}
    </>
  );
};
export default App;
