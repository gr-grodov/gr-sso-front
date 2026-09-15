import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Separator } from '@/components/ui/separator'
import type { UserOAuth2Session } from '@/shared/api/dto/response'
import { AppAvatar } from '@/shared/components/AppAvatar'
import { ChevronsUpDown, LogInIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { ClientSessionsInfo } from './OAuthClientSessionsInfo'

export interface OAuthUserItemProps {
  userSessionInfo: UserOAuth2Session
}

export default function OAuthUserItem({userSessionInfo}: OAuthUserItemProps) {
  const {t} = useTranslation("admin", {keyPrefix: "oauth_users.item"})

  const uniqueClientNames = [...new Set(userSessionInfo.clients.slice(0, 3).map((session) => session.clientName))];

  return (
    <Card>
      <Collapsible>
        <CardHeader className='w-full flex flex-row items-center gap-2'>
          <AppAvatar 
            initials={userSessionInfo.userEmail}
            imageId={userSessionInfo.userAvatarId}
            className="col-span-1 ml-1"
          />
          <div className='flex flex-col'>
            <CollapsibleTrigger>
              <Button variant='ghost'>
                <ChevronsUpDown size={12}/>
                <span className='text-base font-semibold truncate'>
                  {userSessionInfo.userEmail}
                </span>
              </Button>
            </CollapsibleTrigger>
            <div className='flex flex-row items-center gap-1 ms-2 text-muted-foreground'>
              <LogInIcon size={12}/>
              <span className='max-w-3xl truncate'>
                {userSessionInfo.clients.length === 0
                  ? t("description.client_empty")
                  : t("description.clients", {count: userSessionInfo.clients.length, clients: uniqueClientNames.join(", ")})
                }
              </span>
            </div>
          </div>

          <div className='hidden lg:flex lg:flex-row justify-end self-center w-full'>
              {uniqueClientNames.map((clientName) => (
                <Badge key={`badge-${clientName}-${userSessionInfo.userId}`} className='mr-1'>
                  {clientName}
                </Badge>
              ))}
              {userSessionInfo.clients.length > 3 && <span className='mr-1'>...</span>}
          </div>
        </CardHeader>
        <CollapsibleContent>
          <CardContent className='mt-4'>
            <Separator className="mb-4"/>
            
            <div className='flex flex-col gap-2'>
              <div className="uppercase text-hint">Активные сессии</div>
              {userSessionInfo.clients.map(clientSessions => 
                <ClientSessionsInfo
                  key={`${userSessionInfo.userId}_${clientSessions.clientId}`} 
                  userSessionInfo={userSessionInfo} 
                  clientSession={clientSessions}
                />
              )}
            </div>

          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}
