import { useState } from 'react';
import HelpCenter from './components/HelpCenter';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [showHelpCenter, setShowHelpCenter] = useState(false);

  const toggleHelpCenter = () => {
    setShowHelpCenter(prev => !prev);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

          {/* Chatbot Button */}
          <button
            onClick={toggleHelpCenter}
            style={{
              position: 'fixed', bottom: '20px', right: '20px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer'
            }}
          >
            <img
              src="/bubble-chat.png"
              alt="Chatbot"
              style={{ width: '50px', height: '50px' }}
            />
          </button>

          {/* Show HelpCenter Modal */}
          {showHelpCenter && <HelpCenter />}
          
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
