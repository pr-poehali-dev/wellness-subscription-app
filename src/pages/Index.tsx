import { useState } from 'react';
import Onboarding from '@/components/Onboarding';
import Home from '@/components/Home';
import WorkoutCatalog from '@/components/WorkoutCatalog';

type Screen = 'onboarding' | 'home' | 'catalog';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [userData, setUserData] = useState<any>(null);

  const handleOnboardingComplete = (data: any) => {
    setUserData(data);
    setCurrentScreen('home');
  };

  return (
    <div className="min-h-screen bg-background">
      {currentScreen === 'onboarding' && (
        <Onboarding onComplete={handleOnboardingComplete} />
      )}
      {currentScreen === 'home' && (
        <Home userData={userData} onNavigate={setCurrentScreen} />
      )}
      {currentScreen === 'catalog' && (
        <WorkoutCatalog onNavigate={setCurrentScreen} />
      )}
    </div>
  );
};

export default Index;