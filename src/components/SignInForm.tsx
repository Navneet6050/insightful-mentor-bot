
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { ArrowRight, Sparkles } from 'lucide-react';

interface SignInFormProps {
  onSignIn: (userData: {
    name: string;
    email: string;
    age?: number;
    gender?: string;
  }) => void;
}

const SignInForm: React.FC<SignInFormProps> = ({ onSignIn }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    gender: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast.error('Please provide your name and email to continue');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    setLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      onSignIn({
        name: formData.name,
        email: formData.email,
        age: formData.age ? parseInt(formData.age) : undefined,
        gender: formData.gender || undefined
      });
      
      setLoading(false);
      toast.success(`Welcome, ${formData.name}! Let's discover your personality!`);
    }, 1000);
  };

  return (
    <Card className="w-full max-w-md shadow-card fade-in-up">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-center mb-4">
          <Sparkles className="h-10 w-10 text-primary animate-pulse-slow" />
        </div>
        <CardTitle className="text-2xl font-bold text-center">Welcome to InsightfulYou</CardTitle>
        <CardDescription className="text-center">
          Sign in to start your personality assessment journey
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              name="name"
              placeholder="Your Name *"
              value={formData.name}
              onChange={handleChange}
              className="btn-hover-effect"
              required
            />
          </div>
          <div className="space-y-2">
            <Input
              name="email"
              type="email"
              placeholder="Email Address *"
              value={formData.email}
              onChange={handleChange}
              className="btn-hover-effect"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Input
                name="age"
                type="number"
                placeholder="Age (Optional)"
                value={formData.age}
                onChange={handleChange}
                min={13}
                max={120}
                className="btn-hover-effect"
              />
            </div>
            <div className="space-y-2">
              <Input
                name="gender"
                placeholder="Gender (Optional)"
                value={formData.gender}
                onChange={handleChange}
                className="btn-hover-effect"
              />
            </div>
          </div>
          <div className="pt-2">
            <Button 
              type="submit" 
              className="w-full gradient-animation bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 btn-hover-effect" 
              disabled={loading}
            >
              {loading ? 'Starting Journey...' : 'Begin Your Journey'} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <p className="text-xs text-muted-foreground text-center px-6">
          By continuing, you agree to our Terms of Service and Privacy Policy. 
          Your data will be used to personalize your experience.
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignInForm;
