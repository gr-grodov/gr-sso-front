import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useAuth } from '@/features/auth';
import { AppAvatar } from '@/shared/components/AppAvatar';
import { LogOut } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

export function UserInformationBlock() {
  const {t} = useTranslation("common", {keyPrefix: "user_inforamtion_block"})
  const navigate = useNavigate();
  const {logout, user} = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className='flex flex-row justify-between'>
      <DropdownMenu>
        <DropdownMenuTrigger render={
          <div className='flex flex-row items-center gap-2'>
            <AppAvatar value={user.email}/>
            <span className='text-xs'>{user.email}</span>
          </div>
        }/>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => navigate("/")}>
              {t("menu.session")}
            </DropdownMenuItem>
          </DropdownMenuGroup>
          {user.role == 'ADMIN' &&
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => navigate("/admin")}>
                {t("menu.admin")}
              </DropdownMenuItem>
            </DropdownMenuGroup>
          }
        </DropdownMenuContent>
      </DropdownMenu>
      <Tooltip>
        <TooltipTrigger render={
          <Button variant='ghost' onClick={logout}>
            <LogOut/>
          </Button>
          }
        />
        <TooltipContent>
          {t("logout_hint")}
          </TooltipContent>
      </Tooltip>
    </div>
  )
}
