
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sparkles, Send, ArrowLeft, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

interface AIResponse {
  message: string;
  followupQuestions?: string[];
}

interface AIChatProps {
  userName: string;
  dominantTrait: string;
  onReturn: () => void;
}

const generateBotResponse = (userMessage: string, dominantTrait: string): Promise<AIResponse> => {
  // Simulate AI processing delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simple response logic based on message content and dominant trait
      let response = '';
      let followupQuestions: string[] = [];
      
      const lowerMessage = userMessage.toLowerCase();
      
      if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        response = "Hello! I'm your AI personality mentor. How can I help you today with your personal growth journey?";
        followupQuestions = [
          "Would you like some insights about your personality type?",
          "Do you want tips to develop specific skills?",
          "Are you facing any challenges related to your personality traits?"
        ];
      }
      else if (lowerMessage.includes('trait') || lowerMessage.includes('personality')) {
        if (dominantTrait === 'logical') {
          response = "As a Logical thinker, you excel at systematic problem-solving and rational decision-making. Your strengths include analytical thinking and objectivity. You might benefit from exercises that develop your emotional intelligence and creative thinking.";
        } 
        else if (dominantTrait === 'creative') {
          response = "As a Creative individual, your imagination and innovative thinking are your greatest assets. You easily generate unique ideas and approaches. To grow, you might focus on implementation skills and building more structure around your creative processes.";
        }
        else if (dominantTrait === 'social') {
          response = "As a Social Connector, you naturally build and maintain relationships. Your empathy and communication skills help you connect with others effectively. Working on setting healthy boundaries and developing assertiveness could be beneficial for your growth.";
        }
        else if (dominantTrait === 'emotional') {
          response = "As an Emotional Intuitive, you have deep emotional awareness and intuition. You understand nuances in feelings and are guided by your values. Developing emotional regulation strategies and building resilience to criticism might be helpful areas to focus on.";
        }
        else {
          response = `As someone with strong ${dominantTrait} tendencies, you have unique strengths and growth opportunities. Would you like to explore specific aspects of your personality type in more detail?`;
        }
        
        followupQuestions = [
          "Would you like specific exercises to develop complementary traits?",
          "Are there particular situations where you find your traits challenging?",
          "Would you like to learn more about how your traits influence your relationships?"
        ];
      }
      else if (lowerMessage.includes('improve') || lowerMessage.includes('develop') || lowerMessage.includes('growth')) {
        response = `Personal growth is a journey! Based on your ${dominantTrait} personality type, here are some development suggestions:\n\n1. Set specific, measurable goals aligned with your values\n2. Practice skills that complement your natural tendencies\n3. Reflect regularly on your progress\n4. Seek feedback from others\n\nRemember, small consistent steps lead to meaningful growth over time.`;
        
        followupQuestions = [
          "Would you like a specific growth exercise to try today?",
          "Are there particular skills you're interested in developing?",
          "How do you currently track your personal growth?"
        ];
      }
      else if (lowerMessage.includes('stress') || lowerMessage.includes('anxious') || lowerMessage.includes('overwhelmed')) {
        response = "I'm sorry to hear you're feeling stressed. Taking care of your mental wellbeing is important. Some strategies that might help include: practicing mindfulness, breaking tasks into smaller steps, setting boundaries, and ensuring you're getting enough rest. Remember that it's okay to ask for support when needed.";
        
        followupQuestions = [
          "Would you like to try a quick breathing exercise?",
          "Are there specific situations causing your stress?",
          "Have you found any stress management techniques that work well for you?"
        ];
      }
      else if (lowerMessage.includes('thank')) {
        response = "You're very welcome! I'm here to support your personal growth journey anytime you need guidance or want to explore your personality traits further.";
      }
      else {
        response = "That's an interesting point. Personal growth is a unique journey for everyone. Based on your personality profile, focusing on self-awareness and intentional development of both your strengths and growth areas can lead to meaningful progress. Is there a specific aspect of your personality or development you'd like to explore further?";
        
        followupQuestions = [
          "Would you like to know more about your personality traits?",
          "Do you have specific goals you're working toward?",
          "Are there particular situations you find challenging?"
        ];
      }
      
      resolve({ message: response, followupQuestions });
    }, 1000);
  });
};

