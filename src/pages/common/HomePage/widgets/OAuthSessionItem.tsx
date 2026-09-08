import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Separator } from "@/components/ui/separator"
import type { DeviceType, OAuth2Session } from "@/shared/api/dto/response"
import { BotMessageSquare, ChevronDown, ChevronUp, Keyboard, LogIn, Monitor, MonitorSmartphone, TabletSmartphone, Tv } from "lucide-react"
import { Button } from "@/components/ui/button"
import { OAuthSessionDeleteAlertDialog } from "./OAuthSessionDeleteAlertDialog"
import { useState } from "react"
import { FormatDurationText } from "@/shared/components/FormatDurationText"
import { useTranslation } from "react-i18next"

interface OAuthSessionItemProps {
  session: OAuth2Session,
  deleteSession: (sid: string) => void
}

export function OAuthSessionItem({
  session,
  deleteSession
}: OAuthSessionItemProps) {
  const {t} = useTranslation("common", {keyPrefix: "session.item"})
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <Collapsible open={expanded} onOpenChange={setExpanded}>
      <CollapsibleTrigger className='w-full hover:cursor-pointer hover:bg-muted rounded-sm px-2'>
        <div className='w-full flex flex-row justify-between'>

          <div className="flex flex-row items-center gap-4">
            {deviceTypeIcon(session.deviceType)}
            <div className="flex flex-col items-start">
              <span className="font-semibold">
                {t("title", {operationSystem: session.deviceInfo.operationSystem, agentNameVersion: session.deviceInfo.agentNameVersion})}
              </span>
              <span>
                {t("description", {clientName: session.clientName, city: session.deviceLocationCity, country: session.deviceLocationCountry})}
              </span>
              <div className="flex flex-row items-center gap-1">
                <LogIn size={12}/>
                {session.diffNowAndLastEnter < 60 
                  ? <span>{t("diff_now_last_enter.now_enter")}</span>
                  : <FormatDurationText 
                      seconds={session.diffNowAndLastEnter} 
                      withoutUnit={["seconds", "minutes"]} 
                      message={((duration) => t("diff_now_last_enter.duration", {duration: duration}))}
                    />
                }
              </div>
            </div>
          </div>

          <div className='flex flex-row justify-end self-center '>
            {expanded ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}
          </div>

        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="overflow-hidden data-open:animate-collapsible-down data-closed:animate-collapsible-up" >
        <Card size="sm" className="bg-background mt-2">
          <CardContent>
          
            <div className="flex flex-row justify-between py-1">
              <span className="uppercase text-hint">{t("session_info.ip_address")}</span>
              <span>{session.deviceIpAddress}</span>
            </div>
            <Separator variant="muted"/>

            <div className="flex flex-row justify-between py-1">
              <span className="uppercase text-hint">{t("session_info.application")}</span>
              <span>{session.clientName}</span>
            </div>
            <Separator variant="muted"/>

            <div className="flex flex-row justify-between py-1">
              <span className="uppercase text-hint">{t("session_info.os")}</span>
              <span>{session.deviceInfo.operationSystem}</span>
            </div>
            <Separator variant="muted"/>

            <div className="flex flex-row justify-between py-1">
              <span className="uppercase text-hint">{t("session_info.browser")}</span>
              <span>{session.deviceInfo.agentNameVersion}</span>
            </div>
            <Separator variant="muted"/>

            <div className="flex flex-row justify-between py-1">
              <span className="uppercase text-hint">{t("session_info.device")}</span>
              <span>{t(`device_class.${session.deviceInfo.device}`, {defaultValue: session.deviceInfo.device})}</span>
            </div>
            <Separator variant="muted"/>

            <div className="flex flex-row justify-between py-1">
              <span className="uppercase text-hint">{t("session_info.location")}</span>
              <span>{`${session.deviceLocationCity}, ${session.deviceLocationCountry}`}</span>
            </div>
            <Separator variant="muted"/>

            <div className="flex flex-col gap-2 py-1">
              <span className="uppercase text-hint">{t("session_info.user_agent")}</span>
              <span className="font-mono">{session.deviceUserAgent}</span>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col">
            <Separator className="mb-3"/>
            <div className="flex flex-row items-center justify-between w-full px-1">
              <span className="text-hint">{t("actions.delete_hint")}</span>
              <OAuthSessionDeleteAlertDialog
                session={session}
                submit={() => deleteSession(session.sid)}
                triggerDialog={<Button variant='destructive'>{t("actions.delete")}</Button>}
              />
            </div>
          </CardFooter>
        </Card>
      </CollapsibleContent>
      </Collapsible>
  )
}

function deviceTypeIcon(deviceType: DeviceType) {
  let Icon;

  switch (deviceType) {
    case 'DESKTOP': 
      Icon = Monitor;
      break;
    case 'MOBILE': 
      Icon = TabletSmartphone;
      break;
    case 'TV':
      Icon = Tv;
      break;
    case 'BOT':
      Icon = BotMessageSquare;
      break;
    case 'DEVICE': 
      Icon = Keyboard;
      break;
    default: 
      Icon = MonitorSmartphone;
  }

  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted border">
      <Icon size={24}/>
    </div>
  )
}