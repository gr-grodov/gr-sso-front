import type { UserOAuth2Session } from '@/shared/api/dto/response'
import OAuthUserItem from './OAuthUserItem'

interface OAuthUsersDatatProps {
  users: UserOAuth2Session[]
}

export default function OAuthUsersData({users}: OAuthUsersDatatProps) {
  return (
    <div className='flex flex-col gap-1'>
      {users.map(user => <OAuthUserItem key={user.userId} userSessionInfo={user}/>)}
    </div>
  )
}
