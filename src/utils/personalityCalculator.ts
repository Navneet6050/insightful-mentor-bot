
import { PersonalityTraits, Question } from './quizData';

export const calculatePersonalityTraits = (
  currentTraits: PersonalityTraits, 
  currentQuestion: Question, 
  selectedOptionIndex: number
): PersonalityTraits => {
  const selectedOption = currentQuestion.options[selectedOptionIndex];
  const newTraits = { ...currentTraits };
  
  Object.entries(selectedOption.value).forEach(([trait, value]) => {
    newTraits[trait as keyof PersonalityTraits] += value || 0;
  });
  
  return newTraits;
};

export const getDominantTrait = (traits: PersonalityTraits): string => {
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
