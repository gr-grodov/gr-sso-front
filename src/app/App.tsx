import './App.css'
import { Route, Routes } from "react-router-dom";
import {LoginPage} from "@/pages/LoginPage/LoginPage.tsx";
import {RegisterPage} from "@/pages/RegisterPage";
import { ProviderErrorPage } from '@/pages/ProviderErrorPage';
import { useEffect } from 'react';
import { ConfigApi } from '@/shared/api/config.api';
import { AuthGuard, GuestGuard } from '@/features/auth';

function App() {
  useEffect(() => {
    ConfigApi.csrf()
  }, []);

  return (
    <>
      <Routes>
        <Route element={<GuestGuard />}>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/provider-error" element={<ProviderErrorPage/>}/>
        </Route>

        <Route element={<AuthGuard />}>
          <Route path="/error" element={<ProviderErrorPage/>}/>
        </Route>
        
      </Routes>
    </>
  )
}

export default App
