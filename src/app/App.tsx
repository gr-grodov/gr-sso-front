import './App.css'
import { Route, Routes } from "react-router-dom";
import {LoginPage} from "@/pages/auth/LoginPage/LoginPage";
import {RegisterPage} from "@/pages/auth/RegisterPage";
import { ProviderErrorPage } from '@/pages/auth/ProviderErrorPage';
import { AuthGuard, GuestGuard, RoleGuard } from '@/features/auth';
import { Oauth2Session } from '@/pages/common/Oauth2Session';
import { AdminOAuthUsersPage } from '@/pages/admin/AdminOAuthUsersPage';
import { AdminOAuthClientsPage } from '@/pages/admin/AdminOAuthClientsPage';
import { AdminPanelPage } from '@/pages/admin/AdminPanelPage';
import { OAuthClientFormPage } from '@/pages/admin/OAuthClientFormPage';
import { NotFoundPage } from '@/pages/common/NotFoundPage';
import { OAuthConsentPage } from '@/pages/auth/OAuthConsentPage';
import { VerifyEmailPage } from '@/pages/auth/VerifyEmailPage';
import { ProfilePage } from '@/pages/common/ProfilePage';

function App() {
  return (
    <>
      <Routes>
        <Route element={<GuestGuard />}>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/provider-error" element={<ProviderErrorPage/>}/>
          <Route path='/verify-email' element={<VerifyEmailPage/>}/>
        </Route>

        <Route element={<AuthGuard />}>
          <Route path="/" element={<Oauth2Session/>}/>
          <Route path='/profile' element={<ProfilePage/>}/>
          <Route path='/consent-scopes' element={<OAuthConsentPage/>}/>

          <Route element={<RoleGuard roles={['ADMIN']}/>}>
            <Route path='/admin' element={<AdminPanelPage/>}>
              <Route path='oauth-clients' element={<AdminOAuthClientsPage/>}/>
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
