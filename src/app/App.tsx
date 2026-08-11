import './App.css'
import { Route, Routes } from "react-router-dom";
import {LoginPage} from "@/pages/auth/LoginPage/LoginPage";
import {RegisterPage} from "@/pages/auth/RegisterPage";
import { ProviderErrorPage } from '@/pages/auth/ProviderErrorPage';
import { useEffect } from 'react';
import { ConfigApi } from '@/shared/api/config.api';
import { AuthGuard, GuestGuard, RoleGuard } from '@/features/auth';
import { HomePage } from '@/pages/common/HomePage';
import { AdminOAuthUsersPage } from '@/pages/admin/AdminOAuthUsersPage';
import { AdminOAuthClientsPage } from '@/pages/admin/AdminOAuthClientsPage';
import { AdminPanelPage } from '@/pages/admin/AdminPanelPage';
import { OAuthClientFormPage } from '@/pages/admin/OAuthClientFormPage';
import { NotFoundPage } from '@/pages/common/NotFoundPage';
import { OAuthConsentPage } from '@/pages/auth/OAuthConsentPage';

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
          <Route path='/oauth2/consent' element={<OAuthConsentPage/>}/>

          <Route element={<RoleGuard roles={['ADMIN']}/>}>
            <Route path='/admin' element={<AdminPanelPage/>}>
              <Route path='oauth-clients' element={<AdminOAuthClientsPage/>}/>
              <Route path='oauth-clients/new' element={<OAuthClientFormPage/>}/>
              <Route path='oauth-clients/:id' element={<OAuthClientFormPage/>}/>

              <Route path='oauth-users' element={<AdminOAuthUsersPage/>}/>
            </Route>
          </Route>
        </Route>
        
        <Route path='*' element={<NotFoundPage/>}/>
      </Routes>
    </>
  )
}

export default App
