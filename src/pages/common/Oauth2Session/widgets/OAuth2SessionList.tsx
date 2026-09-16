import type { OAuth2Session } from '@/shared/api/dto/response'
import { OAuthSessionItem } from './OAuthSessionItem';
import { Separator } from '@/components/ui/separator';

interface OAuth2SessionListPops {
  sessions: OAuth2Session[],
  currDeviceSessions: OAuth2Session[],
  deleteSession: (sid: string) => void
}

export function OAuth2SessionList({
  sessions, 
  currDeviceSessions,
  deleteSession
}: OAuth2SessionListPops) {

  return (
    <>
      {currDeviceSessions.length > 0 && <h5 className='text-hint py-1'>Сессии текущего устройства:</h5>}
      {currDeviceSessions.map((session, index) => 
        <div key={session.sid}>
          <OAuthSessionItem session={session} deleteSession={deleteSession}/>
          {index != currDeviceSessions.length - 1 && <Separator className="my-2" />}
        </div>
      )}
      {currDeviceSessions.length > 0 && sessions.length > 0 && <br/>}

      {sessions.length > 0 && <h5 className='text-hint py-1'>Все сессии:</h5>}
      {sessions.map((session, index) => 
        <div key={session.sid}>
          <OAuthSessionItem session={session} deleteSession={deleteSession}/>
          {index != sessions.length - 1 && <Separator className="my-2" />}
        </div>
      )}
    </>
  )
}