import App from '@/app/App.tsx'
import ReactDOM from "react-dom/client";
import '@/index.css'
import "@/shared/i18n/config";
import { BrowserRouter } from "react-router-dom"; 
import { AuthProvider } from '@/features/auth';
import { Toaster } from '@/components/ui/toast';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ThemeProvider } from './features/theme';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <App />
          <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
);