const AIChat: React.FC<AIChatProps> = ({ userName, dominantTrait, onReturn }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: `Hi ${userName}! I'm your AI personality mentor. Based on your quiz results, I can help you better understand your ${dominantTrait} tendencies and suggest personalized growth strategies. What would you like to know?`,
      timestamp: new Date()
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messageCount, setMessageCount] = useState(1);
  const maxFreeMessages = 10;
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([
    "Tell me more about my personality type",
    "How can I improve my weaknesses?",
    "What are some growth exercises for me?",
    "How does stress affect my personality type?"
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    // Check if user has reached the message limit for free plan
    if (messageCount >= maxFreeMessages) {
      const limitMessage: Message = {
        id: Date.now().toString(),
        sender: 'bot',
        text: "You've reached the maximum number of messages allowed on the free plan. Please upgrade to continue our conversation.",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, limitMessage]);
      return;
    }
    
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    setMessageCount(prev => prev + 1);
    
    // Simulate AI thinking and typing
    try {
      const response = await generateBotResponse(userMessage.text, dominantTrait);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: response.message,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setSuggestedQuestions(response.followupQuestions || []);
    } catch (error) {
      console.error("Error generating response:", error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: "I apologize, but I encountered an issue processing your request. Could you please try again?",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  const handleSuggestedQuestion = (question: string) => {
    setInputMessage(question);
  };
  
  // Format timestamp to a readable format
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Calculate the progress percentage for free plan message usage
  const messageProgressPercentage = (messageCount / maxFreeMessages) * 100;

  return (
    <div className="w-full max-w-4xl mx-auto h-[80vh] flex flex-col bg-background rounded-lg shadow-lg overflow-hidden">
      {/* Chat header */}
      <div className="p-4 border-b flex items-center justify-between bg-muted/30">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={onReturn} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium text-sm">AI Personality Mentor</h3>
              <p className="text-xs text-muted-foreground flex items-center">
                <span className="inline-block h-2 w-2 rounded-full bg-green-500 mr-1.5"></span>
                Online
              </p>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <Info className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Chat messages */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex chat-message",
                message.sender === 'user' ? "justify-end" : "justify-start"
              )}
            >
              {message.sender === 'bot' && (
                <Avatar className="h-8 w-8 mr-2 mt-1">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
                </Avatar>
              )}
              
              <div
                className={cn(
                  "max-w-[80%] rounded-lg p-3",
                  message.sender === 'user'
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                <p className="whitespace-pre-line">{message.text}</p>
                <div
                  className={cn(
                    "text-xs mt-1",
                    message.sender === 'user'
                      ? "text-primary-foreground/80"
                      : "text-muted-foreground"
                  )}
                >
                  {formatTime(message.timestamp)}
                </div>
              </div>
              
              {message.sender === 'user' && (
                <Avatar className="h-8 w-8 ml-2 mt-1">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>{userName[0]}</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
              </Avatar>
              <div className="bg-muted rounded-lg p-3">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 bg-primary/70 rounded-full animate-bounce [animation-delay:0ms]"></div>
                  <div className="h-2 w-2 bg-primary/70 rounded-full animate-bounce [animation-delay:150ms]"></div>
                  <div className="h-2 w-2 bg-primary/70 rounded-full animate-bounce [animation-delay:300ms]"></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      {/* Suggested questions */}
      {suggestedQuestions.length > 0 && (
        <div className="px-4 py-2 border-t border-border overflow-x-auto whitespace-nowrap">
          <div className="flex space-x-2">
            {suggestedQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleSuggestedQuestion(question)}
                className="flex-shrink-0"
              >
                {question}
              </Button>
            ))}
          </div>
        </div>
      )}
      
      {/* Input area */}
      <div className="p-4 border-t flex items-center">
        <Input
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className="flex-1"
        />
        <Button 
          onClick={handleSendMessage} 
          className="ml-2 rounded-full h-10 w-10 p-0 flex items-center justify-center"
          disabled={!inputMessage.trim() || isTyping || messageCount >= maxFreeMessages}
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Free plan progress and notice */}
      <div className="px-4 py-2 border-t bg-muted/30">
        {/* Message usage progress bar */}
        <div className="mb-2">
          <div className="flex justify-between items-center text-xs mb-1">
            <span className="text-muted-foreground">Messages: {messageCount}/{maxFreeMessages}</span>
            <span className="text-muted-foreground">{Math.round(messageProgressPercentage)}% used</span>
          </div>
          <Progress 
            value={messageProgressPercentage} 
            className="h-2"
            indicatorClassName={cn(
              messageProgressPercentage < 50 ? "bg-green-500" :
              messageProgressPercentage < 80 ? "bg-amber-500" :
              "bg-red-500"
            )}
          />
        </div>
        
        {/* Upgrade notice */}
        <div className="flex items-center justify-center text-xs text-muted-foreground">
          <Sparkles className="h-3 w-3 mr-1" />
          <span>Free Plan: Limited to {maxFreeMessages} messages per day. <button className="text-primary underline">Upgrade for unlimited access</button></span>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
