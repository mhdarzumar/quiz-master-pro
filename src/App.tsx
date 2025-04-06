
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/dashboard/Dashboard";
import CreateQuiz from "./pages/create/CreateQuiz";
import Reports from "./pages/reports/Reports";
import Settings from "./pages/settings/Settings";
import QuizAttempt from "./pages/quiz/QuizAttempt";
import Login from "./pages/auth/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Landing and Auth Pages */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          
          {/* Quiz Application Routes */}
          <Route path="/quiz/dashboard" element={<Dashboard />} />
          <Route path="/quiz/create" element={<CreateQuiz />} />
          <Route path="/quiz/reports" element={<Reports />} />
          <Route path="/quiz/settings" element={<Settings />} />
          <Route path="/quiz/attempt" element={<QuizAttempt />} />
          
          {/* Legacy route */}
          <Route path="/index" element={<Index />} />
          
          {/* Catch-all for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
