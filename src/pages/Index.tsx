
import React, { useState, useEffect } from 'react';
import SignInForm from '@/components/SignInForm';
import PersonalityQuiz from '@/components/PersonalityQuiz';
import PersonalityResults from '@/components/PersonalityResults';
import SubscriptionPlans from '@/components/SubscriptionPlans';
import AIChat from '@/components/AIChat';
import { Sparkles, Brain } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

// Define the possible app states
type AppState = 'signin' | 'quiz' | 'results' | 'subscriptions' | 'chat';

// Define user data structure
interface UserData {
  name: string;
  email: string;
  age?: number;
  gender?: string;
}

// Define personality traits structure
interface PersonalityTraits {
  logical: number;
  creative: number;
  social: number;
  emotional: number;
  leader: number;
  analytical: number;
  introvert: number;
  extrovert: number;
}

const Index = () => {
  const [appState, setAppState] = useState<AppState>('signin');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [personalityTraits, setPersonalityTraits] = useState<PersonalityTraits | null>(null);
  const [dominantTrait, setDominantTrait] = useState<string>('');
  
  // If we have userData stored in localStorage, retrieve it
  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
      
      // Check if we have any other stored data
      const storedTraits = localStorage.getItem('personalityTraits');
      const storedDominantTrait = localStorage.getItem('dominantTrait');
      
      if (storedTraits) {
        setPersonalityTraits(JSON.parse(storedTraits));
      }
      
      if (storedDominantTrait) {
        setDominantTrait(storedDominantTrait);
        setAppState('quiz'); // Default to quiz when returning home
      }
    }
  }, []);

  const handleSignIn = (data: UserData) => {
    setUserData(data);
    // Store user data in localStorage
    localStorage.setItem('userData', JSON.stringify(data));
    setAppState('quiz');
  };

  const handleQuizCompletion = (results: PersonalityTraits, dominant: string) => {
    setPersonalityTraits(results);
    setDominantTrait(dominant);
    // Store results in localStorage
    localStorage.setItem('personalityTraits', JSON.stringify(results));
    localStorage.setItem('dominantTrait', dominant);
    setAppState('results');
  };

  const handleViewSubscriptions = () => {
    setAppState('subscriptions');
  };

  const handleStartChat = () => {
    setAppState('chat');
  };

  const handleReturnToResults = () => {
    setAppState('results');
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* Header */}
      <header className="w-full bg-background p-4 border-b">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Brain className="h-8 w-8 text-primary mr-2" />
            <h1 className="text-xl font-bold">InsightfulYou</h1>
          </div>
          
          {userData && (
            <div className="text-sm text-muted-foreground">
              Welcome, {userData.name}
            </div>
          )}
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8 flex flex-col items-center justify-center">
        {appState === 'signin' && (
          <div className="w-full max-w-4xl flex flex-col items-center justify-center py-10">
            <div className="mb-10 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Sparkles className="h-10 w-10 text-primary" />
                </div>
              </div>
              <h1 className="text-4xl font-bold mb-4">Discover Your True Self</h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Uncover your unique personality traits and receive personalized guidance for personal growth with our advanced personality assessment.
              </p>
            </div>
            
            <SignInForm onSignIn={handleSignIn} />
          </div>
        )}
        
        {appState === 'quiz' && userData && (
          <div className="w-full py-6">
            <PersonalityQuiz 
              onComplete={handleQuizCompletion} 
              userName={userData.name} 
            />
          </div>
        )}
        
        {appState === 'results' && userData && personalityTraits && (
          <div className="w-full py-6">
            <PersonalityResults 
              personalityTraits={personalityTraits}
              dominantTrait={dominantTrait}
              userName={userData.name}
              onViewSubscriptions={handleViewSubscriptions}
              onStartChat={handleStartChat}
            />
          </div>
        )}
        
        {appState === 'subscriptions' && (
          <div className="w-full py-6">
            <SubscriptionPlans onReturn={handleReturnToResults} />
          </div>
        )}
        
        {appState === 'chat' && userData && (
          <div className="w-full py-4">
            <AIChat 
              userName={userData.name}
              dominantTrait={dominantTrait}
              onReturn={handleReturnToResults}
            />
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="w-full bg-background p-4 border-t">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} InsightfulYou. All rights reserved.</p>
          <p className="mt-1">Your personality insights journey, powered by advanced AI</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
