import { Card, CardContent } from "@/components/ui/card";
import { useOAuthUsersActions } from "../OAuthUsersContext";
import { AppAvatar } from "@/shared/components/AppAvatar";
import { Button } from "@/components/ui/button";
import type { OAuth2ClientSession, UserOAuth2Session } from "@/shared/api/dto/response";
import { useTranslation } from "react-i18next";

export interface ClientSessionsInfoProps {
  userSessionInfo: UserOAuth2Session, 
  clientSessions: OAuth2ClientSession
}

export function ClientSessionsInfo({
  userSessionInfo,
  clientSessions
}: ClientSessionsInfoProps) {
  const {t} = useTranslation("admin", {keyPrefix: "oauth_users.item"});
  const {deleteClientSessions} = useOAuthUsersActions();

  return (
    <Card
      className='bg-background w-full' 
      size='sm'>
      <CardContent className='w-full flex flex-col lg:flex-row lg:items-center gap-2'>
        <div className='flex flex-row w-full items-center gap-4'>
          <AppAvatar 
            value={clientSessions.clientName} 
            className="col-span-1 ml-1"
          />
          <div className='w-full'>
            <p className='font-semibold'>{clientSessions.clientName}</p>
            <p>{t("client.sessions", {count: clientSessions.countSessions})}</p>
          </div>
        </div>

        <div className='flex flex-row justify-end self-center w-full'>
          <Button 
            variant='destructive' 
            onClick={() => {
              deleteClientSessions(userSessionInfo.userId, clientSessions.clientId)
            }}
          >
            {t("actions.logout")}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}