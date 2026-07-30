import './App.css'
import { Route, Routes } from "react-router-dom";
import {LoginPage} from "@/pages/LoginPage/LoginPage.tsx";
import {RegisterPage} from "@/pages/RegisterPage";
import { ProviderErrorPage } from '@/pages/ProviderErrorPage';
import { useEffect } from 'react';
import { ConfigApi } from '@/shared/api/config.api';
import { AuthGuard, GuestGuard, RoleGuard } from '@/features/auth';
import { HomePage } from '@/pages/HomePage';
import { AdminOAuthUsers } from '@/pages/AdminOAuthUsers';
import { AdminOAuthClients } from '@/pages/AdminOAuthClients';
import { AdminPanel } from '@/pages/AdminPanel';
import { OAuthClientFormPage } from '@/pages/OAuthClientFormPage';

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
          <Route path="/" element={<HomePage/>}/>

          <Route element={<RoleGuard roles={['ADMIN']}/>}>
            <Route path='/admin' element={<AdminPanel/>}>
              <Route path='oauth-clients' element={<AdminOAuthClients/>}/>
              <Route path='oauth-clients/new' element={<OAuthClientFormPage/>}/>
              <Route path='oauth-clients/:id' element={<OAuthClientFormPage/>}/>
              <Route path='oauth-users' element={<AdminOAuthUsers/>}/>
            </Route>
          </Route>
        </Route>
        
      </Routes>
    </>
  )
}

export default App
