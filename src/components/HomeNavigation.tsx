
import React from 'react';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HomeNavigationProps {
  showBack?: boolean;
  backLabel?: string;
  onBack?: () => void;
}

const HomeNavigation: React.FC<HomeNavigationProps> = ({ 
  showBack = true, 
  backLabel = "Back", 
  onBack 
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  const handleHome = () => {
    navigate('/');
  };

  return (
    <div className="flex justify-between w-full mb-4">
      {showBack && (
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleBack}
          className="flex items-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" />
          {backLabel}
        </Button>
      )}
      
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleHome}
        className="flex items-center gap-1 ml-auto"
      >
        <Home className="h-4 w-4" />
        Home
      </Button>
    </div>
  );
};

export default HomeNavigation;
