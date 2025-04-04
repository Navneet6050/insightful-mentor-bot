
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, ArrowLeft, HelpCircle } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    value: {
      logical?: number;
      creative?: number;
      social?: number;
      emotional?: number;
      leader?: number;
      analytical?: number;
      introvert?: number;
      extrovert?: number;
    };
  }[];
}

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

interface PersonalityQuizProps {
  onComplete: (results: PersonalityTraits, dominantTrait: string) => void;
  userName: string;
}

const INITIAL_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "How do you typically approach problem-solving?",
    options: [
      { text: "Analyze facts and data systematically", value: { logical: 2, analytical: 2, introvert: 1 } },
      { text: "Brainstorm multiple creative solutions", value: { creative: 2, extrovert: 1 } },
      { text: "Discuss with others to get perspectives", value: { social: 2, extrovert: 2 } },
      { text: "Trust my intuition and feelings", value: { emotional: 2, introvert: 1 } }
    ]
  },
  {
    id: 2,
    text: "In a group project, which role do you naturally take?",
    options: [
      { text: "The organizer who creates plans and timelines", value: { logical: 1, leader: 2, analytical: 1 } },
      { text: "The idea generator who comes up with concepts", value: { creative: 2 } },
      { text: "The mediator who ensures everyone is heard", value: { social: 2, emotional: 1 } },
      { text: "The presenter who communicates the results", value: { extrovert: 2, leader: 1 } }
    ]
  },
  {
    id: 3,
    text: "How do you recharge after a long day?",
    options: [
      { text: "Reading a book or learning something new", value: { introvert: 2, analytical: 1 } },
      { text: "Creating art or listening to music", value: { creative: 2, emotional: 1, introvert: 1 } },
      { text: "Spending time with friends or family", value: { social: 2, extrovert: 2 } },
      { text: "Organizing or planning future activities", value: { logical: 1, analytical: 2 } }
    ]
  },
  {
    id: 4,
    text: "When making important decisions, I mainly:",
    options: [
      { text: "List pros and cons logically", value: { logical: 2, analytical: 2 } },
      { text: "Consider how it impacts people around me", value: { social: 1, emotional: 2 } },
      { text: "Look for innovative solutions", value: { creative: 2 } },
      { text: "Take charge and make decisive choices", value: { leader: 2, extrovert: 1 } }
    ]
  },
  {
    id: 5,
    text: "In conversations, I tend to:",
    options: [
      { text: "Listen carefully and respond thoughtfully", value: { introvert: 2, emotional: 1 } },
      { text: "Lead the discussion and ask questions", value: { leader: 2, extrovert: 1 } },
      { text: "Share stories and connect with others", value: { social: 2, extrovert: 2 } },
      { text: "Analyze and question assumptions", value: { logical: 2, analytical: 1 } }
    ]
  },
  {
    id: 6,
    text: "Which environment helps you work best?",
    options: [
      { text: "Quiet, organized space where I can focus", value: { introvert: 2, analytical: 1, logical: 1 } },
      { text: "Creative, stimulating environment with freedom", value: { creative: 2 } },
      { text: "Collaborative setting with team interaction", value: { social: 2, extrovert: 1 } },
      { text: "Structured environment with clear objectives", value: { leader: 1, logical: 2 } }
    ]
  },
  {
    id: 7,
    text: "How do you handle unexpected challenges?",
    options: [
      { text: "Analyze the problem and develop a logical plan", value: { analytical: 2, logical: 1 } },
      { text: "Adapt quickly and find creative solutions", value: { creative: 2 } },
      { text: "Seek input from others to solve together", value: { social: 2, extrovert: 1 } },
      { text: "Take charge and direct the response", value: { leader: 2 } }
    ]
  },
  {
    id: 8,
    text: "When learning something new, I prefer to:",
    options: [
      { text: "Understand the underlying principles and logic", value: { logical: 2, analytical: 2 } },
      { text: "Explore and discover through experimentation", value: { creative: 2 } },
      { text: "Learn alongside others in a social setting", value: { social: 2, extrovert: 1 } },
      { text: "Connect it to personal values and feelings", value: { emotional: 2 } }
    ]
  },
  {
    id: 9,
    text: "In conflict situations, I typically:",
    options: [
      { text: "Analyze all perspectives objectively", value: { logical: 2, analytical: 1 } },
      { text: "Find innovative compromises", value: { creative: 2 } },
      { text: "Focus on preserving relationships", value: { social: 2, emotional: 1 } },
      { text: "Take control to resolve the situation", value: { leader: 2 } }
    ]
  },
  {
    id: 10,
    text: "What do you value most in your career or studies?",
    options: [
      { text: "Intellectual challenge and problem-solving", value: { logical: 2, analytical: 2 } },
      { text: "Creative expression and innovation", value: { creative: 2 } },
      { text: "Helping others and making a difference", value: { social: 2, emotional: 1 } },
      { text: "Achievement and recognition of my efforts", value: { leader: 1, extrovert: 1 } }
    ]
  }
];

