
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface QuizProgressProps {
  currentQuestionIndex: number;
  totalQuestions: number;
}

export const QuizProgress: React.FC<QuizProgressProps> = ({ 
  currentQuestionIndex, 
  totalQuestions 
}) => {
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="mb-6">
      <div className="mt-4">
        <Progress value={progress} className="h-2 bg-gray-200" />
        <div className="flex justify-between mt-1">
          <span className="text-sm text-muted-foreground">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </span>
          <span className="text-sm text-muted-foreground">
            {Math.round(progress)}%
          </span>
        </div>
      </div>
    </div>
  );
};
