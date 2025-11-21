import { useState, useEffect } from 'react';
import { Onboarding } from './components/Onboarding';
import { Auth } from './components/Auth';
import { HomePage } from './components/HomePage';
import { SurplusListing } from './components/SurplusListing';
import { SmartKitchen } from './components/SmartKitchen';
import { Gamification } from './components/Gamification';
import { FlowNetwork } from './components/FlowNetwork';
import { BioTransformation } from './components/BioTransformation';
import { UserProfile } from './components/UserProfile';
import { BusinessListing } from './components/BusinessListing';
import { NGODonation } from './components/NGODonation';
import { CommunityHub } from './components/CommunityHub';
import { AdminPanel } from './components/AdminPanel';
import { NotificationCenter } from './components/NotificationCenter';
import { Buyers } from './components/Buyers';
import { Farmers } from './components/Farmers';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'onboarding' | 'auth' | 'home' | 'surplus' | 'kitchen' | 'gamification' | 'network' | 'bio' | 'profile' | 'business' | 'ngo' | 'hub' | 'admin' | 'notifications' | 'buyers' | 'farmers'>('onboarding');
  const [user, setUser] = useState<any>(null);

  const handleOnboardingComplete = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    setCurrentScreen('auth');
  };

  const handleLogin = (userData: any) => {
    setUser(userData);
    setCurrentScreen('home');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen('auth');
  };

  const navigateTo = (screen: any) => {
    setCurrentScreen(screen);
  };

  return (
    <div className="min-h-screen bg-background">
      {currentScreen === 'onboarding' && (
        <Onboarding onComplete={handleOnboardingComplete} />
      )}
      
      {currentScreen === 'auth' && (
        <Auth onLogin={handleLogin} />
      )}
      
      {currentScreen === 'home' && user && (
        <HomePage user={user} onNavigate={navigateTo} onLogout={handleLogout} />
      )}
      
      {currentScreen === 'surplus' && user && (
        <SurplusListing user={user} onBack={() => setCurrentScreen('home')} />
      )}
      
      {currentScreen === 'kitchen' && user && (
        <SmartKitchen user={user} onBack={() => setCurrentScreen('home')} />
      )}
      
      {currentScreen === 'gamification' && user && (
        <Gamification user={user} onBack={() => setCurrentScreen('home')} />
      )}
      
      {currentScreen === 'network' && user && (
        <FlowNetwork user={user} onBack={() => setCurrentScreen('home')} />
      )}
      
      {currentScreen === 'bio' && user && (
        <BioTransformation user={user} onBack={() => setCurrentScreen('home')} />
      )}
      
      {currentScreen === 'profile' && user && (
        <UserProfile user={user} onBack={() => setCurrentScreen('home')} onLogout={handleLogout} />
      )}
      
      {currentScreen === 'business' && user && (
        <BusinessListing user={user} onBack={() => setCurrentScreen('home')} />
      )}
      
      {currentScreen === 'ngo' && user && (
        <NGODonation user={user} onBack={() => setCurrentScreen('home')} />
      )}
      
      {currentScreen === 'hub' && user && (
        <CommunityHub user={user} onBack={() => setCurrentScreen('home')} />
      )}
      
      {currentScreen === 'admin' && user && (
        <AdminPanel user={user} onBack={() => setCurrentScreen('home')} />
      )}
      
      {currentScreen === 'notifications' && user && (
        <NotificationCenter user={user} onBack={() => setCurrentScreen('home')} />
      )}
      
      {currentScreen === 'buyers' && user && (
        <Buyers user={user} onBack={() => setCurrentScreen('home')} />
      )}
      
      {currentScreen === 'farmers' && user && (
        <Farmers user={user} onBack={() => setCurrentScreen('home')} />
      )}
    </div>
  );
}