
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, HelpCircle } from 'lucide-react';
import { 
  INITIAL_QUESTIONS, 
  INITIAL_PERSONALITY_TRAITS, 
  Question, 
  PersonalityTraits 
} from '@/utils/quizData';
import { 
  calculatePersonalityTraits, 
  getDominantTrait 
} from '@/utils/personalityCalculator';
import { QuizProgress } from './QuizProgress';
import { QuizQuestion } from './QuizQuestion';
import HomeNavigation from '../HomeNavigation';

interface PersonalityQuizProps {
  onComplete: (results: PersonalityTraits, dominantTrait: string) => void;
  userName: string;
}

const PersonalityQuiz: React.FC<PersonalityQuizProps> = ({ 
  onComplete, 
  userName 
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions] = useState<Question[]>(INITIAL_QUESTIONS);
  const [personalityTraits, setPersonalityTraits] = useState<PersonalityTraits>(INITIAL_PERSONALITY_TRAITS);
  const [answers, setAnswers] = useState<number[]>([]);
  const [fadeIn, setFadeIn] = useState(true);
  const [showHint, setShowHint] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionSelect = (optionIndex: number) => {
    setFadeIn(false);
    
    const newTraits = calculatePersonalityTraits(personalityTraits, currentQuestion, optionIndex);
    
    setPersonalityTraits(newTraits);
    
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setAnswers(newAnswers);
    
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        setFadeIn(true);
      } else {
        const dominantTrait = getDominantTrait(newTraits);
        onComplete(newTraits, dominantTrait);
      }
    }, 300);
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setFadeIn(false);
      
      setTimeout(() => {
        const prevAnswer = answers[currentQuestionIndex - 1];
        if (prevAnswer !== undefined) {
          const prevOption = questions[currentQuestionIndex - 1].options[prevAnswer];
          const revertedTraits = { ...personalityTraits };
          
          Object.entries(prevOption.value).forEach(([trait, value]) => {
            revertedTraits[trait as keyof PersonalityTraits] -= value || 0;
          });
          
          setPersonalityTraits(revertedTraits);
        }
        
        setCurrentQuestionIndex(prevIndex => prevIndex - 1);
        setFadeIn(true);
      }, 300);
    }
  };

  const toggleHint = () => {
    setShowHint(!showHint);
    if (!showHint) {
      toast.info("Answer honestly for the most accurate results!");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <HomeNavigation 
        onBack={() => {
          if (window.confirm("Are you sure you want to exit the quiz? Your progress will be lost.")) {
            window.location.href = "/";
          }
        }} 
      />
      
      <h2 className="text-2xl font-bold text-center mb-2">Discovering Your True Self</h2>
      <p className="text-center text-muted-foreground">
        Hi {userName}! Answer these questions to uncover your personality traits.
      </p>
      
      <QuizProgress 
        currentQuestionIndex={currentQuestionIndex} 
        totalQuestions={questions.length} 
      />
      
      <QuizQuestion
        question={currentQuestion}
        onOptionSelect={handleOptionSelect}
        fadeIn={fadeIn}
        showHint={showHint}
        onToggleHint={toggleHint}
      />
      
      <div className="flex justify-between mt-6">
        <Button
          variant="ghost"
          onClick={handlePrevQuestion}
          disabled={currentQuestionIndex === 0}
          className="flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        
        <Button
          variant="ghost"
          onClick={() => {
            toast.info("Please select one of the options to continue.");
          }}
          className="flex items-center opacity-70"
        >
          Skip <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default PersonalityQuiz;
