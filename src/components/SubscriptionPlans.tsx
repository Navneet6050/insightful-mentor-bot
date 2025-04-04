
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Sparkles, X } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface SubscriptionPlansProps {
  onReturn: () => void;
}

const SubscriptionPlans: React.FC<SubscriptionPlansProps> = ({ onReturn }) => {
  const handleSubscribe = (plan: string, price: string) => {
    toast.info(`Coming Soon: ${plan} subscription for ${price}/month`, {
      description: "This feature will be available in a future update.",
      duration: 4000,
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 fade-in-up">
      <h2 className="text-3xl font-bold text-center mb-3">Enhance Your Journey</h2>
      <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
        Choose the plan that fits your personal growth needs. Unlock deeper insights 
        and personalized development paths with our premium subscriptions.
      </p>
      
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {/* Basic Plan */}
        <Card className="subscription-card border border-border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Basic
              <Badge variant="outline" className="ml-2">
                Free
              </Badge>
            </CardTitle>
            <CardDescription>
              Start your self-discovery journey
            </CardDescription>
            <div className="mt-4">
              <span className="text-3xl font-bold">$0</span>
              <span className="text-muted-foreground">/month</span>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <ul className="space-y-2">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                <span>Personality assessment quiz</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                <span>Basic personality profile</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                <span>Primary trait analysis</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                <span>Limited AI chat support</span>
              </li>
              <li className="flex items-start">
                <X className="h-5 w-5 text-gray-300 mr-2 shrink-0 mt-0.5" />
                <span className="text-muted-foreground">Detailed trait analysis</span>
              </li>
              <li className="flex items-start">
                <X className="h-5 w-5 text-gray-300 mr-2 shrink-0 mt-0.5" />
                <span className="text-muted-foreground">Personalized growth plan</span>
              </li>
              <li className="flex items-start">
                <X className="h-5 w-5 text-gray-300 mr-2 shrink-0 mt-0.5" />
                <span className="text-muted-foreground">Progress tracking</span>
              </li>
            </ul>
          </CardContent>
          
          <CardFooter>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={onReturn}
            >
              Current Plan
            </Button>
          </CardFooter>
        </Card>
        
        {/* Premium Plan */}
        <Card className={cn(
          "subscription-card relative border-primary z-10 shadow-xl",
          "before:absolute before:-inset-0.5 before:bg-gradient-to-b before:from-primary/20 before:to-primary/5 before:rounded-xl before:-z-10"
        )}>
          <CardHeader>
            <div className="flex items-center justify-between mb-1">
              <CardTitle className="flex items-center">
                Premium
                <Badge className="ml-2 bg-primary">Popular</Badge>
              </CardTitle>
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <CardDescription>
              Detailed insights and guidance
            </CardDescription>
            <div className="mt-4">
              <span className="text-3xl font-bold">$9.99</span>
              <span className="text-muted-foreground">/month</span>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <ul className="space-y-2">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                <span>Everything in Basic</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                <span>In-depth personality analysis</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                <span>Personalized development plan</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                <span>Unlimited AI mentor interactions</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                <span>Weekly challenges & exercises</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                <span>Progress tracking dashboard</span>
              </li>
              <li className="flex items-start">
                <X className="h-5 w-5 text-gray-300 mr-2 shrink-0 mt-0.5" />
                <span className="text-muted-foreground">1-on-1 coaching suggestions</span>
              </li>
            </ul>
          </CardContent>
          
          <CardFooter>
            <Button 
              className="w-full gradient-animation bg-gradient-to-r from-primary to-primary/80"
              onClick={() => handleSubscribe("Premium", "$9.99")}
            >
              Subscribe
            </Button>
          </CardFooter>
        </Card>
        
        {/* VIP Plan */}
        <Card className="subscription-card border-border/50 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between mb-1">
              <CardTitle className="flex items-center">
                VIP
              </CardTitle>
              <Crown className="h-5 w-5 text-amber-500" />
            </div>
            <CardDescription>
              Elite coaching & exclusive content
            </CardDescription>
            <div className="mt-4">
              <span className="text-3xl font-bold">$19.99</span>
              <span className="text-muted-foreground">/month</span>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <ul className="space-y-2">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                <span>Everything in Premium</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                <span>Advanced AI-powered mentorship</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                <span>Exclusive self-improvement courses</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                <span>Personalized monthly challenges</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                <span>Advanced progress analytics</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                <span>1-on-1 coaching suggestions</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                <span>Priority support & early features</span>
              </li>
            </ul>
          </CardContent>
          
          <CardFooter>
            <Button 
              variant="secondary"
              className="w-full"
              onClick={() => handleSubscribe("VIP", "$19.99")}
            >
              Subscribe
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="text-center">
        <Button 
          variant="ghost" 
          onClick={onReturn} 
          className="btn-hover-effect"
        >
          Return to Results
        </Button>
      </div>
      
      <div className="mt-12 max-w-3xl mx-auto">
        <h3 className="text-xl font-semibold text-center mb-6">Frequently Asked Questions</h3>
        <div className="space-y-4">
          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Can I change my subscription plan later?</h4>
            <p className="text-muted-foreground text-sm">Yes, you can upgrade, downgrade, or cancel your subscription at any time from your account settings.</p>
          </div>
          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">What payment methods do you accept?</h4>
            <p className="text-muted-foreground text-sm">We accept all major credit cards, PayPal, and Apple Pay for subscription payments.</p>
          </div>
          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Is my data secure and private?</h4>
            <p className="text-muted-foreground text-sm">Yes, we use industry-standard encryption and never share your personal data with third parties.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
