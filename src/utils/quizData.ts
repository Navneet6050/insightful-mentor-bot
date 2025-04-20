export interface Question {
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

export interface PersonalityTraits {
  logical: number;
  creative: number;
  social: number;
  emotional: number;
  leader: number;
  analytical: number;
  introvert: number;
  extrovert: number;
}

export const INITIAL_QUESTIONS: Question[] = [
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

export const INITIAL_PERSONALITY_TRAITS: PersonalityTraits = {
  logical: 0,
  creative: 0,
  social: 0,
  emotional: 0,
  leader: 0,
  analytical: 0,
  introvert: 0,
  extrovert: 0
};
