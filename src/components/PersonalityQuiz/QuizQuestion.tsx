
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Question } from '@/utils/quizData';

interface QuizQuestionProps {
  question: Question;
  onOptionSelect: (optionIndex: number) => void;
  fadeIn: boolean;
  showHint?: boolean;
  onToggleHint?: () => void;
}

export const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  onOptionSelect,
  fadeIn,
  showHint = false,
  onToggleHint
}) => {
  return (
    <Card className={cn(
      "quiz-card shadow-card transition-opacity duration-300", 
      fadeIn ? "opacity-100" : "opacity-0"
    )}>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-xl font-semibold">{question.text}</h3>
        </div>
        
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full justify-start text-left h-auto py-4 px-6 text-base btn-hover-effect"
              onClick={() => onOptionSelect(index)}
            >
              {option.text}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
