import { CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { oauth2FlowContinue } from '@/features/oauth2/oauth2-flow-continue';
import { AppCardBlock } from '@/shared/widgets/AppCardBlock';
import { UserInformationBlock } from '@/shared/widgets/UserInformationBlock'
import { useEffect } from 'react'
import { OAuth2SessionList } from './widgets/OAuth2SessionList';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/features/auth';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useOAuth2Session } from './hooks/use-oauth2-session';
import { OAuth2SessionLoading } from './widgets/OAuth2SessionLoading';

export function Oauth2Session() {
  const {t} = useTranslation("common", {keyPrefix: "session"});
  const [sessions, currDeviceSessions, loading, refresh, deleteSession] = useOAuth2Session();
  const {user} = useAuth();

  useEffect(() => {
    async function continueOAuth2() {
      await oauth2FlowContinue(() => {});  
    }
    
    continueOAuth2();
  }, [])

  return (
    <>
      <AppCardBlock>
        <CardHeader className='flex flex-row justify-between items-center'>
          <div>
            <h3 className="font-semibold">{t("title")}</h3>
            <p>{t("subtitle.active_session", {count: (currDeviceSessions.length + sessions.length), email: user?.email})}</p>
          </div>
          <Button size='icon' variant='ghost' onClick={refresh} disabled={loading}>
            <Spinner type='REFRESH' enabled={loading}/>
          </Button>
        </CardHeader>

        <CardContent>
          {loading && (sessions.length === 0 && currDeviceSessions.length === 0)
            ? <OAuth2SessionLoading/>
            : <OAuth2SessionList 
                sessions={sessions} 
                currDeviceSessions={currDeviceSessions}
                deleteSession={deleteSession}
              />
          }
        </CardContent>

        <CardFooter className='w-full flex flex-row justify-between mt-4'>
          <UserInformationBlock/>
        </CardFooter>
      </AppCardBlock>
    </>
  )
}
