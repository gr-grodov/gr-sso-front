import { CopyableText } from '@/shared/components/CopyableText'
import { memo } from 'react'
import { OAuthClientActionMenu } from './OAuthClientActions'
import { Badge } from '@/components/ui/badge'
import { type OAuthClient } from '@/shared/api/dto/response'
import { DateUtils } from '@/shared/utils'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useTranslation } from 'react-i18next'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Check, ChevronsUpDown, X } from 'lucide-react'
import { AppAvatar } from '@/shared/components/AppAvatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useIsMobile } from '@/hooks/use-mobile'
import { FormatDurationText } from '@/shared/components/FormatDurationText'

interface OAuthClientItemProps {
  client: OAuthClient
}

export const OAuthClientItem = memo(function OAuthClientItem({client}: OAuthClientItemProps) {
  const {t} = useTranslation("admin", {keyPrefix: "oauth_clients.item"})
  const isMobile = useIsMobile();

  return (
    <Card key={client.id}>
      <Collapsible>
        <CardHeader className='w-full flex flex-row items-center gap-2'>
          {!isMobile && 
            <AppAvatar 
              initials={client.clientName}
              imageId={client.avatarId}
              disabled={client.status !== "ACTIVE"} 
              className="col-span-1 ml-1"
            /> 
          }
          <div>
            <div className='flex flex-row gap-2 items-center'>
              <CollapsibleTrigger>
              <Button variant='ghost'>
                <ChevronsUpDown size={12}/>
                <span className='text-base font-semibold lg:max-w-3xs max-w-40 truncate'>{client.clientName}</span>
              </Button>
              </CollapsibleTrigger>
              {client.status === "ACTIVE"
                ? <Badge variant='secondary'>{t("actived")}</Badge> 
                : <Badge variant='outline'>{t("stoped")}</Badge>
              }
            </div>
            <CopyableText className='w-3xs px-2' value={client.clientId}/>
          </div>

          <div className='flex flex-row justify-end self-center w-full'>
            {!isMobile && <>
              {client.scopes.slice(0, 3).map((scope) => (
                <Badge key={scope} className='mr-1'>{scope}</Badge>
              ))}
              {client.scopes.length > 3 && <span className='mr-1'>...</span>}
            </>}
            <OAuthClientActionMenu client={client}/>
          </div>
        </CardHeader>
        <CollapsibleContent>
          <CardContent className='mt-4'>
            <Separator/>
            
            <div className='grid grid-cols-1 lg:grid-cols-3'>
              <div className='flex flex-col gap-2'>
                <p className='font-semibold underline my-2'>{t("titles.info_app")}</p>

                <div>
                  <p className='font-semibold'>{t("titles.redirect_uri")}</p>
                  {client.redirectUris.map((uri) => <CopyableText className='w-3xs' value={uri}/>)}
                </div>
                <div>
                  <p className='font-semibold'>{t("titles.scopes")}</p>
                  {client.scopes.map((scope) => (
                    <Badge key={scope} className='mr-1'>{scope}</Badge>
                  ))}
                </div>
                <div>
                  <p className='font-semibold'>{t("titles.created")}</p>
                  <p>{DateUtils.formatDate(client.createdAt)}</p>
                </div>
              </div>

              <div className='flex flex-col gap-2'>
                <p className='font-semibold underline my-2'>{t("titles.client_settings")}</p>
                
                <div className='inline-flex items-center gap-1'>
                  <p className='font-semibold'>{t("titles.require_consent")}</p>
                  {client.clientSettings.requireAuthorizationConsent 
                    ? <Check size={16} className='text-allowed'/>
                    : <X size={16} className='text-destructive'/>
                  }
                </div>
                <div className='inline-flex items-center gap-1'>
                  <p className='font-semibold'>{t("titles.require_pkce")}</p>
                  {client.clientSettings.requireProofKey 
                    ? <Check size={16} className='text-allowed'/>
                    : <X size={16} className='text-destructive'/>
                  }
                </div>
                <div>
                  <p className='font-semibold'>{t("titles.uri_jwk")}</p>
                  <CopyableText className='w-3xs' value={client.clientSettings.jwkSetUrl}/>
                </div>
                <div>
                  <p className='font-semibold'>{t("titles.uri_oidc_logout")}</p>
                  <CopyableText className='w-3xs' value={client.clientSettings.oidcLogoutRedirectUri}/>
                </div>
              </div>
              
              <div className='flex flex-col gap-2'>
                <p className='font-semibold underline my-2'>{t("titles.token_settings")}</p>

                <div className='inline-flex items-center gap-1'>
                  <p className='font-semibold'>{t("titles.reuse_refresh_tokens")}</p>
                  {client.tokenSettings.reuseRefreshTokens 
                    ? <Check size={16} className='text-allowed'/>
                    : <X size={16} className='text-destructive'/>
                  }
                </div>
                <div>
                  <p className='font-semibold'>{t("titles.authorization_code_ttl")}</p>
                  <FormatDurationText seconds={client.tokenSettings.authorizationCodeTimeToLive}/>
                </div>
                <div>
                  <p className='font-semibold'>{t("titles.access_code_ttl")}</p>
                  <FormatDurationText seconds={client.tokenSettings.accessTokenTimeToLive}/>
                </div>
                <div>
                  <p className='font-semibold'>{t("titles.refresh_token_ttl")}</p>
                  <FormatDurationText seconds={client.tokenSettings.refreshTokenTimeToLive}/>
                </div>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
});
