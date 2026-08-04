import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useAuth } from '@/features/auth';
import { UserAvatar } from '@/shared/components/UserAvatar';
import { LogOut } from 'lucide-react';

export function UserInformationBlock() {
  const {logout, user} = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className='flex flex-row justify-between'>
      <div className='flex flex-row items-center gap-2'>
        <UserAvatar email={user.email}/>
        <span className='text-xs'>{user.email}</span>
      </div>
      <Tooltip>
        <TooltipTrigger render={
          <Button variant='ghost' onClick={logout}>
            <LogOut/>
          </Button>
          }
        />
        <TooltipContent>
          Выйти из аккаунта
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