const initialPersonalityTraits: PersonalityTraits = {
  logical: 0,
  creative: 0,
  social: 0,
  emotional: 0,
  leader: 0,
  analytical: 0,
  introvert: 0,
  extrovert: 0
};

const PersonalityQuiz: React.FC<PersonalityQuizProps> = ({ onComplete, userName }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<Question[]>(INITIAL_QUESTIONS);
  const [personalityTraits, setPersonalityTraits] = useState<PersonalityTraits>(initialPersonalityTraits);
  const [answers, setAnswers] = useState<number[]>([]);
  const [fadeIn, setFadeIn] = useState(true);
  const [showHint, setShowHint] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  useEffect(() => {
    // Simulating adaptive question logic based on previous answers
    if (currentQuestionIndex > 3 && answers.length >= 3) {
      // Here we could modify future questions based on answer patterns
      // This is a simplified example - in a real app, you'd have more complex logic
      
      const mostRecentAnswers = answers.slice(-3);
      const hasLogicalTendency = mostRecentAnswers.some(optionIndex => 
        questions[currentQuestionIndex - 3 + mostRecentAnswers.indexOf(optionIndex)]
          .options[optionIndex].value.logical);
      
      const hasCreativeTendency = mostRecentAnswers.some(optionIndex => 
        questions[currentQuestionIndex - 3 + mostRecentAnswers.indexOf(optionIndex)]
          .options[optionIndex].value.creative);
      
      // Could adjust future questions based on these tendencies
      // This would be more sophisticated in a production app
    }
  }, [currentQuestionIndex, answers, questions]);

  const handleOptionSelect = (optionIndex: number) => {
    setFadeIn(false);
    
    // Update personality traits based on selected option
    const selectedOption = currentQuestion.options[optionIndex];
    const newTraits = { ...personalityTraits };
    
    Object.entries(selectedOption.value).forEach(([trait, value]) => {
      newTraits[trait as keyof PersonalityTraits] += value || 0;
    });
    
    setPersonalityTraits(newTraits);
    
    // Record the answer
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setAnswers(newAnswers);
    
    // Move to next question with a slight delay for animation
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        setFadeIn(true);
      } else {
        // Quiz completed
        const dominantTrait = getDominantTrait(newTraits);
        onComplete(newTraits, dominantTrait);
      }
    }, 300);
  };

  const getDominantTrait = (traits: PersonalityTraits): string => {
    let maxTrait = "logical";
    let maxValue = traits.logical;
    
    Object.entries(traits).forEach(([trait, value]) => {
      if (value > maxValue) {
        maxTrait = trait;
        maxValue = value;
      }
    });
    
    return maxTrait;
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setFadeIn(false);
      
      setTimeout(() => {
        // Revert personality traits based on previous answer
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
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-center mb-2">Discovering Your True Self</h2>
        <p className="text-center text-muted-foreground">
          Hi {userName}! Answer these questions to uncover your personality traits.
        </p>
        <div className="mt-4">
          <Progress value={progress} className="h-2 bg-gray-200" />
          <div className="flex justify-between mt-1">
            <span className="text-sm text-muted-foreground">Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
          </div>
        </div>
      </div>
      
      <Card className={cn(
        "quiz-card shadow-card transition-opacity duration-300", 
        fadeIn ? "opacity-100" : "opacity-0"
      )}>
        <CardContent className="pt-6">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-xl font-semibold">{currentQuestion.text}</h3>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleHint}
              className="text-muted-foreground hover:text-foreground"
            >
              <HelpCircle size={20} />
            </Button>
          </div>
          
          {showHint && (
            <div className="bg-muted p-3 rounded-md mb-4 text-sm animate-fade-in">
              Think about how you naturally behave, not how you wish you would act.
            </div>
          )}
          
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-start text-left h-auto py-4 px-6 text-base btn-hover-effect"
                onClick={() => handleOptionSelect(index)}
              >
                {option.text}
              </Button>
            ))}
          </div>
          
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
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalityQuiz;
