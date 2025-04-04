
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { ArrowRight, Brain, Lightbulb, Users, Heart, Crown, BarChart, Coffee, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

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

interface PersonalityResultsProps {
  personalityTraits: PersonalityTraits;
  dominantTrait: string;
  userName: string;
  onViewSubscriptions: () => void;
  onStartChat: () => void;
}

interface TraitInfo {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  strengths: string[];
  challenges: string[];
  growthAreas: string[];
}

const PersonalityResults: React.FC<PersonalityResultsProps> = ({
  personalityTraits,
  dominantTrait,
  userName,
  onViewSubscriptions,
  onStartChat
}) => {
  const [showFull, setShowFull] = useState(false);
  const [animatedTraits, setAnimatedTraits] = useState<string[]>([]);

  // Calculate max possible value for normalization
  const maxPossibleValue = 20; // Based on quiz design

  // Normalize trait values for display
  const normalizedTraits = Object.entries(personalityTraits).map(([trait, value]) => ({
    trait,
    normalizedValue: (value / maxPossibleValue) * 100
  })).sort((a, b) => b.normalizedValue - a.normalizedValue);

  const traitInfo: Record<string, TraitInfo> = {
    logical: {
      icon: <Brain className="h-8 w-8" />,
      title: "Logical Thinker",
      description: "You excel at systematic problem-solving and rational decision-making. Your approach is methodical and fact-based.",
      color: "bg-blue-500",
      strengths: [
        "Excellent problem-solving abilities",
        "Rational and objective decision-making",
        "Strong critical thinking skills"
      ],
      challenges: [
        "May sometimes overlook emotional aspects",
        "Can appear detached or overly analytical",
        "Might struggle with ambiguity"
      ],
      growthAreas: [
        "Developing emotional intelligence",
        "Practicing creative thinking exercises",
        "Embracing uncertainty in decision-making"
      ]
    },
    creative: {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Creative Spirit",
      description: "You have a vibrant imagination and thrive on innovative thinking. You easily generate unique ideas and approaches.",
      color: "bg-purple-500",
      strengths: [
        "Innovative problem-solving",
        "Out-of-the-box thinking",
        "Adaptability to new situations"
      ],
      challenges: [
        "May get distracted by too many ideas",
        "Sometimes practical implementation challenges",
        "Could struggle with routine tasks"
      ],
      growthAreas: [
        "Developing focus and implementation skills",
        "Learning to evaluate ideas critically",
        "Building structure around creative processes"
      ]
    },
    social: {
      icon: <Users className="h-8 w-8" />,
      title: "Social Connector",
      description: "You naturally build and maintain relationships. Your empathy and communication skills help you connect with others.",
      color: "bg-green-500",
      strengths: [
        "Strong interpersonal skills",
        "Natural team player",
        "Excellent communication abilities"
      ],
      challenges: [
        "May prioritize others' needs over your own",
        "Could be sensitive to rejection",
        "Might avoid necessary conflict"
      ],
      growthAreas: [
        "Setting healthy boundaries",
        "Developing assertiveness",
        "Building independence"
      ]
    },
    emotional: {
      icon: <Heart className="h-8 w-8" />,
      title: "Emotional Intuitive",
      description: "You have deep emotional awareness and intuition. You understand nuances in feelings and are guided by your values.",
      color: "bg-red-500",
      strengths: [
        "High emotional intelligence",
        "Strong intuition and empathy",
        "Value-driven decision making"
      ],
      challenges: [
        "May be overwhelmed by emotions at times",
        "Could take criticism personally",
        "Might struggle with objective decisions"
      ],
      growthAreas: [
        "Developing emotional regulation strategies",
        "Practicing cognitive reframing",
        "Building resilience to criticism"
      ]
    },
    leader: {
      icon: <Crown className="h-8 w-8" />,
      title: "Natural Leader",
      description: "You take initiative and guide others effectively. Your confidence and decisiveness help groups achieve goals.",
      color: "bg-amber-500",
      strengths: [
        "Decision-making ability",
        "Strategic vision",
        "Inspiring others to action"
      ],
      challenges: [
        "May be perceived as dominating",
        "Could struggle to delegate",
        "Might be impatient with different approaches"
      ],
      growthAreas: [
        "Developing inclusive leadership skills",
        "Practicing active listening",
        "Building collaborative decision-making"
      ]
    },
    analytical: {
      icon: <BarChart className="h-8 w-8" />,
      title: "Analytical Mind",
      description: "You excel at breaking down complex problems. Your detailed analysis and pattern recognition lead to thorough solutions.",
      color: "bg-cyan-500",
      strengths: [
        "Attention to detail",
        "Data-driven decision making",
        "Systematic problem analysis"
      ],
      challenges: [
        "May get caught in analysis paralysis",
        "Could miss the big picture",
        "Might struggle with quick decisions"
      ],
      growthAreas: [
        "Developing intuitive decision-making",
        "Practicing big-picture thinking",
        "Building comfort with ambiguity"
      ]
    },
    introvert: {
      icon: <Coffee className="h-8 w-8" />,
      title: "Thoughtful Introvert",
      description: "You process ideas internally and enjoy deep focus. Your rich inner world gives you unique perspectives.",
      color: "bg-indigo-500",
      strengths: [
        "Deep thinking ability",
        "Strong focus and concentration",
        "Independent problem-solving"
      ],
      challenges: [
        "May find networking challenging",
        "Could be perceived as distant",
        "Might feel drained in social settings"
      ],
      growthAreas: [
        "Developing comfortable networking strategies",
        "Practicing assertive communication",
        "Building social energy management"
      ]
    },
    extrovert: {
      icon: <Zap className="h-8 w-8" />,
      title: "Energetic Extrovert",
      description: "You gain energy from social interaction and external stimulation. Your enthusiasm engages others effectively.",
      color: "bg-orange-500",
      strengths: [
        "Natural networking ability",
        "Energizing team environments",
        "Comfortable with public speaking"
      ],
      challenges: [
        "May seek constant stimulation",
        "Could struggle with solitary work",
        "Might speak before thinking"
      ],
      growthAreas: [
        "Developing reflective practices",
        "Building deep work habits",
        "Practicing active listening"
      ]
    }
  };

  // Animate traits appearing one by one
  useEffect(() => {
    const traitNames = normalizedTraits.map(t => t.trait);
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      if (currentIndex < traitNames.length) {
        setAnimatedTraits(prev => [...prev, traitNames[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 300);
    
    return () => clearInterval(interval);
  }, []);

  const dominantTraitInfo = traitInfo[dominantTrait];

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pb-8 fade-in-up">
      <h2 className="text-3xl font-bold text-center mb-3">Your Personality Profile</h2>
      <p className="text-center text-muted-foreground mb-8">
        {userName}, here's your unique personality breakdown based on your responses.
      </p>
      
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Dominant trait card */}
        <Card className={cn(
          "shadow-card col-span-full md:col-span-1",
          "border-t-4",
          dominantTrait === 'logical' && "border-t-blue-500",
          dominantTrait === 'creative' && "border-t-purple-500",
          dominantTrait === 'social' && "border-t-green-500",
          dominantTrait === 'emotional' && "border-t-red-500",
          dominantTrait === 'leader' && "border-t-amber-500",
          dominantTrait === 'analytical' && "border-t-cyan-500",
          dominantTrait === 'introvert' && "border-t-indigo-500",
          dominantTrait === 'extrovert' && "border-t-orange-500"
        )}>
          <CardHeader>
            <div className="flex items-center">
              <div className={cn(
                "p-3 rounded-full mr-4",
                dominantTrait === 'logical' && "bg-blue-100 text-blue-600",
                dominantTrait === 'creative' && "bg-purple-100 text-purple-600",
                dominantTrait === 'social' && "bg-green-100 text-green-600",
                dominantTrait === 'emotional' && "bg-red-100 text-red-600",
                dominantTrait === 'leader' && "bg-amber-100 text-amber-600",
                dominantTrait === 'analytical' && "bg-cyan-100 text-cyan-600",
                dominantTrait === 'introvert' && "bg-indigo-100 text-indigo-600",
                dominantTrait === 'extrovert' && "bg-orange-100 text-orange-600"
              )}>
                {dominantTraitInfo.icon}
              </div>
              <div>
                <CardTitle className="text-xl">{dominantTraitInfo.title}</CardTitle>
                <p className="text-sm text-muted-foreground">Your dominant personality trait</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{dominantTraitInfo.description}</p>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Key Strengths:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm pl-2">
                  {dominantTraitInfo.strengths.map((strength, idx) => (
                    <li key={idx}>{strength}</li>
                  ))}
                </ul>
              </div>
              
              {showFull && (
                <>
                  <div>
                    <h4 className="font-medium mb-2">Potential Challenges:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm pl-2">
                      {dominantTraitInfo.challenges.map((challenge, idx) => (
                        <li key={idx}>{challenge}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Growth Opportunities:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm pl-2">
                      {dominantTraitInfo.growthAreas.map((area, idx) => (
                        <li key={idx}>{area}</li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowFull(!showFull)} 
              className="w-full btn-hover-effect"
            >
              {showFull ? "Show Less" : "See More Insights"}
            </Button>
          </CardFooter>
        </Card>
        
        {/* Trait breakdown */}
        <Card className="shadow-card col-span-full md:col-span-1">
          <CardHeader>
            <CardTitle className="text-xl">Your Personality Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {normalizedTraits.map(({ trait, normalizedValue }, idx) => (
                <div 
                  key={trait} 
                  className={cn(
                    "space-y-1 transition-all duration-500",
                    animatedTraits.includes(trait) ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                  )}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium capitalize">{trait}</span>
                    <span className="text-sm text-muted-foreground">{Math.round(normalizedValue)}%</span>
                  </div>
                  <Progress 
                    value={normalizedValue} 
                    className="h-2" 
                    indicatorClassName={cn(
                      trait === 'logical' && "bg-blue-500",
                      trait === 'creative' && "bg-purple-500",
                      trait === 'social' && "bg-green-500",
                      trait === 'emotional' && "bg-red-500",
                      trait === 'leader' && "bg-amber-500",
                      trait === 'analytical' && "bg-cyan-500",
                      trait === 'introvert' && "bg-indigo-500",
                      trait === 'extrovert' && "bg-orange-500"
                    )}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <Button 
          onClick={onViewSubscriptions} 
          className="bg-primary hover:bg-primary/90 text-white py-2 px-6 rounded-md shadow-md btn-hover-effect"
        >
          Get Premium Insights <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        
        <Button 
          variant="outline"
          onClick={onStartChat}
          className="btn-hover-effect"
        >
          Chat with AI Mentor
        </Button>
      </div>
      
      <p className="text-center text-sm text-muted-foreground mt-8">
        This analysis is based on your quiz responses and provides general insights.
        For more detailed, personalized analysis, consider our premium subscription.
      </p>
    </div>
  );
};

export default PersonalityResults;
