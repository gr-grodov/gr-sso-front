import App from '@/app/App.tsx'
import ReactDOM from "react-dom/client";
import '@/index.css'
import "@/shared/i18n/config";
import { BrowserRouter } from "react-router-dom"; 

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
