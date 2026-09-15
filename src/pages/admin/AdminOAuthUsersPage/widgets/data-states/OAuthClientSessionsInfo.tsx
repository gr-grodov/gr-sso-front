import { Card, CardContent } from "@/components/ui/card";
import { useOAuthUsersActions } from "../OAuthUsersContext";
import { AppAvatar } from "@/shared/components/AppAvatar";
import { Button } from "@/components/ui/button";
import type { OAuth2ClientSession, UserOAuth2Session } from "@/shared/api/dto/response";
import { useTranslation } from "react-i18next";

export interface ClientSessionsInfoProps {
  userSessionInfo: UserOAuth2Session, 
  clientSession: OAuth2ClientSession
}

export function ClientSessionsInfo({
  userSessionInfo,
  clientSession
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
            imageId={clientSession.clientAvatarId}
            initials={clientSession.clientName} 
            className="col-span-1 ml-1"
          />
          <div className='w-full'>
            <p className='font-semibold'>{clientSession.clientName}</p>
            <p>{t("client.sessions", {count: clientSession.countSessions})}</p>
          </div>
        </div>

        <div className='flex flex-row justify-end self-center w-full'>
          <Button 
            variant='destructive' 
            onClick={() => {
              deleteClientSessions(userSessionInfo.userId, clientSession.clientId)
            }}
          >
            {t("actions.logout")}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}