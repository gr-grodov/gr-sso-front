import './App.css'
import { Route, Routes } from "react-router-dom";
import {LoginPage} from "@/pages/LoginPage/LoginPage.tsx";
import {RegisterPage} from "@/pages/RegisterPage";
import { ProviderErrorPage } from '@/pages/ProviderErrorPage';
import { useEffect } from 'react';
import { ConfigApi } from '@/shared/api/config.api';
import { AuthGuard, GuestGuard } from '@/features/auth';
import { HomePage } from '@/pages/HomePage';
import { AdminOAuthUsers } from '@/pages/AdminOAuthUsers';
import { AdminOAuthClients } from '@/pages/AdminOAuthClients';

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
          <Route path="/" element={<HomePage/>}/>
          <Route path='/admin'>
            <Route path='oauth-clients' element={<AdminOAuthClients/>}/>
            <Route path='oauth-users' element={<AdminOAuthUsers/>}/>
          </Route>
        </Route>

        <Route element={<AuthGuard />}>
        </Route>
        
      </Routes>
    </>
  )
}

export default App
